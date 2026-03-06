import Link from "next/link";
import { PlusCircle, Map } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black text-slate-800">Panel de Control</h2>
        <p className="text-slate-500 mt-2">Selecciona el módulo que deseas gestionar.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Tarjeta para Gestor de Avances */}
        <Link href="/admin-gestion/avances" className="block">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-500 transition-all group">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <PlusCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Reportes Semanales</h3>
            <p className="text-slate-500 text-sm">Añade o actualiza el progreso de Legado Fia y NANUTECH.</p>
          </div>
        </Link>

        {/* Tarjeta para Editor de Arquitectura */}
        <Link href="/admin-gestion/arquitectura" className="block">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:purple-500 transition-all group">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Map className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Editor de Arquitectura</h3>
            <p className="text-slate-500 text-sm">Construye los diagramas interactivos arrastrando componentes.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}