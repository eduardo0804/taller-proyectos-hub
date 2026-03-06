import prisma from "@/lib/prisma";
import AdvanceForm from "./AdvanceForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function ManageAdvancesPage() {
  // Consulta directa a la DB para alimentar el selector de proyectos
  const projects = await prisma.project.findMany({
    select: { id: true, name: true }
  });

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link href="/admin-gestion" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Panel
      </Link>

      <div>
        <h2 className="text-3xl font-black text-slate-800">Publicar Reporte</h2>
        <p className="text-slate-500 mt-2">
          Ingresa el avance correspondiente al Sprint actual. Esta información será visible públicamente de inmediato.
        </p>
      </div>

      {/* Aquí inyectamos el componente de Cliente */}
      <AdvanceForm projects={projects} />
    </div>
  );
}