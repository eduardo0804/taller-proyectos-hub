"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowRight, 
  Cloud, 
  Cpu, 
  Users, 
  Calendar, 
  Layers, 
  Database,
  Rocket
} from "lucide-react";

export default function LandingPage() {
  const projects = [
    {
      title: "Legado Fia",
      slug: "legado-fia",
      description: "Sistema inteligente para la gestión y automatización de horarios académicos EPICS.",
      provider: "Microsoft Azure",
      color: "border-blue-500",
      bg: "hover:bg-blue-50",
      icon: <Cloud className="text-blue-500 w-8 h-8 md:w-10 md:h-10" />,
    },
    {
      title: "NANUTECH",
      slug: "nanutech",
      description: "Plataforma de control logístico y optimización del margen operativo de transporte.",
      provider: "AWS Cloud",
      color: "border-orange-500",
      bg: "hover:bg-orange-50",
      icon: <Cpu className="text-orange-500 w-8 h-8 md:w-10 md:h-10" />,
    },
  ];

  const stats = [
    { label: "Talento USMP", val: "36", icon: <Users className="w-6 h-6" /> },
    { label: "Semanas de Sprint", val: "16", icon: <Calendar className="w-6 h-6" /> },
    { label: "Metodología", val: "Scrum", icon: <Database className="w-6 h-6" /> },
    { label: "Arquitectura", val: "Nativa Cloud", icon: <Layers className="w-6 h-6" /> },
  ];

  return (
    <div className="flex flex-col items-center overflow-hidden">
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 text-center px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col items-center max-w-4xl mx-auto">
            <div className="mb-6 md:mb-8 w-20 h-20 md:w-28 md:h-28 bg-primary/10 rounded-full flex items-center justify-center border-2 border-primary/20 shadow-inner">
              <Rocket className="w-10 h-10 md:w-12 md:h-12 text-primary" />
            </div>

            <h2 className="text-primary text-xs md:text-sm font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase mb-3 md:mb-4 px-2">
              Facultad de Ingeniería y Arquitectura
            </h2>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-secondary mb-4 md:mb-6 tracking-tight leading-tight">
              Innovación <br className="sm:hidden" /><span className="text-primary">Académica</span>
            </h1>
            <p className="max-w-2xl mx-auto text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed px-4">
              Ecosistema digital de difusión para los proyectos de vanguardia desarrollados por la 
              Escuela de Ingeniería de Computación y Sistemas.
            </p>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="mt-8 md:mt-12">
                <Link 
                  href="/#proyectos" 
                  className="bg-primary text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-sm md:text-base shadow-xl hover:bg-primary/90 transition-all flex items-center group w-full sm:w-auto justify-center"
                >
                  Explorar Proyectos <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Project Selector Section */}
      <section id="proyectos" className="w-full max-w-7xl py-16 md:py-24 px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="text-center mb-12 md:mb-16">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary">Proyectos en Curso</h3>
          <div className="w-16 md:w-20 h-1 md:h-1.5 bg-primary mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/proyecto/${project.slug}`}>
                <div className={`h-full flex flex-col p-6 md:p-10 bg-white border-b-8 ${project.color} rounded-2xl shadow-xl hover:shadow-2xl transition-all cursor-pointer group relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 p-4 opacity-30 group-hover:scale-150 group-hover:opacity-60 transition-all duration-500 pointer-events-none">
                    {project.icon}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 md:mb-8 gap-4 sm:gap-0">
                    <div className="p-3 md:p-4 bg-gray-50 rounded-2xl group-hover:bg-white group-hover:shadow-md transition-all self-start">
                      {project.icon}
                    </div>
                    <span className="text-[10px] sm:text-xs font-black text-gray-400 uppercase tracking-widest bg-gray-100 px-3 py-1.5 rounded-full self-start sm:self-auto">
                      {project.provider}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-black text-secondary mb-3 md:mb-4 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-8 md:mb-10 text-sm md:text-base lg:text-lg leading-relaxed flex-grow">
                    {project.description}
                  </p>
                  
                  <div className="flex items-center text-primary font-black uppercase text-xs md:text-sm tracking-widest mt-auto group-hover:gap-4 transition-all gap-2">
                    Explorar Detalle <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full bg-secondary py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.9 }} 
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-center flex flex-col items-center p-4">
                <div className="text-primary mb-3 md:mb-4 opacity-90 bg-white/5 p-3 md:p-4 rounded-full">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2 tracking-tighter">
                  {stat.val}
                </div>
                <div className="text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] text-center">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}