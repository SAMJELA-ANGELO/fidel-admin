<template>
  <div class="category-detail-view">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="category" class="category-detail">
      <div class="page-header">
        <div class="page-title">
          <h1>{{ category.name }}</h1>
          <p class="page-subtitle">Category Details</p>
        </div>
        <div class="page-actions">
          <router-link
            :to="`/categories/${category._id}/edit`"
            class="btn btn-primary"
            >Edit Category</router-link
          >
          <button @click="deleteCategory" class="btn btn-danger">
            Delete Category
          </button>
        </div>
      </div>

      <div class="category-content">
        <div class="category-info">
          <h2>Category Information</h2>
          <div class="info-grid">
            <div class="info-item">
              <label>Category Name</label>
              <span>{{ category.name }}</span>
            </div>
            <div class="info-item">
              <label>Category ID</label>
              <span class="id">{{ category._id }}</span>
            </div>
            <div class="info-item">
              <label>Created</label>
              <span>{{ formatDate(category.createdAt) }}</span>
            </div>
            <div class="info-item">
              <label>Last Updated</label>
              <span>{{ formatDate(category.updatedAt) }}</span>
            </div>
            <div class="info-item full-width">
              <label>Description</label>
              <p class="description">
                {{ category.description || "No description provided" }}
              </p>
            </div>
          </div>
        </div>

        <div class="category-products">
          <h2>Products in this Category</h2>
          <div v-if="products.length === 0" class="no-products">
            <p>No products found in this category.</p>
          </div>
          <div v-else class="products-grid">
            <div
              v-for="product in products"
              :key="product._id"
              class="product-card"
            >
              <div class="product-image">
                <img
                  v-if="product.images && product.images.length > 0"
                  :src="product.images[0]"
                  :alt="product.name"
                />
                <div v-else class="no-image">No Image</div>
              </div>
              <div class="product-info">
                <h3>{{ product.name }}</h3>
                <p>{{ product.description }}</p>
                <div class="product-price">${{ product.price }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="back-section">
          <router-link to="/categories" class="btn btn-secondary"
            >Back to Categories</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getCategory, deleteCategory, getProducts } from "../api";

export default defineComponent({
  name: "CategoryDetailView",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const category = ref<any>(null);
    const products = ref<any[]>([]);
    const loading = ref(true);
    const error = ref("");

    const loadCategory = async () => {
      loading.value = true;
      error.value = "";
      try {
        const [categoryRes, productsRes] = await Promise.all([
          getCategory(route.params.id as string),
          getProducts(),
        ]);

        category.value = categoryRes.data;
        // Filter products by this category
        products.value = productsRes.data.filter(
          (product: any) =>
            product.category?._id === category.value._id ||
            product.category === category.value._id
        );
      } catch (err: any) {
        error.value =
          err?.response?.data?.message || "Failed to load category.";
      } finally {
        loading.value = false;
      }
    };

    const deleteCategoryHandler = async () => {
      if (!confirm("Are you sure you want to delete this category?")) return;

      try {
        await deleteCategory(category.value._id);
        router.push("/categories");
      } catch (err: any) {
        error.value =
          err?.response?.data?.message || "Failed to delete category.";
      }
    };

    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    onMounted(loadCategory);

    return {
      category,
      products,
      loading,
      error,
      deleteCategory: deleteCategoryHandler,
      formatDate,
    };
  },
});
</script>

<style scoped>
.category-detail-view {
  padding: 2rem;
}

.loading,
.error {
  text-align: center;
  padding: 2rem;
}

.error {
  color: red;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.page-title h1 {
  font-size: 2rem;
  margin: 0 0 0.5rem 0;
}

.page-subtitle {
  color: #666;
  margin: 0;
}

.page-actions {
  display: flex;
  gap: 1rem;
}

.category-content {
  max-width: 1000px;
}

.category-info,
.category-products {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.category-info h2,
.category-products h2 {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-item.full-width {
  grid-column: 1 / -1;
}

.info-item label {
  font-weight: 600;
  color: #666;
  font-size: 0.875rem;
}

.info-item span {
  font-size: 1rem;
}

.info-item .id {
  font-family: monospace;
  background: #f1f5f9;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
}

.info-item .description {
  line-height: 1.6;
  color: #666;
  margin: 0;
}

.no-products {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.product-card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

.product-image {
  height: 150px;
  background: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.no-image {
  color: #9ca3af;
  font-size: 0.875rem;
}

.product-info {
  padding: 1rem;
}

.product-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
}

.product-info p {
  color: #666;
  margin: 0 0 1rem 0;
  font-size: 0.875rem;
  line-height: 1.4;
}

.product-price {
  font-size: 1.125rem;
  font-weight: 700;
  color: #059669;
}

.back-section {
  margin-top: 2rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 500;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-secondary {
  background: #6b7280;
  color: white;
}

.btn-danger {
  background: #dc2626;
  color: white;
}

.btn:hover {
  opacity: 0.9;
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .page-actions {
    width: 100%;
    justify-content: flex-start;
  }

  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>
