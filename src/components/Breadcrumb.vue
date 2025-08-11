<template>
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <ol class="breadcrumb-list">
      <li
        v-for="(item, index) in breadcrumbs"
        :key="index"
        class="breadcrumb-item"
      >
        <router-link
          v-if="item.path && index < breadcrumbs.length - 1"
          :to="item.path"
          class="breadcrumb-link"
        >
          {{ item.name }}
        </router-link>
        <span v-else class="breadcrumb-current" aria-current="page">
          {{ item.name }}
        </span>
        <span v-if="index < breadcrumbs.length - 1" class="breadcrumb-separator"
          >/</span
        >
      </li>
    </ol>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "BreadcrumbNav",
  setup() {
    const route = useRoute();

    const breadcrumbs = computed(() => {
      const paths = route.path.split("/").filter(Boolean);
      const result = [{ name: "Home", path: "/dashboard" }];

      if (paths.length === 0) return result;

      let currentPath = "";
      paths.forEach((path, index) => {
        currentPath += `/${path}`;

        // Handle dynamic routes
        if (path === "products" || path === "orders" || path === "categories") {
          result.push({
            name: path.charAt(0).toUpperCase() + path.slice(1),
            path: currentPath,
          });
        } else if (path === "create-product") {
          result.push({
            name: "Create Product",
            path: currentPath,
          });
        } else if (path === "edit") {
          result.push({
            name: "Edit",
            path: currentPath,
          });
        } else if (path === "dashboard") {
          // Skip dashboard as it's already in result
        } else {
          // This is likely an ID for detail pages
          result.push({
            name: `ID: ${path}`,
            path: currentPath,
          });
        }
      });

      return result;
    });

    return {
      breadcrumbs,
    };
  },
});
</script>

<style scoped>
.breadcrumb {
  margin-bottom: 1rem;
}

.breadcrumb-list {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 0.875rem;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
}

.breadcrumb-link {
  color: #3b82f6;
  text-decoration: none;
  transition: color 0.2s ease;
}

.breadcrumb-link:hover {
  color: #2563eb;
  text-decoration: underline;
}

.breadcrumb-current {
  color: #6b7280;
  font-weight: 500;
}

.breadcrumb-separator {
  margin: 0 0.5rem;
  color: #9ca3af;
}

@media (max-width: 640px) {
  .breadcrumb-list {
    font-size: 0.75rem;
  }

  .breadcrumb-separator {
    margin: 0 0.25rem;
  }
}
</style>
