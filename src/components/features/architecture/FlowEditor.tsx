"use client";

import React, { useMemo, useCallback, useState } from 'react';
import { 
  ReactFlow, Background, Controls, Panel,
  useNodesState, useEdgesState, addEdge, Connection, Edge, Node
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { CloudNode, TechNode, GroupNode } from './CustomNodes'; 
import { Save, Plus, Loader2, Settings, Type, Image as ImageIcon, FileText, Square, BringToFront, SendToBack, Sparkles, ChevronDown } from 'lucide-react';
import { saveDiagramState } from '@/app/(admin)/admin-gestion/arquitectura/actions';

const nodeTypes = {
  cloudNode: CloudNode,
  techNode: TechNode,
  groupNode: GroupNode,
};

// Lista de tus logos en public/logos/
const customLogos = [
  "admin.svg", "almacenamiento.svg", "amazon-api-gateway.svg", "amazon-rds.svg", "amazon-s3.svg", "app-service.svg",
  "appi-sga.svg" , "approval-process.svg", "aws-amplify.svg", "aws-db.svg", "azure-boards.svg", "bastion.svg", "bicep.svg",
  "blob-storage.svg", "branch-code.svg", "branch.svg", "cloudfront.svg", "code-user.svg", "code.svg", "cognito-prod.svg", "cypress.svg",
  "db-azure.svg", "endpoint.svg", "functions.svg", "github-actions.svg", "github-deplyment.svg", "github-secret.svg", "github.svg",
  "grupo-recursos.svg", "host-procesador.svg", "http-delete.svg", "http-post.svg", "http-put.svg", "http.svg", "https.svg", "internet-gateway.svg", "internet-http.svg", 
  "internet.svg", "issues.svg", "javascript.svg", "jest.svg", "json.svg", "lambda.svg", "law-sga.svg", "microsoft-entraid.svg", "node.svg",
  "postman.svg", "pull-request.svg", "react.svg", "selenium.svg", "slack.svg", "storage.svg", "supabase.svg", "suscripcion-azure.svg",
  "tailwind.svg", "typescript.svg", "uptime.svg", "users.svg", "usuario.svg", "vite.svg"
];

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
  
  // Nuevo estado para controlar nuestro selector visual de logos
  const [isLogoSelectorOpen, setIsLogoSelectorOpen] = useState(false);

  const types = useMemo(() => nodeTypes, []);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge({ ...params, type: 'smoothstep', animated: true }, eds)),
    [setEdges]
  );

  const onAddNode = (type: 'techNode' | 'cloudNode' | 'groupNode') => {
    const isGroup = type === 'groupNode';
    const newNode: Node = {
      id: `n-${Date.now()}`,
      type,
      position: { x: 250, y: Math.random() * 200 + 50 },
      data: { 
        label: isGroup ? 'Nuevo Grupo' : (type === 'techNode' ? 'Nueva Tecnología' : `Nuevo Servicio ${cloudProvider}`),
        description: '',
        provider: cloudProvider,
        icon: 'none',
        logo: 'none',
        color: 'slate'
      },
      ...(isGroup && { style: { width: 400, height: 300 }, zIndex: -1 }) 
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    setSelectedEdge(null);
    setSelectedNode(node);
    setIsLogoSelectorOpen(false); // Cerrar selector si cambiamos de nodo
  };

  const onEdgeClick = (_: React.MouseEvent, edge: Edge) => {
    setSelectedNode(null);
    setSelectedEdge(edge);
    setIsLogoSelectorOpen(false);
  };

  const onPaneClick = () => {
    setSelectedNode(null);
    setSelectedEdge(null);
    setIsLogoSelectorOpen(false);
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

  const changeNodeZIndex = (direction: 1 | -1) => {
    if (!selectedNode) return;
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.id) {
          const updatedNode = { ...node, zIndex: (node.zIndex || 0) + direction };
          setSelectedNode(updatedNode);
          return updatedNode;
        }
        return node;
      })
    );
  };

  const updateEdgeData = (field: string, value: string | boolean) => {
    if (!selectedEdge) return;
    setEdges((eds) =>
      eds.map((edge) => {
        if (edge.id === selectedEdge.id) {
          const updatedEdge = { ...edge, [field]: value };
          if (field === 'label') {
            updatedEdge.labelStyle = { fontSize: 11, fontWeight: 700, fill: '#64748b', backgroundColor: 'white' };
          }
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
    type: 'smoothstep',
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
            <button onClick={() => onAddNode('groupNode')} className="p-2 hover:bg-slate-700 rounded flex items-center gap-2 text-xs font-bold">
              <Square size={14} className="text-blue-400" /> Fondo
            </button>
            <button onClick={() => onAddNode('techNode')} className="p-2 hover:bg-slate-700 rounded flex items-center gap-2 text-xs font-bold">
              <Plus size={14} className="text-purple-400" /> Caja Simple
            </button>
            <button onClick={() => onAddNode('cloudNode')} className="p-2 hover:bg-slate-700 rounded flex items-center gap-2 text-xs font-bold">
              <Plus size={14} className="text-orange-400" /> Cloud Node
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

            {/* PROPIEDADES DE NODOS */}
            {selectedNode && (
              <div className="space-y-5">
                
                {/* Control Z-Index (Adelante/Atrás) */}
                <div className="flex gap-2">
                  <button onClick={() => changeNodeZIndex(1)} className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold text-slate-700 flex justify-center items-center gap-2 border border-slate-200">
                    <BringToFront className="w-4 h-4"/> Al Frente
                  </button>
                  <button onClick={() => changeNodeZIndex(-1)} className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold text-slate-700 flex justify-center items-center gap-2 border border-slate-200">
                    <SendToBack className="w-4 h-4"/> Al Fondo
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1"><Type className="w-3 h-3"/> Título</label>
                  <input 
                    type="text" 
                    value={selectedNode.data?.label as string || ''}
                    onChange={(e) => updateNodeData('label', e.target.value)}
                    className="w-full p-2.5 text-sm font-bold rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 outline-none"
                    placeholder="Ej. Registro Manual"
                  />
                  {selectedNode.type === 'groupNode' && (
                    <p className="text-[10px] text-slate-400">Déjalo vacío si no quieres título.</p>
                  )}
                </div>

                {/* Propiedades exclusivas de Nodos Normales */}
                {selectedNode.type !== 'groupNode' && (
                  <>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1"><FileText className="w-3 h-3"/> Descripción (Opcional)</label>
                      <textarea 
                        rows={3}
                        value={selectedNode.data?.description as string || ''}
                        onChange={(e) => updateNodeData('description', e.target.value)}
                        className="w-full p-2.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                      />
                    </div>

                    {/* SELECTOR CUSTOMIZADO VISUAL PARA LOGOS SVG */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1"><Sparkles className="w-3 h-3"/> Logo Personalizado (.svg)</label>
                      
                      <div className="relative">
                        <div 
                          onClick={() => setIsLogoSelectorOpen(!isLogoSelectorOpen)}
                          className="w-full p-2.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 outline-none bg-white cursor-pointer flex items-center justify-between shadow-sm hover:border-purple-300 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            {selectedNode.data?.logo && selectedNode.data.logo !== 'none' ? (
                              <>
                                <img src={`/logos/${selectedNode.data.logo}`} alt="logo" className="w-5 h-5 object-contain" />
                                <span className="truncate w-40 font-medium">{selectedNode.data.logo as string}</span>
                              </>
                            ) : (
                              <span className="text-slate-500">📝 Sin Logo Seleccionado</span>
                            )}
                          </div>
                          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isLogoSelectorOpen ? 'rotate-180' : ''}`} />
                        </div>

                        {isLogoSelectorOpen && (
                          <div className="w-full mt-2 bg-white border border-slate-200 rounded-lg shadow-inner max-h-64 overflow-y-auto">
                            <div 
                              className="p-3 flex items-center gap-3 hover:bg-slate-50 cursor-pointer border-b border-slate-100 text-sm font-medium"
                              onClick={() => {
                                updateNodeData('logo', 'none');
                                setIsLogoSelectorOpen(false);
                              }}
                            >
                              <span className="w-6 h-6 flex items-center justify-center text-lg">📝</span> Sin Logo
                            </div>
                            
                            {customLogos.map(logo => (
                              <div 
                                key={logo} 
                                className="p-3 flex items-center gap-3 hover:bg-purple-50 cursor-pointer border-b border-slate-50 text-sm transition-colors group"
                                onClick={() => {
                                  updateNodeData('logo', logo);
                                  updateNodeData('icon', 'none'); // Resetea el icono básico
                                  setIsLogoSelectorOpen(false);
                                }}
                              >
                                <div className="w-8 h-8 shrink-0 flex items-center justify-center bg-slate-50 rounded-lg border border-slate-100 group-hover:border-purple-200 p-1">
                                  <img src={`/logos/${logo}`} alt={logo} className="w-full h-full object-contain" />
                                </div>
                                <span className="truncate text-slate-600 font-medium group-hover:text-purple-700">{logo}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1"><ImageIcon className="w-3 h-3"/> Icono Básico (Lucide)</label>
                      <select 
                        value={selectedNode.data?.icon as string || 'none'}
                        onChange={(e) => {
                          updateNodeData('icon', e.target.value);
                          if(e.target.value !== 'none') updateNodeData('logo', 'none'); // Resetea logo
                        }}
                        className="w-full p-2.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 outline-none bg-white"
                        disabled={selectedNode.data?.logo !== 'none' && selectedNode.data?.logo !== undefined}
                      >
                        <option value="none">📝 Sin Icono</option>
                        <option value="globe">🌐 Web / Frontend</option>
                        <option value="server">🖥️ Servidor / Backend</option>
                        <option value="database">🗄️ Base de Datos</option>
                        <option value="cloud">☁️ Nube Genérica</option>
                        <option value="mobile">📱 Aplicación Móvil</option>
                        <option value="shield">🛡️ Seguridad</option>
                        <option value="lock">🔒 Autenticación</option>
                        <option value="document">📄 Documento</option>
                        <option value="user">👤 Usuario / Actor</option>
                        <option value="mail_light">✉️ Email Claro</option>
                        <option value="mail_dark">📧 Email Oscuro</option>
                        <option value="plus">➕ Plus</option>
                        <option value="circle_red">🔴 Círculo Rojo</option>
                        <option value="circle_green">🟢 Círculo Verde</option>
                        <option value="diamond">💠 Rombo</option>
                      </select>
                    </div>
                  </>
                )}

                {/* Propiedades exclusivas de Fondos (GroupNode) */}
                {selectedNode.type === 'groupNode' && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1"><Square className="w-3 h-3"/> Color del Fondo</label>
                    <select 
                      value={selectedNode.data?.color as string || 'slate'}
                      onChange={(e) => updateNodeData('color', e.target.value)}
                      className="w-full p-2.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 outline-none bg-white"
                    >
                      <option value="slate">Gris Oscuro (Slate)</option>
                      <option value="white">Blanco (White)</option>
                      <option value="red">Rojo (Red)</option>
                      <option value="blue">Azul (Blue)</option>
                      <option value="green">Verde (Emerald)</option>
                      <option value="orange">Naranja (Orange)</option>
                      <option value="purple">Morado (Purple)</option>
                    </select>
                    <p className="text-[10px] text-slate-400">Selecciona el borde de la caja para redimensionarla.</p>
                  </div>
                )}
              </div>
            )}

            {/* PROPIEDADES DE LÍNEAS (EDGES) */}
            {selectedEdge && (
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1"><Type className="w-3 h-3"/> Texto de la Conexión</label>
                  <input 
                    type="text" 
                    value={selectedEdge.label as string || ''}
                    onChange={(e) => updateEdgeData('label', e.target.value)}
                    className="w-full p-2.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 outline-none"
                    placeholder="Ej. Envía documento a..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">Estilo de Línea</label>
                  <select 
                    value={selectedEdge.type || 'smoothstep'}
                    onChange={(e) => updateEdgeData('type', e.target.value)}
                    className="w-full p-2.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 outline-none bg-white"
                  >
                    <option value="smoothstep">🔀 Escalonada (Ortogonal)</option>
                    <option value="default">〰️ Curva (Bezier)</option>
                    <option value="straight">📏 Recta</option>
                  </select>
                </div>

                <label className="flex items-center space-x-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                  <input 
                    type="checkbox" 
                    checked={Boolean(selectedEdge.animated)}
                    onChange={(e) => updateEdgeData('animated', e.target.checked)}
                    className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                  />
                  <span className="text-sm font-bold text-slate-700">Línea Punteada (Animada)</span>
                </label>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}