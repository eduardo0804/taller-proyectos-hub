import { Github, Mail, Globe, MapPin, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white border-t-4 border-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        {/* Redujimos el gap en móviles de gap-10 a gap-8 para que no sea tan largo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center md:text-left">
          
          {/* Col 1: Brand */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2 flex flex-col items-center md:items-start">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-4 md:mb-6">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-lg flex items-center justify-center shadow-lg shrink-0">
                <span className="text-white font-bold text-lg md:text-xl">HUB</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold tracking-tight">Difusión Académica USMP</h3>
            </div>
            
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 max-w-md mx-auto md:mx-0">
              Portal oficial para la visualización de arquitectura de nube y seguimiento semanal 
              de los proyectos de innovación del Taller de Proyectos de la Escuela de 
              Ingeniería de Computación y Sistemas.
            </p>
            
            <div className="flex items-center justify-center md:justify-start space-x-4">
               <a href="mailto:info@usmp.pe" className="p-2 md:p-2.5 bg-white/5 rounded-full hover:bg-primary transition-colors focus:ring-2 focus:ring-primary focus:outline-none" aria-label="Enviar correo">
                  <Mail className="w-5 h-5 md:w-6 md:h-6 text-gray-300 hover:text-white transition-colors" />
               </a>
               <a href="#" className="p-2 md:p-2.5 bg-white/5 rounded-full hover:bg-primary transition-colors focus:ring-2 focus:ring-primary focus:outline-none" aria-label="Repositorio de GitHub">
                  <Github className="w-5 h-5 md:w-6 md:h-6 text-gray-300 hover:text-white transition-colors" />
               </a>
               <a href="#" className="p-2 md:p-2.5 bg-white/5 rounded-full hover:bg-primary transition-colors focus:ring-2 focus:ring-primary focus:outline-none" aria-label="Sitio web de USMP">
                  <Globe className="w-5 h-5 md:w-6 md:h-6 text-gray-300 hover:text-white transition-colors" />
               </a>
            </div>
          </div>

          {/* Col 2: Proyectos */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-xs md:text-sm font-bold uppercase tracking-widest text-primary mb-4 md:mb-6">Proyectos</h4>
            <ul className="space-y-3 md:space-y-4 flex flex-col items-center md:items-start">
              <li>
                <Link href="/proyecto/legado-fia" className="text-gray-400 hover:text-white text-sm md:text-base flex items-center group transition-colors">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 md:mr-3 shrink-0"></span>
                  Legado Fia (Azure)
                </Link>
              </li>
              <li>
                <Link href="/proyecto/nanutech" className="text-gray-400 hover:text-white text-sm md:text-base flex items-center group transition-colors">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2 md:mr-3 shrink-0"></span>
                  NANUTECH (AWS)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Universidad */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-xs md:text-sm font-bold uppercase tracking-widest text-primary mb-4 md:mb-6">Universidad</h4>
            <div className="space-y-2 md:space-y-3 text-sm md:text-base text-gray-400 flex flex-col items-center md:items-start">
              <p className="flex items-center justify-center md:justify-start">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 mr-2 text-primary shrink-0" />
                <span>Facultad de Ingeniería y Arquitectura</span>
              </p>
              {/* En móvil se centra, en desktop respeta el padding izquierdo (md:pl-7) para alinear con el texto de arriba */}
              <p className="text-xs md:text-sm md:pl-7">Sede La Molina, Lima - Perú</p>
              <a href="https://fia.usmp.edu.pe" target="_blank" rel="noopener noreferrer" className="inline-flex items-center hover:text-white text-primary transition-colors mt-2 md:pl-7">
                Sitio FIA <ExternalLink className="w-3 h-3 md:w-4 md:h-4 ml-1.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 md:mt-16 pt-6 md:pt-8 border-t border-white/10 flex flex-col lg:flex-row justify-between items-center text-xs md:text-sm text-gray-500 space-y-4 lg:space-y-0 text-center lg:text-left">
          <p>© {currentYear} Taller de Proyectos Hub. Todos los derechos reservados.</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <span className="hover:text-gray-300 cursor-help transition-colors">Términos Académicos</span>
            <span className="hover:text-gray-300 cursor-help transition-colors">Privacidad de Datos</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;