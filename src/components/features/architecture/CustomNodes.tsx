"use client";

import React, { memo } from 'react';
import { Handle, Position, NodeResizer } from '@xyflow/react';
import { 
  Cloud, Database, Globe, Server, Code2, Cpu, HardDrive, 
  Smartphone, Shield, Lock, FileText, User, Mail, Mails, Plus, Circle, Diamond 
} from 'lucide-react';

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
  const hasCustomLogo = Boolean(data.logo && data.logo !== 'none');
  const hasLabel = Boolean(data.label?.trim());
  const hasDescription = Boolean(data.description?.trim()); 
  
  const IconComponent = iconMap[data.icon] || (isAzure ? <Cloud size={20} /> : <Server size={20} />);

  return (
    <div className={`px-4 py-3 shadow-xl rounded-xl border-2 bg-white min-w-[150px] max-w-[280px] ${isAzure ? 'border-blue-500' : 'border-orange-500'}`}>
      <Handle type="target" position={Position.Top} id="top" className="w-2 h-2 !bg-slate-400" />
      <Handle type="target" position={Position.Left} id="left" className="w-2 h-2 !bg-slate-400" />
      
      <div className={`flex space-x-3 ${hasDescription ? 'items-start' : 'items-center'} ${!hasLabel && !hasDescription ? 'justify-center space-x-0' : ''}`}>
        
        {hasCustomLogo ? (
          <div className="p-1 shrink-0 flex items-center justify-center bg-slate-50 rounded-lg border border-slate-100 w-10 h-10">
            <img src={`/logos/${data.logo}`} alt="logo" className="w-full h-full object-contain" />
          </div>
        ) : hasIcon ? (
          <div className={`p-2 rounded-lg shrink-0 ${isAzure ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
            {IconComponent}
          </div>
        ) : null}
        
        {(hasLabel || hasDescription) && (
          <div className="flex-1 flex flex-col justify-center">
            {data.provider && <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">{data.provider}</p>}
            {hasLabel && <p className="text-sm font-bold text-slate-800 leading-tight">{data.label}</p>}
            {hasDescription && <p className="text-[10px] text-slate-500 mt-1.5 leading-snug">{data.description}</p>}
          </div>
        )}
      </div>
      
      <Handle type="source" position={Position.Bottom} id="bottom" className="w-2 h-2 !bg-slate-400" />
      <Handle type="source" position={Position.Right} id="right" className="w-2 h-2 !bg-slate-400" />
    </div>
  );
});

export const TechNode = memo(({ data }: { data: Record<string, string> }) => {
  const hasIcon = data.icon !== 'none';
  const hasCustomLogo = Boolean(data.logo && data.logo !== 'none');
  const hasLabel = Boolean(data.label?.trim());
  const hasDescription = Boolean(data.description?.trim()); 
  const IconComponent = iconMap[data.icon] || <Globe size={18} />;

  return (
    <div className={`px-4 py-3 shadow-lg rounded-xl border border-slate-200 bg-white flex space-x-3 min-w-[140px] max-w-[280px] ${hasDescription ? 'items-start' : 'items-center'} ${!hasLabel && !hasDescription ? 'justify-center space-x-0' : ''}`}>
      <Handle type="target" position={Position.Top} id="top" className="w-2 h-2 !bg-slate-400" />
      <Handle type="target" position={Position.Left} id="left" className="w-2 h-2 !bg-slate-400" />
      
      {hasCustomLogo ? (
        <div className="p-1 shrink-0 flex items-center justify-center bg-slate-50 rounded-lg border border-slate-100 w-10 h-10">
          <img src={`/logos/${data.logo}`} alt="logo" className="w-full h-full object-contain" />
        </div>
      ) : hasIcon ? (
        <div className="p-2 bg-purple-50 rounded-lg text-purple-600 shrink-0">
          {IconComponent}
        </div>
      ) : null}
      
      {(hasLabel || hasDescription) && (
        <div className="flex-1 flex flex-col justify-center">
          {hasLabel && <p className="text-sm font-bold text-slate-800 leading-tight">{data.label}</p>}
          {hasDescription && <p className="text-[10px] text-slate-500 mt-1.5 leading-snug">{data.description}</p>}
        </div>
      )}
      
      <Handle type="source" position={Position.Bottom} id="bottom" className="w-2 h-2 !bg-slate-400" />
      <Handle type="source" position={Position.Right} id="right" className="w-2 h-2 !bg-slate-400" />
    </div>
  );
});

export const GroupNode = memo(({ data, selected }: { data: Record<string, string>, selected: boolean }) => {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-50/50 border-blue-300',
    green: 'bg-emerald-50/50 border-emerald-300',
    orange: 'bg-orange-50/50 border-orange-300',
    purple: 'bg-purple-50/50 border-purple-300',
    // Gris más oscuro
    slate: 'bg-slate-100/60 border-slate-400',
    // Nuevos colores solicitados
    white: 'bg-white border-gray-300',
    red: 'bg-red-50/50 border-red-300'
  };
  
  const bgClass = colorMap[data.color] || colorMap.slate;

  return (
    <>
      <NodeResizer color="#a855f7" isVisible={selected} minWidth={200} minHeight={150} />
      <div className={`w-full h-full border-2 border-dashed rounded-2xl relative transition-colors ${bgClass}`}>
        
        {/* Etiqueta del título superior izquierdo */}
        {data.label && (
          <div className="absolute -top-[2px] -left-[2px] bg-white px-4 py-1.5 text-xs font-black uppercase tracking-widest text-slate-700 rounded-br-2xl rounded-tl-2xl border-r-2 border-b-2 border-inherit shadow-sm z-10">
            {data.label}
          </div>
        )}

        {/* Agregamos los Puntos de anclaje para los Fondos */}
        <Handle type="target" position={Position.Top} id="top" className="w-2 h-2 !bg-slate-400 opacity-60 hover:opacity-100 transition-opacity" />
        <Handle type="target" position={Position.Left} id="left" className="w-2 h-2 !bg-slate-400 opacity-60 hover:opacity-100 transition-opacity" />
        <Handle type="source" position={Position.Bottom} id="bottom" className="w-2 h-2 !bg-slate-400 opacity-60 hover:opacity-100 transition-opacity" />
        <Handle type="source" position={Position.Right} id="right" className="w-2 h-2 !bg-slate-400 opacity-60 hover:opacity-100 transition-opacity" />

      </div>
    </>
  );
});

CloudNode.displayName = "CloudNode";
TechNode.displayName = "TechNode";
GroupNode.displayName = "GroupNode";