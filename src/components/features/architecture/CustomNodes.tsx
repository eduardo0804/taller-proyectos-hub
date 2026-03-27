"use client";

import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { 
  Cloud, Database, Globe, Server, Code2, Cpu, HardDrive, 
  Smartphone, Shield, Lock, FileText, User, Mail, Mails, Plus, Circle, Diamond 
} from 'lucide-react';

// Actualizamos el mapa de íconos con los nuevos solicitados
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
  lock: <Lock size={20} />,
  document: <FileText size={20} />,
  user: <User size={20} />,
  mail_light: <Mail size={20} />,
  mail_dark: <Mails size={20} />,
  plus: <Plus size={20} />,
  circle_red: <Circle size={20} className="fill-red-500 text-red-600" />,
  circle_green: <Circle size={20} className="fill-green-500 text-green-600" />,
  diamond: <Diamond size={20} className="fill-purple-500 text-purple-600" />
};

export const CloudNode = memo(({ data }: { data: Record<string, string> }) => {
  const isAzure = data.provider === 'Azure';
  const hasIcon = data.icon !== 'none';
  const hasLabel = Boolean(data.label?.trim());
  const hasDescription = Boolean(data.description?.trim()); 
  
  const IconComponent = iconMap[data.icon] || (isAzure ? <Cloud size={20} /> : <Server size={20} />);

  return (
    <div className={`px-4 py-3 shadow-xl rounded-xl border-2 bg-white min-w-[150px] max-w-[280px] ${isAzure ? 'border-blue-500' : 'border-orange-500'}`}>
      {/* 4 Puntos de conexión */}
      <Handle type="target" position={Position.Top} id="top" className="w-2 h-2 !bg-slate-400" />
      <Handle type="target" position={Position.Left} id="left" className="w-2 h-2 !bg-slate-400" />
      
      {/* Lógica de centrado: Si solo hay ícono (no label, no desc), lo centramos totalmente */}
      <div className={`flex space-x-3 ${hasDescription ? 'items-start' : 'items-center'} ${!hasLabel && !hasDescription ? 'justify-center space-x-0' : ''}`}>
        {hasIcon && (
          <div className={`p-2 rounded-lg shrink-0 ${isAzure ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
            {IconComponent}
          </div>
        )}
        
        {(hasLabel || hasDescription) && (
          <div className="flex-1 flex flex-col justify-center">
            {data.provider && <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">{data.provider}</p>}
            {hasLabel && <p className="text-sm font-bold text-slate-800 leading-tight">{data.label}</p>}
            {hasDescription && (
              <p className="text-[10px] text-slate-500 mt-1.5 leading-snug">{data.description}</p>
            )}
          </div>
        )}
      </div>
      
      {/* 4 Puntos de conexión */}
      <Handle type="source" position={Position.Bottom} id="bottom" className="w-2 h-2 !bg-slate-400" />
      <Handle type="source" position={Position.Right} id="right" className="w-2 h-2 !bg-slate-400" />
    </div>
  );
});

export const TechNode = memo(({ data }: { data: Record<string, string> }) => {
  const hasIcon = data.icon !== 'none';
  const hasLabel = Boolean(data.label?.trim());
  const hasDescription = Boolean(data.description?.trim()); 
  const IconComponent = iconMap[data.icon] || <Globe size={18} />;

  return (
    <div className={`px-4 py-3 shadow-lg rounded-xl border border-slate-200 bg-white flex space-x-3 min-w-[140px] max-w-[280px] ${hasDescription ? 'items-start' : 'items-center'} ${!hasLabel && !hasDescription ? 'justify-center space-x-0' : ''}`}>
      {/* 4 Puntos de conexión */}
      <Handle type="target" position={Position.Top} id="top" className="w-2 h-2 !bg-slate-400" />
      <Handle type="target" position={Position.Left} id="left" className="w-2 h-2 !bg-slate-400" />
      
      {hasIcon && (
        <div className="p-2 bg-purple-50 rounded-lg text-purple-600 shrink-0">
          {IconComponent}
        </div>
      )}
      
      {(hasLabel || hasDescription) && (
        <div className="flex-1 flex flex-col justify-center">
          {hasLabel && <p className="text-sm font-bold text-slate-800 leading-tight">{data.label}</p>}
          {hasDescription && (
            <p className="text-[10px] text-slate-500 mt-1.5 leading-snug">{data.description}</p>
          )}
        </div>
      )}
      
      {/* 4 Puntos de conexión */}
      <Handle type="source" position={Position.Bottom} id="bottom" className="w-2 h-2 !bg-slate-400" />
      <Handle type="source" position={Position.Right} id="right" className="w-2 h-2 !bg-slate-400" />
    </div>
  );
});

CloudNode.displayName = "CloudNode";
TechNode.displayName = "TechNode";