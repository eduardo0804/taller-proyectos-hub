import { ShieldCheck } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Navbar Exclusivo del Admin */}
      <header className="bg-slate-900 text-white py-4 px-6 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-green-400" />
            <h1 className="font-bold tracking-widest text-sm uppercase">USMP CMS Panel</h1>
          </div>
          <div className="text-xs text-slate-400">
            Modo Administrador Autorizado
          </div>
        </div>
      </header>

      {/* Contenedor Principal */}
      <main className="flex-grow max-w-7xl w-full mx-auto p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}