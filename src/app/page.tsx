"use client";
import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  Controls,
  Node,
  MiniMap,
  Connection,
  MarkerType,
} from "reactflow";
import { zinc } from "tailwindcss/colors";
import "reactflow/dist/style.css";
import Square from "@/components/node/square";
import DefaultEdge from "@/components/edges/DefaultEdge";
import * as Toolbar from "@radix-ui/react-toolbar";
import Diamond from "@/components/node/diamond";
import Circle from "@/components/node/circle";

const NODE_TYPES = {
  square: Square,
  diamond: Diamond,
  circle: Circle,
};

const EDGE_TYPES = {
  default: DefaultEdge,
};

const INITIAL_NODES = [] satisfies Node[];

export default function App() {
  const [firstRun, setFirstRun] = useState(true);
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const onConnect = useCallback((connection: Connection) => {
    return setEdges((edges) => addEdge(connection, edges));
  }, []);

  const deleteNode = useCallback((nodeId: string) => {
    setNodes((nodes) => nodes.filter((node) => node.id !== nodeId));
    setEdges((edges) =>
      edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
    );
  }, []);

  const addSquare = useCallback(() => {
    const id = crypto.randomUUID();
    setNodes((nodes) => [
      ...nodes,
      {
        id,
        type: "square",
        position: {
          x: Math.floor(Math.random() * 200 - 1),
          y: Math.floor(Math.random() * 200 - 1),
        },
        data: {
          id,
          deleteNode,
        },
      },
    ]);
  }, []);

  const addCircle = useCallback(() => {
    const id = crypto.randomUUID();
    setNodes((nodes) => [
      ...nodes,
      {
        id,
        type: "circle",
        position: {
          x: Math.floor(Math.random() * 200 - 1),
          y: Math.floor(Math.random() * 200 - 1),
        },
        data: {
          id,
          deleteNode,
        },
      },
    ]);
  }, []);

  const addDiamond = useCallback(() => {
    const id = crypto.randomUUID();
    setNodes((nodes) => [
      ...nodes,
      {
        id,
        type: "diamond",
        position: {
          x: Math.floor(Math.random() * 200 - 1),
          y: Math.floor(Math.random() * 200 - 1),
        },
        data: {
          id,
          deleteNode,
        },
      },
    ]);
  }, []);

  useEffect(() => {
    //store and edges in localstorage
    if (typeof window !== "undefined") {
      if (firstRun) {
        setFirstRun(false);
        const localNodes = localStorage.getItem("nodes");
        const localEdges = localStorage.getItem("edges");
        if (localNodes) {
          const parsedNodes = JSON.parse(localNodes);
          setNodes(
            parsedNodes.map((node: Node) => ({
              ...node,
              data: { ...node.data, deleteNode },
            }))
          );
        }
        if (localEdges) {
          setEdges(JSON.parse(localEdges));
        }
      } else {
        localStorage.setItem("nodes", JSON.stringify(nodes));
        localStorage.setItem("edges", JSON.stringify(edges));
      }
    }
  }, [edges, nodes, firstRun, setNodes, deleteNode, setEdges]);

  return (
    <div className="h-screen w-screen">
      <ReactFlow
        nodeTypes={NODE_TYPES}
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        edgeTypes={EDGE_TYPES}
        defaultEdgeOptions={{
          type: "default",
          animated: true,
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
          markerStart: {
            type: MarkerType.ArrowClosed,
          },
        }}
      >
        <Background gap={12} size={2} color={zinc[200]} />
        <Controls />
        <MiniMap />
      </ReactFlow>

      <Toolbar.Root className="fixed bottom-20 flex left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg border border-zinc-300 px-8 h-20 w-auto gap-2 overflow-hidden">
        <Toolbar.Button
          onClick={addSquare}
          className="w-32 h-32 bg-violet-500 rounded mt-6 transition-transform hover:-translate-y-2"
        />
        <Toolbar.Button
          onClick={addDiamond}
          className="w-32 h-32 bg-violet-500 rounded mt-12 transition-transform hover:-translate-y-2 rotate-45"
        />
        <Toolbar.Button
          onClick={addCircle}
          className="w-32 h-32 bg-violet-500 rounded-full mt-6 transition-transform hover:-translate-y-2"
        />
      </Toolbar.Root>
    </div>
  );
}
