import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Cloud, Cpu, Users, CheckCircle2, Server, LayoutDashboard, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({
    where: { slug },
    include: { members: true, _count: { select: { members: true, advances: true } } }
  });

  if (!project) notFound();

  const isAzure = project.cloudProvider === "Azure";
  const brandColor = isAzure ? "text-blue-600" : "text-orange-500";
  const brandBg = isAzure ? "bg-blue-50" : "bg-orange-50";

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-gray-200 pt-10 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/#proyectos" className="flex items-center text-sm text-gray-500 hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Volver a proyectos
          </Link>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${brandBg} ${brandColor} mb-4`}>
                {isAzure ? <Cloud className="w-3 h-3 mr-2" /> : <Cpu className="w-3 h-3 mr-2" />}
                Cloud Provider: {project.cloudProvider}
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-secondary tracking-tight">{project.name}</h1>
              <p className="mt-4 text-gray-600 text-lg max-w-3xl leading-relaxed">{project.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center">
                <Users className="w-5 h-5 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-secondary">{project._count.members}</div>
                <div className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Integrantes</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center">
                <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-secondary">{project._count.advances}</div>
                <div className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Reportes</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-secondary mb-6 flex items-center">
                <LayoutDashboard className="w-5 h-5 mr-3 text-primary" /> Módulos del Sistema
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-gray-100 rounded-xl hover:border-primary/20 transition-colors">
                  <h4 className="font-bold text-secondary mb-2">Core Engine</h4>
                  <p className="text-sm text-gray-500">Procesamiento distribuido de datos académicos en tiempo real.</p>
                </div>
                <div className="p-4 border border-gray-100 rounded-xl hover:border-primary/20 transition-colors">
                  <h4 className="font-bold text-secondary mb-2">API Gateway</h4>
                  <p className="text-sm text-gray-500">Seguridad y enrutamiento mediante {project.cloudProvider}.</p>
                </div>
              </div>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-secondary mb-6 flex items-center">
                <Cpu className="w-5 h-5 mr-3 text-primary" /> Tecnologías Clave ({project.cloudProvider})
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {isAzure ? (
                  <>
                    <TechCard title="App Service" cat="Compute" color="blue" />
                    <TechCard title="SQL Database" cat="Storage" color="blue" />
                    <TechCard title="Functions" cat="Serverless" color="blue" />
                    <TechCard title="Entra ID" cat="Identity" color="blue" />
                  </>
                ) : (
                  <>
                    <TechCard title="Amazon EC2" cat="Compute" color="orange" />
                    <TechCard title="Amazon RDS" cat="Database" color="orange" />
                    <TechCard title="AWS Lambda" cat="Serverless" color="orange" />
                    <TechCard title="Amazon S3" cat="Storage" color="orange" />
                  </>
                )}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-secondary mb-6 flex items-center">
                <Server className="w-5 h-5 mr-3 text-primary" /> Infraestructura
              </h2>
              <div className="space-y-4">
                <div className={`p-4 rounded-2xl ${brandBg} border border-transparent`}>
                  <p className={`text-xs font-bold uppercase tracking-wider ${brandColor} mb-1`}>Database</p>
                  <p className="text-secondary font-bold">Supabase (PostgreSQL)</p>
                </div>
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Framework</p>
                  <p className="text-secondary font-bold">Next.js 15 + React 19</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

function TechCard({ title, cat, color }: { title: string, cat: string, color: 'blue' | 'orange' }) {
  const base = color === 'blue' ? 'bg-blue-50/50 border-blue-100 text-blue-600' : 'bg-orange-50/50 border-orange-100 text-orange-600';
  return (
    <div className={`flex flex-col items-center p-4 rounded-2xl border transition-transform hover:scale-105 ${base}`}>
      <div className="font-bold text-[10px] md:text-xs mb-1 text-center leading-tight">{title}</div>
      <span className="text-[8px] md:text-[10px] text-gray-500 uppercase font-medium">{cat}</span>
    </div>
  );
}