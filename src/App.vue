<template>
  <div id="app-layout">
    <template v-if="!isLoginPage">
      <AdminTopbar @toggle-sidebar="toggleSidebar" />

      <!-- Mobile backdrop -->
      <transition name="backdrop-fade">
        <div
          v-if="sidebarOpen && isMobile"
          class="sidebar-backdrop"
          @click="closeSidebar"
        ></div>
      </transition>

      <!-- Sidebar -->
      <AdminSidebar :isOpen="sidebarOpen" @close="closeSidebar" />
    </template>

    <!-- Main content -->
    <main class="main-content" :class="{ 'sidebar-open': sidebarOpen }">
      <div class="content-wrapper">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, computed } from "vue";
import { useRoute } from "vue-router";
import AdminTopbar from "./components/Topbar.vue";
import AdminSidebar from "./components/Sidebar.vue";
import { useSeo } from "./composables/useSeo";

export default defineComponent({
  name: "App",
  components: { AdminTopbar, AdminSidebar },
  setup() {
    const route = useRoute();
    const sidebarOpen = ref(true); // Default to open on desktop
    const isMobile = ref(false);

    // Initialize SEO management
    useSeo();

    // Hide Topbar/Sidebar on login page (now at '/')
    const isLoginPage = computed(() => route.path === "/");

    const checkScreenSize = () => {
      isMobile.value = window.innerWidth < 768;
      // Auto-close sidebar on mobile, keep open on desktop
      if (isMobile.value) {
        sidebarOpen.value = false;
      } else {
        sidebarOpen.value = true;
      }
    };

    const toggleSidebar = () => {
      if (isMobile.value) {
        sidebarOpen.value = !sidebarOpen.value;
      }
    };

    const closeSidebar = () => {
      sidebarOpen.value = false;
    };

    onMounted(() => {
      checkScreenSize();
      window.addEventListener("resize", checkScreenSize);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", checkScreenSize);
    });

    return {
      sidebarOpen,
      isMobile,
      toggleSidebar,
      closeSidebar,
      isLoginPage,
    };
  },
});
</script>

<style>
/* Global styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
}

body {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, sans-serif;
  line-height: 1.6;
  color: #1a1a1a;
  background: #f8fafc;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  min-height: 100vh;
}

#app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f8fafc;
}

/* Sidebar backdrop */
.sidebar-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
  backdrop-filter: blur(4px);
}

/* Main content */
.main-content {
  flex: 1;
  margin-left: 0;
  min-height: calc(100vh - 64px);
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.content-wrapper {
  padding: 1rem;
  max-width: 100%;
}

/* Desktop styles */
@media (min-width: 768px) {
  .main-content {
    margin-left: 280px;
  }

  .content-wrapper {
    padding: 2rem;
  }

  .sidebar-backdrop {
    display: none;
  }
}

/* Transitions */
.backdrop-fade-enter-active,
.backdrop-fade-leave-active {
  transition: opacity 0.3s ease;
}

.backdrop-fade-enter-from,
.backdrop-fade-leave-to {
  opacity: 0;
}

/* Utility classes */
.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  overflow: hidden;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.875rem;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  gap: 0.5rem;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

.btn-secondary {
  background: #f1f5f9;
  color: #475569;
  border: 1px solid #e2e8f0;
}

.btn-secondary:hover {
  background: #e2e8f0;
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-danger:hover {
  background: #dc2626;
}

/* Form styles */
.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
  font-size: 0.875rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.875rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Grid system */
.grid {
  display: grid;
  gap: 1rem;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, 1fr);
}

.grid-cols-2 {
  grid-template-columns: repeat(2, 1fr);
}

.grid-cols-3 {
  grid-template-columns: repeat(3, 1fr);
}

.grid-cols-4 {
  grid-template-columns: repeat(4, 1fr);
}

@media (min-width: 640px) {
  .sm\:grid-cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 768px) {
  .md\:grid-cols-3 {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1024px) {
  .lg\:grid-cols-4 {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
