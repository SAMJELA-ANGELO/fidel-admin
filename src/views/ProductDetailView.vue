<template>
  <div class="product-detail-view">
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
      <p>Loading product details...</p>
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
      <h3>Error Loading Product</h3>
      <p>{{ error }}</p>
      <div class="error-actions">
        <button @click="loadProduct" class="btn btn-primary">Try Again</button>
        <router-link to="/products" class="btn btn-secondary"
          >Back to Products</router-link
        >
      </div>
    </div>

    <!-- Product Details -->
    <div v-else-if="product" class="product-detail">
      <!-- Page Header -->
      <div class="page-header">
        <div class="page-title">
          <h1>{{ product.name }}</h1>
          <p class="page-subtitle">Product Details</p>
        </div>
        <div class="page-actions">
          <router-link
            :to="`/products/${product._id}/edit`"
            class="btn btn-primary"
          >
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              ></path>
            </svg>
            Edit Product
          </router-link>
          <button @click="deleteProduct" class="btn btn-danger">
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              ></path>
            </svg>
            Delete
          </button>
        </div>
      </div>

      <!-- Product Content -->
      <div class="product-content">
        <!-- Product Images -->
        <div class="product-images">
          <div
            v-if="product.images && product.images.length > 0"
            class="image-gallery"
          >
            <div class="main-image">
              <img
                :src="product.images[currentImageIndex]"
                :alt="product.name"
                class="product-img"
              />
              <div v-if="product.images.length > 1" class="image-navigation">
                <button
                  @click="previousImage"
                  class="nav-btn prev"
                  :disabled="currentImageIndex === 0"
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 19l-7-7 7-7"
                    ></path>
                  </svg>
                </button>
                <button
                  @click="nextImage"
                  class="nav-btn next"
                  :disabled="currentImageIndex === product.images.length - 1"
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div v-if="product.images.length > 1" class="image-thumbnails">
              <button
                v-for="(image, index) in product.images"
                :key="index"
                @click="currentImageIndex = index"
                class="thumbnail"
                :class="{ active: currentImageIndex === index }"
              >
                <img
                  :src="image"
                  :alt="`${product.name} - Image ${index + 1}`"
                />
              </button>
            </div>
          </div>
          <div v-else class="no-image">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            <p>No images available</p>
          </div>
        </div>

        <!-- Product Info -->
        <div class="product-info">
          <div class="info-section">
            <h2 class="section-title">Product Information</h2>
            <div class="info-grid">
              <div class="info-item">
                <label class="info-label">Product Name</label>
                <span class="info-value">{{ product.name }}</span>
              </div>
              <div class="info-item">
                <label class="info-label">Category</label>
                <span class="info-value category-badge">
                  {{ product.category?.name || "Uncategorized" }}
                </span>
              </div>
              <div class="info-item">
                <label class="info-label">Price</label>
                <span class="info-value price">${{ product.price }}</span>
              </div>
              <div class="info-item">
                <label class="info-label">Product ID</label>
                <span class="info-value id">{{ product._id }}</span>
              </div>
              <div class="info-item full-width">
                <label class="info-label">Description</label>
                <p class="info-value description">
                  {{ product.description || "No description provided" }}
                </p>
              </div>
            </div>
          </div>

          <div class="info-section">
            <h2 class="section-title">Product Details</h2>
            <div class="info-grid">
              <div class="info-item">
                <label class="info-label">Created</label>
                <span class="info-value">{{
                  formatDate(product.createdAt)
                }}</span>
              </div>
              <div class="info-item">
                <label class="info-label">Last Updated</label>
                <span class="info-value">{{
                  formatDate(product.updatedAt)
                }}</span>
              </div>
              <div class="info-item">
                <label class="info-label">Images</label>
                <span class="info-value"
                  >{{ product.images?.length || 0 }} images</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Back Button -->
      <div class="back-section">
        <router-link to="/products" class="btn btn-secondary">
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Back to Products
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getProduct, deleteProduct } from "../api";

export default defineComponent({
  name: "ProductDetailView",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const product = ref<any>(null);
    const loading = ref(true);
    const error = ref("");
    const currentImageIndex = ref(0);

    const loadProduct = async () => {
      loading.value = true;
      error.value = "";
      try {
        const res = await getProduct(route.params.id as string);
        product.value = res.data;
      } catch (err: any) {
        error.value = err?.response?.data?.message || "Failed to load product.";
      } finally {
        loading.value = false;
      }
    };

    const deleteProductHandler = async () => {
      if (
        !confirm(
          "Are you sure you want to delete this product? This action cannot be undone."
        )
      ) {
        return;
      }

      try {
        await deleteProduct(product.value._id);
        router.push("/products");
      } catch (err: any) {
        error.value =
          err?.response?.data?.message || "Failed to delete product.";
      }
    };

    const nextImage = () => {
      if (
        product.value?.images &&
        currentImageIndex.value < product.value.images.length - 1
      ) {
        currentImageIndex.value++;
      }
    };

    const previousImage = () => {
      if (currentImageIndex.value > 0) {
        currentImageIndex.value--;
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

    onMounted(loadProduct);

    return {
      product,
      loading,
      error,
      currentImageIndex,
      loadProduct,
      deleteProduct: deleteProductHandler,
      nextImage,
      previousImage,
      formatDate,
    };
  },
});
</script>

<style scoped>
.product-detail-view {
  max-width: 100%;
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

.error-actions {
  display: flex;
  gap: 1rem;
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

/* Product Content */
.product-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

/* Product Images */
.product-images {
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
}

.image-gallery {
  display: flex;
  flex-direction: column;
}

.main-image {
  position: relative;
  height: 400px;
  background: #f8fafc;
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-navigation {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  pointer-events: none;
}

.nav-btn {
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  pointer-events: auto;
}

.nav-btn:hover:not(:disabled) {
  background: rgba(0, 0, 0, 0.9);
  transform: scale(1.1);
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nav-btn svg {
  width: 20px;
  height: 20px;
}

.image-thumbnails {
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  overflow-x: auto;
}

.thumbnail {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border: 2px solid transparent;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
}

.thumbnail.active {
  border-color: #3b82f6;
}

.thumbnail:hover {
  border-color: #3b82f6;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.no-image {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  color: #9ca3af;
}

.no-image svg {
  width: 64px;
  height: 64px;
  margin-bottom: 1rem;
}

/* Product Info */
.product-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-section {
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  padding: 1.5rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 1.5rem 0;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-item.full-width {
  grid-column: 1 / -1;
}

.info-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.info-value {
  font-size: 1rem;
  color: #1e293b;
  font-weight: 500;
}

.info-value.price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #059669;
}

.info-value.id {
  font-family: monospace;
  background: #f1f5f9;
  padding: 0.5rem;
  border-radius: 6px;
  font-size: 0.875rem;
}

.info-value.category-badge {
  display: inline-block;
  background: #dbeafe;
  color: #2563eb;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.info-value.description {
  line-height: 1.6;
  color: #64748b;
  font-weight: 400;
}

/* Back Section */
.back-section {
  display: flex;
  justify-content: flex-start;
}

/* Responsive Design */
@media (min-width: 768px) {
  .page-header {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .page-title h1 {
    font-size: 2.25rem;
  }

  .product-content {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }

  .info-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .product-content {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }
}
</style>
