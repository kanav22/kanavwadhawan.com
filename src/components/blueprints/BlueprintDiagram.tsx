"use client"

import { useCallback, useEffect, useMemo } from "react"
import type { MouseEvent } from "react"
import ReactFlow, {
  ReactFlowProvider,
  Controls,
  Background,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
  type Node,
  type Edge,
} from "reactflow"
import "reactflow/dist/base.css"
import { Maximize2, RotateCcw, Link2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { blueprintNodes, blueprintEdges } from "@/data/blueprints-flagship"
import { cn } from "@/lib/utils"

function toReactFlowNodes(nodes: typeof blueprintNodes, searchQuery: string): Node[] {
  const q = searchQuery.trim().toLowerCase()
  return nodes.map((n) => ({
    id: n.id,
    type: "default" as const,
    position: n.position,
    data: { label: n.label },
    hidden: q ? !n.label.toLowerCase().includes(q) : false,
  }))
}

const initialEdges: Edge[] = blueprintEdges

interface BlueprintDiagramInnerProps {
  selectedNodeId: string | null
  onNodeSelect: (nodeId: string | null) => void
  onCopyLink: (nodeId: string) => void
  searchQuery: string
  onSearchChange: (q: string) => void
  className?: string
}

function BlueprintDiagramInner({
  selectedNodeId,
  onNodeSelect,
  onCopyLink,
  searchQuery,
  onSearchChange,
  className,
}: BlueprintDiagramInnerProps) {
  const { fitView, setViewport } = useReactFlow()
  const initialNodes = useMemo(() => toReactFlowNodes(blueprintNodes, ""), [])
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)

  useEffect(() => {
    setNodes(toReactFlowNodes(blueprintNodes, searchQuery))
  }, [searchQuery, setNodes])

  const [edges, , onEdgesChange] = useEdgesState(initialEdges)

  const onNodeClick = useCallback(
    (_: MouseEvent, node: Node) => {
      onNodeSelect(selectedNodeId === node.id ? null : node.id)
    },
    [onNodeSelect, selectedNodeId]
  )

  const handleFitView = useCallback(() => {
    fitView({ padding: 0.2, maxZoom: 1 })
  }, [fitView])

  const handleReset = useCallback(() => {
    setViewport({ x: 0, y: 0, zoom: 0.8 })
  }, [setViewport])

  return (
    <div
      className={cn(
        "min-h-[320px] w-full overflow-hidden rounded-xl border border-border/50 bg-muted/30",
        className
      )}
      style={{ height: "min(70vh, 520px)" }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        fitView
        fitViewOptions={{ padding: 0.2, maxZoom: 1 }}
        minZoom={0.2}
        maxZoom={1.5}
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable
        proOptions={{ hideAttribution: true }}
        className="[&_.react-flow__node]:!rounded-lg [&_.react-flow__node]:!border [&_.react-flow__node]:!border-border [&_.react-flow__node]:!bg-card [&_.react-flow__node]:!px-3 [&_.react-flow__node]:!py-2 [&_.react-flow__node]:!text-sm [&_.react-flow__node.selected]:!ring-2 [&_.react-flow__node.selected]:!ring-primary [&_.react-flow__edge-path]:!stroke-muted-foreground/50"
      >
        <Background gap={12} size={1} className="!bg-transparent" />
        <Controls
          showInteractive={false}
          className="[&_button]:!min-h-[44px] [&_button]:!min-w-[44px] [&_button]:!bg-card [&_button]:!border [&_button]:!border-border [&_button]:!text-foreground [&_button]:!rounded-md [&_button:hover]:!bg-accent"
        />
        <Panel position="top-left" className="m-2 flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative flex-1 sm:max-w-[200px]">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <Input
              type="search"
              placeholder="Search nodes..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="min-h-[44px] pl-9"
              aria-label="Search nodes"
            />
          </div>
          <div className="flex gap-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="min-h-[44px] min-w-[44px] rounded-lg"
              onClick={handleFitView}
              aria-label="Fit to view"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="min-h-[44px] min-w-[44px] rounded-lg"
              onClick={handleReset}
              aria-label="Reset view"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            {selectedNodeId && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="min-h-[44px] gap-1.5 rounded-lg"
                onClick={() => onCopyLink(selectedNodeId)}
                aria-label="Copy link to selected node"
              >
                <Link2 className="h-4 w-4" />
                <span className="hidden sm:inline">Copy link</span>
              </Button>
            )}
          </div>
        </Panel>
      </ReactFlow>
    </div>
  )
}

interface BlueprintDiagramProps {
  selectedNodeId: string | null
  onNodeSelect: (nodeId: string | null) => void
  onCopyLink: (nodeId: string) => void
  searchQuery: string
  onSearchChange: (q: string) => void
  className?: string
}

/**
 * Interactive diagram for Standard Fintech Mobile Ecosystem.
 * Search, Fit view, Reset, Copy link; node click selects and syncs hash.
 */
export function BlueprintDiagram(props: BlueprintDiagramProps) {
  return (
    <ReactFlowProvider>
      <BlueprintDiagramInner {...props} />
    </ReactFlowProvider>
  )
}
