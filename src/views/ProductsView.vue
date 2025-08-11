<template>
  <div class="products-view">
    <!-- Page Header -->
    <div class="page-header">
      <div class="page-title">
        <h1>Products</h1>
        <p class="page-subtitle">Manage your product catalog</p>
      </div>
      <div class="page-actions">
        <router-link to="/create-product" class="btn btn-primary">
          <svg
            class="btn-icon"
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
          Add Product
        </router-link>
      </div>
    </div>

    <!-- Search and Filters -->
    <div class="filters-section">
      <div class="search-box">
        <svg
          class="search-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
        <InputText
          v-model="searchQuery"
          placeholder="Search products..."
          class="search-input"
        />
      </div>
      <div class="filter-actions">
        <select v-model="categoryFilter" class="filter-select">
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="books">Books</option>
          <option value="home">Home & Garden</option>
        </select>
        <button class="btn btn-secondary">
          <svg
            class="btn-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
            ></path>
          </svg>
          Filter
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner">
        <svg
          class="spinner"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
      </div>
      <p>Loading products...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-state">
      <div class="error-icon">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </div>
      <h3>Error Loading Products</h3>
      <p>{{ error }}</p>
      <button @click="loadProducts" class="btn btn-primary">Try Again</button>
    </div>

    <!-- Empty State -->
    <div v-else-if="filteredProducts.length === 0" class="empty-state">
      <div class="empty-icon">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          ></path>
        </svg>
      </div>
      <h3>No Products Found</h3>
      <p>Get started by adding your first product to the catalog.</p>
      <router-link to="/create-product" class="btn btn-primary"
        >Add Product</router-link
      >
    </div>

    <!-- Products Grid -->
    <div v-else class="products-grid">
      <router-link
        v-for="product in filteredProducts"
        :key="product._id"
        :to="`/products/${product._id}`"
        class="product-card"
        style="
          text-decoration: none;
          color: inherit;
          display: block;
          height: 100%;
        "
      >
        <div class="product-image">
          <div
            v-if="product.images && product.images.length > 0"
            class="product-gallery"
          >
            <img
              :src="product.images[0]"
              :alt="product.name"
              class="product-img main-image"
            />
            <div v-if="product.images.length > 1" class="image-indicators">
              <span class="indicator-dot active"></span>
              <span
                v-for="(image, index) in product.images.slice(1)"
                :key="index"
                class="indicator-dot"
              ></span>
              <span class="image-count">+{{ product.images.length - 1 }}</span>
            </div>
          </div>
          <div v-else class="product-placeholder">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
        </div>
        <div class="product-content">
          <div class="product-category">
            {{ product.category.name || "Uncategorized" }}
          </div>
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-description">{{ product.description }}</p>
          <div class="product-footer">
            <div class="product-price">${{ product.price }}</div>
          </div>
        </div>
      </router-link>
    </div>

    <!-- Results Count -->
    <div v-if="filteredProducts.length > 0" class="results-count">
      Showing {{ filteredProducts.length }} of {{ products.length }} products
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import { getProducts, deleteProduct } from "../api";

export default defineComponent({
  name: "ProductsView",
  setup() {
    const products = ref<any[]>([]);
    const loading = ref(true);
    const error = ref("");
    const searchQuery = ref("");
    const categoryFilter = ref("");

    const loadProducts = async () => {
      loading.value = true;
      error.value = "";
      try {
        const res = await getProducts();
        products.value = res.data;
      } catch (err: any) {
        error.value =
          err?.response?.data?.message || "Failed to load products.";
      } finally {
        loading.value = false;
      }
    };

    const deleteProductHandler = async (productId: string) => {
      if (!confirm("Are you sure you want to delete this product?")) return;

      try {
        await deleteProduct(productId);
        await loadProducts();
      } catch (err: any) {
        error.value =
          err?.response?.data?.message || "Failed to delete product.";
      }
    };

    const filteredProducts = computed(() => {
      let filtered = products.value;

      if (searchQuery.value) {
        filtered = filtered.filter(
          (product) =>
            product.name
              .toLowerCase()
              .includes(searchQuery.value.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(searchQuery.value.toLowerCase())
        );
      }

      if (categoryFilter.value) {
        filtered = filtered.filter(
          (product) => product.category === categoryFilter.value
        );
      }

      return filtered;
    });

    onMounted(loadProducts);

    return {
      products,
      loading,
      error,
      searchQuery,
      categoryFilter,
      filteredProducts,
      loadProducts,
      deleteProduct: deleteProductHandler,
    };
  },
});
</script>

<style scoped>
.products-view {
  max-width: 100%;
}

/* Page Header */
.page-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.page-title h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
}

