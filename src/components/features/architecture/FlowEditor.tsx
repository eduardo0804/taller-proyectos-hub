"use client";

import React, { useMemo, useCallback, useState } from 'react';
import { 
  ReactFlow, Background, Controls, Panel,
  useNodesState, useEdgesState, addEdge, Connection, Edge, Node
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { CloudNode, TechNode } from './CustomNodes'; 
import { Save, Plus, Loader2, Settings, Type, Image as ImageIcon } from 'lucide-react';
import { saveDiagramState } from '@/app/(admin)/admin-gestion/arquitectura/actions';

const nodeTypes = {
  cloudNode: CloudNode,
  techNode: TechNode,
};

interface FlowEditorProps {
  projectId: string;
  projectName: string;
  cloudProvider: string;
  viewName: string;
  initialNodes?: Node[];
  initialEdges?: Edge[];
}

export default function FlowEditor({ 
  projectId, projectName, cloudProvider, viewName,
  initialNodes = [], initialEdges = [] 
}: FlowEditorProps) {
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);

  const types = useMemo(() => nodeTypes, []);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onAddNode = (type: 'techNode' | 'cloudNode') => {
    const newNode: Node = {
      id: `n-${Date.now()}`,
      type,
      position: { x: 250, y: Math.random() * 200 + 50 },
      data: { 
        label: type === 'techNode' ? 'Nueva Tecnología' : `Nuevo Servicio ${cloudProvider}`,
        provider: cloudProvider,
        icon: type === 'techNode' ? 'globe' : 'cloud'
      },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    setSelectedEdge(null);
    setSelectedNode(node);
  };

  const onEdgeClick = (_: React.MouseEvent, edge: Edge) => {
    setSelectedNode(null);
    setSelectedEdge(edge);
  };

  const onPaneClick = () => {
    setSelectedNode(null);
    setSelectedEdge(null);
  };

  const updateNodeData = (field: string, value: string) => {
    if (!selectedNode) return;
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.id) {
          const updatedNode = { ...node, data: { ...node.data, [field]: value } };
          setSelectedNode(updatedNode); 
          return updatedNode;
        }
        return node;
      })
    );
  };

  const updateEdgeLabel = (value: string) => {
    if (!selectedEdge) return;
    setEdges((eds) =>
      eds.map((edge) => {
        if (edge.id === selectedEdge.id) {
          const updatedEdge = { 
            ...edge, 
            label: value, 
            labelStyle: { fontSize: 11, fontWeight: 700, fill: '#64748b' } 
          };
          setSelectedEdge(updatedEdge);
          return updatedEdge;
        }
        return edge;
      })
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus(null);
    
    // AQUÍ ESTÁ LA MAGIA: Enviamos el array de ReactFlow forzado a ser unknown[] 
    // para que haga match perfecto con lo que espera el server action.
    const result = await saveDiagramState({ 
      projectId, 
      viewName, 
      nodes: nodes as unknown[], 
      edges: edges as unknown[]  
    });

    if (result.success) {
      setSaveStatus("✅ Guardado correctamente");
      setTimeout(() => setSaveStatus(null), 3000);
    } else {
      setSaveStatus("❌ Error al guardar");
    }
    setIsSaving(false);
  };

  const defaultEdgeOptions = {
    animated: true,
    style: { stroke: '#a4101a', strokeWidth: 2 },
  };

  return (
    <div className="h-[750px] w-full bg-slate-50 rounded-3xl border border-slate-200 shadow-sm overflow-hidden relative flex flex-col">
      <div className="bg-slate-900 text-white p-4 flex justify-between items-center z-10 relative">
        <div>
          <h3 className="font-bold text-sm">Editor: {projectName}</h3>
          <p className="text-xs text-slate-400">Capa: <span className="uppercase text-purple-400 font-black">{viewName}</span></p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-slate-800 rounded-lg p-1 flex gap-1 mr-4 border border-slate-700">
            <button onClick={() => onAddNode('techNode')} className="p-2 hover:bg-slate-700 rounded flex items-center gap-2 text-xs font-bold">
              <Plus size={14} className="text-purple-400" /> Web/Tech
            </button>
            <button onClick={() => onAddNode('cloudNode')} className="p-2 hover:bg-slate-700 rounded flex items-center gap-2 text-xs font-bold">
              <Plus size={14} className="text-orange-400" /> Cloud
            </button>
          </div>

          {saveStatus && <span className="text-xs font-bold mr-2 animate-in fade-in">{saveStatus}</span>}

          <button onClick={handleSave} disabled={isSaving} className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-xl font-bold text-sm flex items-center gap-2 disabled:opacity-50">
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Guardar Diagrama
          </button>
        </div>
      </div>

      <div className="flex-grow flex relative">
        <div className="flex-grow h-full">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick} 
            onEdgeClick={onEdgeClick} 
            onPaneClick={onPaneClick} 
            nodeTypes={types}
            defaultEdgeOptions={defaultEdgeOptions}
            fitView
            nodesDraggable={true} 
          >
            <Background color="#cbd5e1" gap={20} />
            <Controls className="bg-white border-slate-200 shadow-lg mb-4 ml-2" />
            
            <Panel position="bottom-right" className="bg-white/90 p-4 rounded-xl border border-slate-200 shadow-sm m-4 max-w-xs ml-24">
               <h4 className="text-xs font-black text-slate-800 mb-1 flex items-center"><Settings className="w-3 h-3 mr-1 text-purple-500"/> Editar</h4>
               <p className="text-[10px] text-slate-500">Haz clic en una caja o línea para editar su texto o icono. Usa <strong>Suprimir</strong> para borrar.</p>
            </Panel>
          </ReactFlow>
        </div>
        
        {(selectedNode || selectedEdge) && (
          <div className="w-80 bg-white border-l border-slate-200 shadow-xl p-6 overflow-y-auto animate-in slide-in-from-right-8 duration-200 z-10">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <h3 className="font-black text-slate-800 flex items-center gap-2">
                <Settings className="w-5 h-5 text-purple-600" />
                Propiedades
              </h3>
            </div>

            {selectedNode && (
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1"><Type className="w-3 h-3"/> Texto de la Caja</label>
                  <input 
                    type="text" 
                    value={selectedNode.data?.label as string || ''}
                    onChange={(e) => updateNodeData('label', e.target.value)}
                    className="w-full p-2.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 outline-none"
                    placeholder="Ej. Next.js Frontend"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1"><ImageIcon className="w-3 h-3"/> Icono</label>
                  <select 
                    value={selectedNode.data?.icon as string || 'globe'}
                    onChange={(e) => updateNodeData('icon', e.target.value)}
                    className="w-full p-2.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 outline-none bg-white"
                  >
                    <option value="globe">🌐 Web / Frontend</option>
                    <option value="server">🖥️ Servidor / Backend</option>
                    <option value="database">🗄️ Base de Datos</option>
                    <option value="cloud">☁️ Nube Genérica</option>
                    <option value="code">💻 Código / Función</option>
                    <option value="cpu">⚙️ Procesamiento / CPU</option>
                    <option value="storage">💾 Almacenamiento</option>
                    <option value="mobile">📱 Aplicación Móvil</option>
                    <option value="shield">🛡️ Seguridad / WAF</option>
                    <option value="lock">🔒 Autenticación</option>
                  </select>
                </div>
              </div>
            )}

            {selectedEdge && (
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1"><Type className="w-3 h-3"/> Texto de la Conexión</label>
                  <input 
                    type="text" 
                    value={selectedEdge.label as string || ''}
                    onChange={(e) => updateEdgeLabel(e.target.value)}
                    className="w-full p-2.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 outline-none"
                    placeholder="Ej. HTTPS / GraphQL / SQL Query"
                  />
                </div>
                <div className="p-3 bg-blue-50 text-blue-700 text-xs rounded-lg border border-blue-100">
                  Tip: Deja el campo vacío si solo quieres la flecha sin texto.
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}