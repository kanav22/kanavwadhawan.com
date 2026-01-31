"use client"

import { useCallback } from "react"
import type { MouseEvent } from "react"
import ReactFlow, {
  ReactFlowProvider,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
} from "reactflow"
import "reactflow/dist/base.css"
import { blueprintNodes, blueprintEdges } from "@/data/blueprints"
import { cn } from "@/lib/utils"

const initialNodes: Node[] = blueprintNodes.map((n) => ({
  ...n,
  data: { ...n.data, label: (n.data as { label?: string }).label ?? n.id },
}))
const initialEdges: Edge[] = blueprintEdges

interface BlueprintDiagramProps {
  onNodeSelect: (nodeId: string | null) => void
  selectedNodeId: string | null
  className?: string
}

function BlueprintDiagramInner({
  onNodeSelect,
  selectedNodeId,
  className,
}: BlueprintDiagramProps) {
  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges, , onEdgesChange] = useEdgesState(initialEdges)

  const onNodeClick = useCallback(
    (_: MouseEvent, node: Node) => {
      onNodeSelect(selectedNodeId === node.id ? null : node.id)
    },
    [onNodeSelect, selectedNodeId]
  )

  return (
    <div
      className={cn("min-h-[320px] w-full overflow-hidden rounded-xl border border-border/50 bg-muted/30", className)}
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
          className="[&_button]:!bg-card [&_button]:!border [&_button]:!border-border [&_button]:!text-foreground [&_button]:!rounded-md [&_button:hover]:!bg-accent"
        />
      </ReactFlow>
    </div>
  )
}

/**
 * Interactive blueprint diagram (Standard Fintech Mobile Ecosystem).
 * Click a node to select; parent uses selectedNodeId to show BlueprintPanel or open Sheet on mobile.
 */
export function BlueprintDiagram(props: BlueprintDiagramProps) {
  return (
    <ReactFlowProvider>
      <BlueprintDiagramInner {...props} />
    </ReactFlowProvider>
  )
}
