import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "login",
    component: () => import("../views/LoginView.vue"),
    meta: {
      title: "Login | Fidel Admin Portal",
      metaTags: [
        {
          name: "description",
          content:
            "Sign in to the Fidel Admin Portal to manage your store, products, and orders.",
        },
        { name: "robots", content: "noindex, nofollow" },
        { property: "og:title", content: "Login | Fidel Admin Portal" },
        {
          property: "og:description",
          content:
            "Sign in to the Fidel Admin Portal to manage your store, products, and orders.",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://fidel-admin.netlify.app/" },
        { property: "og:site_name", content: "Fidel Admin Portal" },
        { property: "og:locale", content: "en_US" },
        { name: "twitter:title", content: "Login | Fidel Admin Portal" },
        {
          name: "twitter:description",
          content:
            "Sign in to the Fidel Admin Portal to manage your store, products, and orders.",
        },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:site", content: "@fidel" },
        {
          name: "keywords",
          content:
            "login, admin portal, store management, authentication, ecommerce",
        },
        { name: "author", content: "Fidel Admin Portal" },
        { name: "language", content: "en" },
      ],
    },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/DashboardView.vue"),
    meta: {
      title: "Dashboard | Fidel Admin Portal",
      metaTags: [
        {
          name: "description",
          content:
            "Overview of your Fidel store: recent orders, quick actions, and stats.",
        },
        { name: "robots", content: "index, follow" },
        { property: "og:title", content: "Dashboard | Fidel Admin Portal" },
        {
          property: "og:description",
          content:
            "Overview of your Fidel store: recent orders, quick actions, and stats.",
        },
        { property: "og:type", content: "website" },
        {
          property: "og:url",
          content: "https://fidel-admin.netlify.app/dashboard",
        },
        { property: "og:site_name", content: "Fidel Admin Portal" },
        { property: "og:locale", content: "en_US" },
        { name: "twitter:title", content: "Dashboard | Fidel Admin Portal" },
        {
          name: "twitter:description",
          content:
            "Overview of your Fidel store: recent orders, quick actions, and stats.",
        },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:site", content: "@fidel" },
        {
          name: "keywords",
          content:
            "dashboard, admin, store management, analytics, overview, ecommerce, business",
        },
        { name: "author", content: "Fidel Admin Portal" },
        {
          name: "canonical",
          content: "https://fidel-admin.netlify.app/dashboard",
        },
        { name: "language", content: "en" },
        { name: "revisit-after", content: "7 days" },
      ],
    },
  },
  {
    path: "/products",
    name: "products",
    component: () => import("../views/ProductsView.vue"),
    meta: {
      title: "Products | Fidel Admin Portal",
      metaTags: [
        {
          name: "description",
          content:
            "Manage your product catalog: view, edit, and organize all products in your Fidel store.",
        },
        { name: "robots", content: "index, follow" },
        { property: "og:title", content: "Products | Fidel Admin Portal" },
        {
          property: "og:description",
          content:
            "Manage your product catalog: view, edit, and organize all products in your Fidel store.",
        },
        { property: "og:type", content: "website" },
        {
          property: "og:url",
          content: "https://fidel-admin.netlify.app/products",
        },
        { property: "og:site_name", content: "Fidel Admin Portal" },
        { property: "og:locale", content: "en_US" },
        { name: "twitter:title", content: "Products | Fidel Admin Portal" },
        {
          name: "twitter:description",
          content:
            "Manage your product catalog: view, edit, and organize all products in your Fidel store.",
        },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:site", content: "@fidel" },
        {
          name: "keywords",
          content:
            "products, catalog, inventory, store management, admin, ecommerce, product management",
        },
        { name: "author", content: "Fidel Admin Portal" },
        {
          name: "canonical",
          content: "https://fidel-admin.netlify.app/products",
        },
        { name: "language", content: "en" },
        { name: "revisit-after", content: "7 days" },
      ],
    },
  },
  {
    path: "/create-product",
    name: "create-product",
    component: () => import("../views/CreateProductView.vue"),
    meta: {
      title: "Create Product | Fidel Admin Portal",
      metaTags: [
        {
          name: "description",
          content:
            "Add new products to your store with detailed information, images, and pricing.",
        },
        { name: "robots", content: "noindex, nofollow" },
        {
          property: "og:title",
          content: "Create Product | Fidel Admin Portal",
        },
        {
          property: "og:description",
          content:
            "Add new products to your store with detailed information, images, and pricing.",
        },
        { property: "og:type", content: "website" },
        {
          property: "og:url",
          content: "https://fidel-admin.netlify.app/create-product",
        },
        {
          name: "twitter:title",
          content: "Create Product | Fidel Admin Portal",
        },
        {
          name: "twitter:description",
          content:
            "Add new products to your store with detailed information, images, and pricing.",
        },
      ],
    },
  },
  {
    path: "/products/:id",
    name: "product-detail",
    component: () => import("../views/ProductDetailView.vue"),
    meta: {
      title: "Product Detail | Fidel Admin Portal",
      metaTags: [
        {
          name: "description",
          content:
            "View and manage detailed product information, inventory, and settings.",
        },
        { name: "robots", content: "noindex, nofollow" },
        {
          property: "og:title",
          content: "Product Detail | Fidel Admin Portal",
        },
        {
          property: "og:description",
          content:
            "View and manage detailed product information, inventory, and settings.",
        },
        { property: "og:type", content: "website" },
        {
          property: "og:url",
          content: "https://fidel-admin.netlify.app/products/:id",
        },
        {
          name: "twitter:title",
          content: "Product Detail | Fidel Admin Portal",
        },
        {
          name: "twitter:description",
          content:
            "View and manage detailed product information, inventory, and settings.",
        },
      ],
    },
  },
  {
    path: "/products/:id/edit",
    name: "edit-product",
    component: () => import("../views/EditProductView.vue"),
    meta: {
      title: "Edit Product | Fidel Admin Portal",
      metaTags: [
        {
          name: "description",
          content:
            "Modify product details, pricing, images, and inventory information.",
        },
        { name: "robots", content: "noindex, nofollow" },
        { property: "og:title", content: "Edit Product | Fidel Admin Portal" },
        {
          property: "og:description",
          content:
            "Modify product details, pricing, images, and inventory information.",
        },
        { property: "og:type", content: "website" },
        {
          property: "og:url",
          content: "https://fidel-admin.netlify.app/products/:id/edit",
        },
        { name: "twitter:title", content: "Edit Product | Fidel Admin Portal" },
        {
          name: "twitter:description",
          content:
            "Modify product details, pricing, images, and inventory information.",
        },
      ],
    },
  },
  {
    path: "/orders",
    name: "orders",
    component: () => import("../views/OrdersView.vue"),
    meta: {
      title: "Orders | Fidel Admin Portal",
      metaTags: [
        {
          name: "description",
          content:
            "Manage customer orders: view order status, process payments, and track fulfillment.",
        },
        { name: "robots", content: "index, follow" },
        { property: "og:title", content: "Orders | Fidel Admin Portal" },
        {
          property: "og:description",
          content:
            "Manage customer orders: view order status, process payments, and track fulfillment.",
        },
        { property: "og:type", content: "website" },
        {
          property: "og:url",
          content: "https://fidel-admin.netlify.app/orders",
        },
        { property: "og:site_name", content: "Fidel Admin Portal" },
        { property: "og:locale", content: "en_US" },
        { name: "twitter:title", content: "Orders | Fidel Admin Portal" },
        {
          name: "twitter:description",
          content:
            "Manage customer orders: view order status, process payments, and track fulfillment.",
        },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:site", content: "@fidel" },
        {
          name: "keywords",
          content:
            "orders, customer orders, order management, fulfillment, payments, ecommerce, admin",
        },
        { name: "author", content: "Fidel Admin Portal" },
        {
          name: "canonical",
          content: "https://fidel-admin.netlify.app/orders",
        },
        { name: "language", content: "en" },
        { name: "revisit-after", content: "7 days" },
      ],
    },
  },
  {
    path: "/orders/:id",
    name: "order-detail",
    component: () => import("../views/OrderDetailView.vue"),
    meta: {
      title: "Order Detail | Fidel Admin Portal",
      metaTags: [
        {
          name: "description",
          content:
            "View detailed order information, customer details, and order status.",
        },
        { name: "robots", content: "noindex, nofollow" },
        { property: "og:title", content: "Order Detail | Fidel Admin Portal" },
        {
          property: "og:description",
          content:
            "View detailed order information, customer details, and order status.",
        },
        { property: "og:type", content: "website" },
        {
          property: "og:url",
          content: "https://fidel-admin.netlify.app/orders/:id",
        },
        { name: "twitter:title", content: "Order Detail | Fidel Admin Portal" },
        {
          name: "twitter:description",
          content:
            "View detailed order information, customer details, and order status.",
        },
      ],
    },
  },
  {
    path: "/categories",
    name: "categories",
    component: () => import("../views/CategoriesView.vue"),
    meta: {
      title: "Categories | Fidel Admin Portal",
      metaTags: [
        {
          name: "description",
          content:
            "Organize your products with categories: create, edit, and manage product classifications.",
        },
        { name: "robots", content: "index, follow" },
        { property: "og:title", content: "Categories | Fidel Admin Portal" },
        {
          property: "og:description",
          content:
            "Organize your products with categories: create, edit, and manage product classifications.",
        },
        { property: "og:type", content: "website" },
        {
          property: "og:url",
          content: "https://fidel-admin.netlify.app/categories",
        },
        { property: "og:site_name", content: "Fidel Admin Portal" },
        { property: "og:locale", content: "en_US" },
        { name: "twitter:title", content: "Categories | Fidel Admin Portal" },
        {
          name: "twitter:description",
          content:
            "Organize your products with categories: create, edit, and manage product classifications.",
        },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:site", content: "@fidel" },
        {
          name: "keywords",
          content:
            "categories, product organization, classification, admin, ecommerce, product management",
        },
        { name: "author", content: "Fidel Admin Portal" },
        {
          name: "canonical",
          content: "https://fidel-admin.netlify.app/categories",
        },
        { name: "language", content: "en" },
        { name: "revisit-after", content: "7 days" },
      ],
    },
  },
  {
    path: "/categories/:id",
    name: "category-detail",
    component: () => import("../views/CategoryDetailView.vue"),
    meta: {
      title: "Category Detail | Fidel Admin Portal",
      metaTags: [
        {
          name: "description",
          content:
            "View and manage category details, associated products, and category settings.",
        },
        { name: "robots", content: "noindex, nofollow" },
        {
          property: "og:title",
          content: "Category Detail | Fidel Admin Portal",
        },
        {
          property: "og:description",
          content:
            "View and manage category details, associated products, and category settings.",
        },
        { property: "og:type", content: "website" },
        {
          property: "og:url",
          content: "https://fidel-admin.netlify.app/categories/:id",
        },
        {
          name: "twitter:title",
          content: "Category Detail | Fidel Admin Portal",
        },
        {
          name: "twitter:description",
          content:
            "View and manage category details, associated products, and category settings.",
        },
      ],
    },
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Route protection: require login for all routes except /login
router.beforeEach((to, from, next) => {
  const publicPages = ["/"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = !!localStorage.getItem("admin_token");

  if (authRequired && !loggedIn) {
    return next("/");
  }

  if (to.path === "/" && loggedIn) {
    return next("/dashboard");
  }

  next();
});

export default router;
