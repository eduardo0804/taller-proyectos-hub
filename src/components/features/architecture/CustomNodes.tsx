"use client";

import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Cloud, Database, Globe, Server, Code2, Cpu, HardDrive, Smartphone, Shield, Lock } from 'lucide-react';

// Diccionario de iconos disponibles para el editor
export const iconMap: Record<string, React.ReactNode> = {
  globe: <Globe size={20} />,
  server: <Server size={20} />,
  database: <Database size={20} />,
  cloud: <Cloud size={20} />,
  cpu: <Cpu size={20} />,
  code: <Code2 size={20} />,
  storage: <HardDrive size={20} />,
  mobile: <Smartphone size={20} />,
  shield: <Shield size={20} />,
  lock: <Lock size={20} />
};

// Nodo para Servicios de Nube (Azure/AWS)
export const CloudNode = memo(({ data }: any) => {
  const isAzure = data.provider === 'Azure';
  // Renderizamos el icono seleccionado o uno por defecto
  const IconComponent = iconMap[data.icon] || (isAzure ? <Cloud size={20} /> : <Server size={20} />);

  return (
    <div className={`px-4 py-3 shadow-xl rounded-xl border-2 bg-white min-w-[150px] ${isAzure ? 'border-blue-500' : 'border-orange-500'}`}>
      <Handle type="target" position={Position.Top} className="w-2 h-2 !bg-slate-400" />
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg ${isAzure ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
          {IconComponent}
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{data.provider}</p>
          <p className="text-sm font-bold text-slate-800">{data.label}</p>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 !bg-slate-400" />
    </div>
  );
});

// Nodo genérico para Tecnologías (React, Nextjs, etc)
export const TechNode = memo(({ data }: any) => {
  const IconComponent = iconMap[data.icon] || <Globe size={18} />;

  return (
    <div className="px-4 py-3 shadow-lg rounded-xl border border-slate-200 bg-white flex items-center space-x-3 min-w-[140px]">
      <Handle type="target" position={Position.Top} className="w-2 h-2 !bg-slate-400" />
      <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
        {IconComponent}
      </div>
      <p className="text-sm font-bold text-slate-800">{data.label}</p>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 !bg-slate-400" />
    </div>
  );
});

CloudNode.displayName = "CloudNode";
TechNode.displayName = "TechNode";