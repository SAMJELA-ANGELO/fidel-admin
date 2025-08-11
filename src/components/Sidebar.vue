<template>
  <nav class="sidebar" :class="{ open: isOpen }">
    <div class="sidebar-header">
      <div class="sidebar-brand">
        <div class="sidebar-logo">
          <svg
            class="logo-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <div class="sidebar-brand-text">
          <h2 class="brand-title">Fidel</h2>
          <span class="brand-subtitle">Admin</span>
        </div>
      </div>
      <button
        class="close-btn"
        @click="$emit('close')"
        aria-label="Close sidebar"
      >
        <svg
          class="close-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </div>

    <div class="sidebar-content">
      <div class="nav-section">
        <h3 class="nav-section-title">Main Menu</h3>
        <ul class="nav-list">
          <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="active">
              <svg
                class="nav-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
                ></path>
              </svg>
              <span class="nav-text">Dashboard</span>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/products" class="nav-link" active-class="active">
              <svg
                class="nav-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                ></path>
              </svg>
              <span class="nav-text">Products</span>
              <span class="nav-badge">{{ productCount }}</span>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              to="/create-product"
              class="nav-link"
              active-class="active"
            >
              <svg
                class="nav-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
              <span class="nav-text">Create Product</span>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/orders" class="nav-link" active-class="active">
              <svg
                class="nav-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                ></path>
              </svg>
              <span class="nav-text">Orders</span>
              <span class="nav-badge new">{{ orderCount }}</span>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              to="/categories"
              class="nav-link"
              active-class="active"
            >
              <svg
                class="nav-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                ></path>
              </svg>
              <span class="nav-text">Categories</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>

    <div class="sidebar-footer">
      <button class="logout-btn" @click="logout">
        <svg
          class="logout-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          ></path>
        </svg>
        <span class="logout-text">Logout</span>
      </button>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getProducts, getOrders } from "../api";

export default defineComponent({
  name: "AdminSidebar",
  props: {
    isOpen: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup() {
    const router = useRouter();
    const productCount = ref(0);
    const orderCount = ref(0);

    const fetchCounts = async () => {
      try {
        const [productsResponse, ordersResponse] = await Promise.all([
          getProducts(),
          getOrders(),
        ]);

        productCount.value = productsResponse.data.length;
        orderCount.value = ordersResponse.data.length;
      } catch (error) {
        console.error("Error fetching counts:", error);
        // Set fallback values if API fails
        productCount.value = 0;
        orderCount.value = 0;
      }
    };

    const logout = () => {
      localStorage.removeItem("admin_token");
      router.push("/login");
    };

    onMounted(() => {
      fetchCounts();
    });

    return {
      logout,
      productCount,
      orderCount,
    };
  },
});
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 280px;
  background: white;
  border-right: 1px solid #e2e8f0;
  transform: translateX(-100%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 999;
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
}

.sidebar.open {
  transform: translateX(0);
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  background: #f8fafc;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.sidebar-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-radius: 10px;
  color: white;
}

.logo-icon {
  width: 22px;
  height: 22px;
}

.sidebar-brand-text {
  display: flex;
  flex-direction: column;
}

.brand-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1;
}

.brand-subtitle {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 500;
}

.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  border-radius: 6px;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: #e2e8f0;
  color: #475569;
}

.close-icon {
  width: 18px;
  height: 18px;
}

.sidebar-content {
  flex: 1;
  padding: 1.5rem 0;
  overflow-y: auto;
}

.nav-section {
  margin-bottom: 2rem;
}

.nav-section:last-child {
  margin-bottom: 0;
}

.nav-section-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0 1.5rem;
  margin-bottom: 0.75rem;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin: 0;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  color: #64748b;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  position: relative;
  border-right: 3px solid transparent;
}

.nav-link:hover {
  background: #f1f5f9;
  color: #475569;
}

.nav-link.active {
  background: #eff6ff;
  color: #1d4ed8;
  border-right-color: #3b82f6;
}

.nav-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.nav-text {
  flex: 1;
}

.nav-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  background: #e2e8f0;
  color: #64748b;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 600;
}

.nav-badge.new {
  background: #ef4444;
  color: white;
}

.sidebar-footer {
  padding: 1.5rem;
  border-top: 1px solid #e2e8f0;
  background: #f8fafc;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background: #fef2f2;
  color: #ef4444;
  border: 1px solid #fecaca;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.logout-btn:hover {
  background: #fee2e2;
  border-color: #fca5a5;
}

.logout-icon {
  width: 18px;
  height: 18px;
}

.logout-text {
  flex: 1;
  text-align: left;
}

/* Mobile styles */
@media (max-width: 767px) {
  .sidebar {
    width: 85vw;
    max-width: 320px;
  }

  .sidebar-header {
    padding: 1rem;
  }

  .sidebar-content {
    padding: 1rem 0;
  }

  .nav-section-title {
    padding: 0 1rem;
  }

  .nav-link {
    padding: 0.75rem 1rem;
  }

  .sidebar-footer {
    padding: 1rem;
  }
}

/* Scrollbar styling */
.sidebar-content::-webkit-scrollbar {
  width: 4px;
}

.sidebar-content::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar-content::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 2px;
}

.sidebar-content::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
