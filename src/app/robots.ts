import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Reemplazaremos esta URL luego por la que te dé Vercel
  const baseUrl = 'https://taller-proyectos-hub.vercel.app'; 

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // ¡Vital! Le decimos a Google que NO entre ni indexe el CMS oculto
      disallow: ['/admin-gestion/', '/api/'], 
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}