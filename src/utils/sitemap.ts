// Sitemap utility for SEO
export const generateSitemap = () => {
  const baseUrl = "https://fidel-admin.netlify.app";
  const currentDate = new Date().toISOString();

  const routes = [
    {
      path: "/dashboard",
      lastmod: currentDate,
      changefreq: "daily",
      priority: "0.9",
    },
    {
      path: "/products",
      lastmod: currentDate,
      changefreq: "daily",
      priority: "0.8",
    },
    {
      path: "/orders",
      lastmod: currentDate,
      changefreq: "daily",
      priority: "0.8",
    },
    {
      path: "/categories",
      lastmod: currentDate,
      changefreq: "weekly",
      priority: "0.7",
    },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return sitemap;
};

// Robots.txt content
export const generateRobotsTxt = () => {
  return `User-agent: *
Allow: /dashboard
Allow: /products
Allow: /orders
Allow: /categories
Disallow: /create-product
Disallow: /products/*/edit
Disallow: /products/*
Disallow: /orders/*
Disallow: /categories/*
Disallow: /

Sitemap: https://fidel-admin.netlify.app/sitemap.xml`;
};
