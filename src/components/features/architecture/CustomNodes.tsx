"use client";

import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Cloud, Database, Globe, Server } from 'lucide-react';

// Nodo para Servicios de Nube (Azure/AWS)
export const CloudNode = memo(({ data }: any) => {
  const isAzure = data.provider === 'Azure';
  return (
    <div className={`px-4 py-3 shadow-xl rounded-xl border-2 bg-white min-w-[150px] ${isAzure ? 'border-blue-500' : 'border-orange-500'}`}>
      <Handle type="target" position={Position.Top} className="w-2 h-2 !bg-gray-300" />
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg ${isAzure ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
          {isAzure ? <Cloud size={20} /> : <Server size={20} />}
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{data.provider}</p>
          <p className="text-sm font-bold text-secondary">{data.label}</p>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 !bg-gray-300" />
    </div>
  );
});

// Nodo para Tecnologías (React, Nextjs, etc)
export const TechNode = memo(({ data }: any) => {
  return (
    <div className="px-4 py-3 shadow-lg rounded-xl border border-gray-100 bg-white flex items-center space-x-3 min-w-[140px]">
      <Handle type="target" position={Position.Top} className="w-2 h-2 !bg-gray-300" />
      <div className="p-2 bg-primary/5 rounded-lg text-primary">
        <Globe size={18} />
      </div>
      <p className="text-sm font-bold text-secondary">{data.label}</p>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 !bg-gray-300" />
    </div>
  );
});

CloudNode.displayName = "CloudNode";
TechNode.displayName = "TechNode";