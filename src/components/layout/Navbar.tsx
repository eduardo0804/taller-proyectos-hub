"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { Menu, X, Home, Users, TrendingUp, Layers, FolderOpen } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const pathname = usePathname();
  const params = useParams();
  
  // Obtenemos el slug actual de la URL (si existe)
  const slug = params?.slug as string;

  // Lógica de "Scroll Spy" para detectar dónde está leyendo el usuario
  useEffect(() => {
    // Si no estamos en el Home, no necesitamos espiar el scroll del hero/proyectos
    if (pathname !== '/') {
      setActiveSection("");
      return;
    }

    const handleScroll = () => {
      const proyectosSection = document.getElementById('proyectos');
      if (proyectosSection) {
        const rect = proyectosSection.getBoundingClientRect();
        // Si el tope de la sección 'proyectos' llega a la mitad superior de la pantalla
        if (rect.top <= window.innerHeight / 2) {
          setActiveSection('proyectos');
        } else {
          setActiveSection('inicio');
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Revisar posición inicial al cargar

    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // Construimos los items dinámicamente basados en el proyecto actual
  const navItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Proyectos', path: '/#proyectos' },
    { 
      name: 'Equipo', 
      path: slug ? `/proyecto/${slug}/equipo` : '#', 
      disabled: !slug 
    },
    { 
      name: 'Avances', 
      path: slug ? `/proyecto/${slug}/avances` : '#', 
      disabled: !slug 
    },
    { 
      name: 'Arquitectura', 
      path: slug ? `/proyecto/${slug}/arquitectura` : '#', 
      disabled: !slug 
    },
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Inicio': return <Home className="w-4 h-4" />;
      case 'Proyectos': return <FolderOpen className="w-4 h-4" />;
      case 'Equipo': return <Users className="w-4 h-4" />;
      case 'Avances': return <TrendingUp className="w-4 h-4" />;
      case 'Arquitectura': return <Layers className="w-4 h-4" />;
      default: return null;
    }
  };

  // Evaluador inteligente de estado activo
  const checkIsActive = (itemName: string, itemPath: string) => {
    if (itemName === 'Inicio') return pathname === '/' && activeSection === 'inicio';
    if (itemName === 'Proyectos') return pathname === '/' && activeSection === 'proyectos';
    if (itemPath === '#') return false;
    return pathname.includes(itemPath);
  };

  return (
    <nav className="bg-white shadow-md border-b-2 border-primary sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group shrink-0">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-lg group-hover:rotate-3 transition-transform">
              <span className="text-white font-bold text-lg">HUB</span>
            </div>
            <div className="hidden lg:block">
              <h1 className="text-xl font-bold text-secondary leading-none">Taller Proyectos</h1>
              {slug && <span className="text-[10px] text-primary font-bold uppercase tracking-widest">{slug.replace('-', ' ')}</span>}
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              if (item.disabled) return null;

              const isActive = checkIsActive(item.name, item.path);

              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`flex items-center space-x-2 px-3 lg:px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${
                    isActive 
                      ? 'bg-primary text-white shadow-md' 
                      : 'text-secondary hover:text-primary hover:bg-gray-50'
                  }`}
                >
                  {getIcon(item.name)}
                  <span className="hidden lg:inline">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden p-2 rounded-md text-secondary hover:bg-gray-100 transition-colors focus:outline-none"
            aria-label="Menú principal"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-2xl border-t border-gray-100 animate-in slide-in-from-top duration-300 z-50">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navItems.map((item) => {
               if (item.disabled) return null;
               
               const isActive = checkIsActive(item.name, item.path);
               
               return (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-4 px-4 py-4 rounded-xl text-base font-bold transition-colors ${
                    isActive ? 'bg-primary/10 text-primary' : 'text-secondary hover:bg-gray-50'
                  }`}
                >
                  <div className={`${isActive ? 'text-primary' : 'text-gray-400'}`}>
                     {getIcon(item.name)}
                  </div>
                  <span>{item.name}</span>
                </Link>
               )
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;