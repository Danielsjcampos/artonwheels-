import React, { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  schema?: any;
}

export function SEO({ 
  title, 
  description, 
  keywords, 
  image = 'https://artonwheelsgarage.pt/wp-content/uploads/2024/03/logo-art-on-wheels.png', 
  url = 'https://artonwheelsgarage.pt/', 
  type = 'website',
  schema
}: SEOProps) {
  const fullTitle = title ? `${title} | ART ON WHEELS` : 'ART ON WHEELS | Premium Automotive Experience';
  const defaultDesc = 'Especialistas em performance e estética automotiva de luxo. Jantes exclusivas, motos de elite e detalhe técnico premium em Portugal.';

  useEffect(() => {
    // Basic Meta
    document.title = fullTitle;
    
    const updateMeta = (name: string, content: string, attr: 'name' | 'property' = 'name') => {
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMeta('description', description || defaultDesc);
    if (keywords) updateMeta('keywords', keywords);

    // Open Graph
    updateMeta('og:title', fullTitle, 'property');
    updateMeta('og:description', description || defaultDesc, 'property');
    updateMeta('og:image', image, 'property');
    updateMeta('og:url', url, 'property');
    updateMeta('og:type', type, 'property');

    // Twitter
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', fullTitle);
    updateMeta('twitter:description', description || defaultDesc);
    updateMeta('twitter:image', image);

    // JSON-LD Schema
    const scriptId = 'json-ld-schema';
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    
    if (schema) {
      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.text = JSON.stringify(schema);
    } else if (script) {
      script.remove();
    }

  }, [title, description, keywords, image, url, type, schema]);

  return null;
}