.page-subtitle {
  color: #64748b;
  font-size: 1rem;
  margin: 0;
}

.page-actions {
  display: flex;
  gap: 1rem;
}

.btn-icon {
  width: 18px;
  height: 18px;
}

/* Filters Section */
.filters-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.search-box {
  position: relative;
  flex: 1;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #9ca3af;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  background: #f9fafb;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  background: white;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.filter-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.filter-select {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.875rem;
  background: white;
  min-width: 150px;
}

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
}

.loading-spinner {
  margin-bottom: 1rem;
}

.spinner {
  width: 40px;
  height: 40px;
  color: #3b82f6;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Error State */
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
}

.error-icon {
  margin-bottom: 1rem;
}

.error-icon svg {
  width: 48px;
  height: 48px;
  color: #ef4444;
}

.error-state h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
}

.error-state p {
  color: #64748b;
  margin: 0 0 1.5rem 0;
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
}

.empty-icon {
  margin-bottom: 1rem;
}

.empty-icon svg {
  width: 48px;
  height: 48px;
  color: #9ca3af;
}

.empty-state h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
}

.empty-state p {
  color: #64748b;
  margin: 0 0 1.5rem 0;
}

/* Products Grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.product-card {
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  transition: all 0.2s ease;
  position: relative;
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.product-image {
  position: relative;
  height: 200px;
  background: #f8fafc;
  overflow: hidden;
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-gallery {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px 12px 0 0;
}

.image-indicators {
  position: absolute;
  bottom: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.25rem;
  background: rgba(0, 0, 0, 0.5);
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  backdrop-filter: blur(5px);
  z-index: 10;
}

.indicator-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #fff;
  opacity: 0.5;
  transition: opacity 0.2s ease;
}

.indicator-dot.active {
  opacity: 1;
}

.image-count {
  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;
  background: rgba(0, 0, 0, 0.5);
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  margin-left: 0.5rem;
  backdrop-filter: blur(5px);
}

.product-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: #9ca3af;
}

.product-placeholder svg {
  width: 48px;
  height: 48px;
}

.product-actions {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  display: flex;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.product-card:hover .product-actions {
  opacity: 1;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn.edit {
  background: rgba(59, 130, 246, 0.9);
  color: white;
}

.action-btn.delete {
  background: rgba(239, 68, 68, 0.9);
  color: white;
}

.action-btn:hover {
  transform: scale(1.1);
}

.action-btn svg {
  width: 16px;
  height: 16px;
}

.product-content {
  padding: 1.5rem;
}

.product-category {
  font-size: 0.75rem;
  font-weight: 600;
  color: #3b82f6;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

.product-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
}

.product-description {
  color: #64748b;
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0 0 1rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.product-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: #059669;
}

.product-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}

.action-btn.view {
  background: rgba(59, 130, 246, 0.9);
  color: white;
}

.action-btn.edit {
  background: rgba(245, 158, 11, 0.9);
  color: white;
}

.action-btn.delete {
  background: rgba(239, 68, 68, 0.9);
  color: white;
}

.action-btn:hover {
  transform: scale(1.1);
}

.action-btn svg {
  width: 16px;
  height: 16px;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.status-badge.active {
  background: #d1fae5;
  color: #059669;
}

/* Results Count */
.results-count {
  text-align: center;
  color: #64748b;
  font-size: 0.875rem;
  padding: 1rem 0;
}

/* Responsive Design */
@media (min-width: 640px) {
  .filters-section {
    flex-direction: row;
    align-items: center;
  }

  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 768px) {
  .page-header {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .page-title h1 {
    font-size: 2.25rem;
  }
}

@media (min-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1280px) {
  .products-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
