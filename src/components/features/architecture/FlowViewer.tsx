"use client";

import React, { useMemo } from 'react';
import { ReactFlow, Background, Controls, MiniMap, Panel, type Node, type Edge } from '@xyflow/react';
import { CloudNode, TechNode } from './CustomNodes'; 
import '@xyflow/react/dist/style.css';

const nodeTypes = {
  cloudNode: CloudNode,
  techNode: TechNode,
};

interface FlowViewerProps {
  initialNodes: Node[];
  initialEdges: Edge[];
  projectName: string;
}

export default function FlowViewer({ initialNodes, initialEdges, projectName }: FlowViewerProps) {
  const types = useMemo(() => nodeTypes, []);

  return (
    <div className="h-[600px] w-full bg-white rounded-3xl border border-gray-100 shadow-inner overflow-hidden relative">
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={types} 
        fitView
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnScroll={true}
      >
        <Background color="#f8fafc" gap={20} />
        <Controls showInteractive={false} className="bg-white border-gray-100 shadow-xl" />
        <MiniMap zoomable pannable className="bg-white border-gray-100 rounded-lg" />
        
        <Panel position="top-left" className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-gray-100 shadow-sm m-4">
          <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">Mapa de Arquitectura</h4>
          <p className="text-sm text-secondary font-bold">{projectName}</p>
        </Panel>
      </ReactFlow>
    </div>
  );
}