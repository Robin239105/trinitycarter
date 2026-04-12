import { useEffect } from 'react';

/**
 * SEO Component for manual Head management in SPAs.
 * Handles Title, Meta Description, OG Tags, Twitter Cards, and JSON-LD Schema.
 */
export default function SEO({ 
  title, 
  description, 
  image = 'https://trinitycarter.vercel.app/trinity-hero.webp',
  url = 'https://trinitycarter.vercel.app/',
  type = 'website',
  schema 
}) {
  useEffect(() => {
    // 1. Set Document Title
    const fullTitle = `${title} | Trinity Carter`;
    document.title = fullTitle;

    // 2. Helper to set meta tags
    const setMetaTag = (attr, value, content) => {
      let element = document.querySelector(`meta[${attr}="${value}"]`);
      if (element) {
        element.setAttribute('content', content);
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute(attr, value);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    };

    // 3. Set Standard Meta Tags
    if (description) setMetaTag('name', 'description', description);
    
    // 4. Set Open Graph Tags
    setMetaTag('property', 'og:title', fullTitle);
    if (description) setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:image', image);
    setMetaTag('property', 'og:url', url);
    setMetaTag('property', 'og:type', type);

    // 5. Set Twitter Tags
    setMetaTag('name', 'twitter:title', fullTitle);
    if (description) setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', image);
    setMetaTag('name', 'twitter:card', 'summary_large_image');

    // 6. Handle JSON-LD Schema
    let script = document.getElementById('seo-schema');
    if (schema) {
      if (!script) {
        script = document.createElement('script');
        script.id = 'seo-schema';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.innerHTML = JSON.stringify(schema);
    } else if (script) {
      script.remove();
    }

    // Cleanup (optional - might want to keep tags if they are generic)
    return () => {
      // In a real SPA, you'd reset to defaults here if navigating away
    };
  }, [title, description, image, url, type, schema]);

  return null;
}
