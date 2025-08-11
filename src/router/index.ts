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
      ],
    },
  },
  {
    path: "/products",
    name: "products",
    component: () => import("../views/ProductsView.vue"),
  },
  {
    path: "/create-product",
    name: "create-product",
    component: () => import("../views/CreateProductView.vue"),
  },
  {
    path: "/products/:id",
    name: "product-detail",
    component: () => import("../views/ProductDetailView.vue"),
  },
  {
    path: "/products/:id/edit",
    name: "edit-product",
    component: () => import("../views/EditProductView.vue"),
  },
  {
    path: "/orders",
    name: "orders",
    component: () => import("../views/OrdersView.vue"),
  },
  {
    path: "/orders/:id",
    name: "order-detail",
    component: () => import("../views/OrderDetailView.vue"),
  },
  {
    path: "/categories",
    name: "categories",
    component: () => import("../views/CategoriesView.vue"),
  },
  {
    path: "/categories/:id",
    name: "category-detail",
    component: () => import("../views/CategoryDetailView.vue"),
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
