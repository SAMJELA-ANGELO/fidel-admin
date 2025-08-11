import { watch } from "vue";
import { useRoute } from "vue-router";

export function useSeo() {
  const route = useRoute();

  const generateStructuredData = (pageType: string, data?: any) => {
    const baseData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: document.title,
      description:
        document
          .querySelector('meta[name="description"]')
          ?.getAttribute("content") || "",
      url: `https://fidel-admin.netlify.app${route.path}`,
      publisher: {
        "@type": "Organization",
        name: "Fidel Admin Portal",
        url: "https://fidel-admin.netlify.app",
      },
    };

    switch (pageType) {
      case "dashboard":
        return {
          ...baseData,
          "@type": "WebApplication",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web Browser",
          description: "Admin dashboard for managing Fidel store operations",
        };

      case "products":
        return {
          ...baseData,
          "@type": "CollectionPage",
          description: "Product catalog management for Fidel store",
          mainEntity: {
            "@type": "ItemList",
            name: "Products",
          },
        };

      case "orders":
        return {
          ...baseData,
          "@type": "CollectionPage",
          description: "Order management for Fidel store",
          mainEntity: {
            "@type": "ItemList",
            name: "Orders",
          },
        };

      case "categories":
        return {
          ...baseData,
          "@type": "CollectionPage",
          description: "Product category management for Fidel store",
          mainEntity: {
            "@type": "ItemList",
            name: "Categories",
          },
        };

      default:
        return baseData;
    }
  };

  const updateSeo = () => {
    const meta = route.meta;

    // Update page title
    if (meta.title) {
      document.title = meta.title as string;
    }

    // Update meta tags
    if (meta.metaTags && Array.isArray(meta.metaTags)) {
      meta.metaTags.forEach((tag: any) => {
        let element: HTMLMetaElement | HTMLLinkElement | null = null;

        if (tag.property) {
          // Open Graph tags
          element = document.querySelector(
            `meta[property="${tag.property}"]`
          ) as HTMLMetaElement;
          if (!element) {
            element = document.createElement("meta");
            element.setAttribute("property", tag.property);
            document.head.appendChild(element);
          }
        } else if (tag.name) {
          // Standard meta tags
          element = document.querySelector(
            `meta[name="${tag.name}"]`
          ) as HTMLMetaElement;
          if (!element) {
            element = document.createElement("meta");
            element.setAttribute("name", tag.name);
            document.head.appendChild(element);
          }
        }

        if (element) {
          element.setAttribute("content", tag.content);
        }
      });
    }

    // Update canonical URL if present
    const canonicalTag = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement;
    if (canonicalTag) {
      const baseUrl = "https://fidel-admin.netlify.app";
      canonicalTag.href = `${baseUrl}${route.path}`;
    }

    // Generate and update structured data
    const pageType = route.name as string;
    const structuredData = generateStructuredData(pageType);

    // Remove existing structured data
    const existingScript = document.querySelector(
      'script[type="application/ld+json"]'
    );
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  };

  // Watch for route changes and update SEO
  watch(
    () => route.path,
    () => {
      updateSeo();
    },
    { immediate: true }
  );

  return {
    updateSeo,
    generateStructuredData,
  };
}
