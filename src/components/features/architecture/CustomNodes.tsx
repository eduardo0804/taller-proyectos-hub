"use client";

import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Cloud, Database, Globe, Server, Code2, Cpu, HardDrive, Smartphone, Shield, Lock } from 'lucide-react';

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

export const CloudNode = memo(({ data }: { data: Record<string, string> }) => {
  const isAzure = data.provider === 'Azure';
  const hasIcon = data.icon !== 'none';
  const hasDescription = Boolean(data.description?.trim()); // Verificamos si realmente hay texto
  
  const IconComponent = iconMap[data.icon] || (isAzure ? <Cloud size={20} /> : <Server size={20} />);

  return (
    <div className={`px-4 py-3 shadow-xl rounded-xl border-2 bg-white min-w-[150px] max-w-[280px] ${isAzure ? 'border-blue-500' : 'border-orange-500'}`}>
      <Handle type="target" position={Position.Top} className="w-2 h-2 !bg-slate-400" />
      
      {/* MAGIA CSS: Si hay descripción alinea arriba, si no, lo centra perfectamente */}
      <div className={`flex space-x-3 ${hasDescription ? 'items-start' : 'items-center'}`}>
        {hasIcon && (
          <div className={`p-2 rounded-lg shrink-0 ${isAzure ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
            {IconComponent}
          </div>
        )}
        <div className="flex-1 flex flex-col justify-center">
          {data.provider && <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">{data.provider}</p>}
          <p className="text-sm font-bold text-slate-800 leading-tight">{data.label}</p>
          {hasDescription && (
            <p className="text-[10px] text-slate-500 mt-1.5 leading-snug">{data.description}</p>
          )}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 !bg-slate-400" />
    </div>
  );
});

export const TechNode = memo(({ data }: { data: Record<string, string> }) => {
  const hasIcon = data.icon !== 'none';
  const hasDescription = Boolean(data.description?.trim()); // Verificamos si realmente hay texto
  const IconComponent = iconMap[data.icon] || <Globe size={18} />;

  return (
    /* MAGIA CSS APLICADA AQUÍ TAMBIÉN */
    <div className={`px-4 py-3 shadow-lg rounded-xl border border-slate-200 bg-white flex space-x-3 min-w-[140px] max-w-[280px] ${hasDescription ? 'items-start' : 'items-center'}`}>
      <Handle type="target" position={Position.Top} className="w-2 h-2 !bg-slate-400" />
      
      {hasIcon && (
        <div className="p-2 bg-purple-50 rounded-lg text-purple-600 shrink-0">
          {IconComponent}
        </div>
      )}
      <div className="flex-1 flex flex-col justify-center">
        <p className="text-sm font-bold text-slate-800 leading-tight">{data.label}</p>
        {hasDescription && (
          <p className="text-[10px] text-slate-500 mt-1.5 leading-snug">{data.description}</p>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 !bg-slate-400" />
    </div>
  );
});

CloudNode.displayName = "CloudNode";
TechNode.displayName = "TechNode";