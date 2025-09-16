import React from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

export const SEO = ({ 
  title, 
  description, 
  keywords, 
  canonicalUrl,
  ogImage = "https://lovable.dev/opengraph-image-p98pqg.png"
}: SEOProps) => {
  // In a real app, you'd use React Helmet or Next.js Head
  // For this demo, we'll update the document head directly
  React.useEffect(() => {
    document.title = title;
    
    // Update meta tags
    const updateMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`) || 
                   document.querySelector(`meta[property="${name}"]`);
      if (element) {
        element.setAttribute('content', content);
      }
    };

    updateMeta('description', description);
    if (keywords) updateMeta('keywords', keywords);
    updateMeta('og:title', title);
    updateMeta('og:description', description);
    updateMeta('og:image', ogImage);
    if (canonicalUrl) updateMeta('og:url', canonicalUrl);
  }, [title, description, keywords, canonicalUrl, ogImage]);

  return null;
};