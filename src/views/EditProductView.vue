<template>
  <div class="edit-product-view">
    <!-- Page Header -->
    <div class="page-header">
      <div class="page-title">
        <h1>Edit Product</h1>
        <p class="page-subtitle">Update product information and images</p>
      </div>
      <div class="page-actions">
        <router-link :to="`/products/${productId}`" class="btn btn-secondary">
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
          Back to Product
        </router-link>
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
      <p>Loading product...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-state">
      <svg
        class="error-icon"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
        ></path>
      </svg>
      <h3>Error Loading Product</h3>
      <p>{{ error }}</p>
      <button @click="loadProduct" class="btn btn-primary">Try Again</button>
    </div>

    <!-- Edit Form -->
    <div v-else class="form-container">
      <form
        @submit.prevent="handleSubmit"
        class="product-form"
        enctype="multipart/form-data"
      >
        <!-- Basic Information -->
        <div class="form-section">
          <h3 class="section-title">
            <svg
              class="section-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            Basic Information
          </h3>

          <div class="form-grid">
            <div class="form-group">
              <label for="name" class="form-label">Product Name *</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                class="form-input"
                placeholder="Enter product name"
                required
              />
            </div>

            <div class="form-group">
              <label for="category" class="form-label">Category *</label>
              <select
                id="category"
                v-model="form.category"
                class="form-input"
                required
              >
                <option value="">Select a category</option>
                <option
                  v-for="category in categories"
                  :key="category._id"
                  :value="category._id"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label for="description" class="form-label">Description *</label>
            <textarea
              id="description"
              v-model="form.description"
              class="form-textarea"
              placeholder="Describe your product..."
              rows="4"
              required
            ></textarea>
          </div>
        </div>

        <!-- Pricing -->
        <div class="form-section">
          <h3 class="section-title">
            <svg
              class="section-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              ></path>
            </svg>
            Pricing
          </h3>

          <div class="form-group">
            <label for="price" class="form-label">Price ($) *</label>
            <div class="price-input-wrapper">
              <span class="currency-symbol">$</span>
              <input
                id="price"
                v-model.number="form.price"
                type="number"
                min="0"
                step="0.01"
                class="form-input price-input"
                placeholder="0.00"
                required
              />
            </div>
          </div>
        </div>

        <!-- Product Images -->
        <div class="form-section">
          <h3 class="section-title">
            <svg
              class="section-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            Product Images
          </h3>

          <div class="images-section">
            <!-- Current Images -->
            <div v-if="currentImages.length > 0" class="current-images-section">
              <h4 class="subsection-title">Current Images</h4>
              <div class="current-images-grid">
                <div
                  v-for="(image, index) in currentImages"
                  :key="`current-${index}`"
                  class="current-image-item"
                >
                  <img
                    :src="image"
                    :alt="`Current product image ${index + 1}`"
                    class="current-image"
                  />
                  <div class="current-image-overlay">
                    <button
                      type="button"
                      @click="removeCurrentImage(index)"
                      class="remove-image-btn"
                      title="Remove image"
                    >
                      <svg
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
                  <div class="image-order">
                    <button
                      type="button"
                      @click="moveCurrentImage(index, -1)"
                      class="order-btn prev"
                      :disabled="index === 0"
                      title="Move up"
                    >
                      <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 15l7-7 7 7"
                        ></path>
                      </svg>
                    </button>
                    <span class="order-number">{{ index + 1 }}</span>
                    <button
                      type="button"
                      @click="moveCurrentImage(index, 1)"
                      class="order-btn next"
                      :disabled="index === currentImages.length - 1"
                      title="Move down"
                    >
                      <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Image Upload Area -->
            <div
              class="upload-area"
              @click="triggerFileInput"
              v-if="currentImages.length + imagePreviews.length < 10"
            >
              <input
                ref="fileInput"
                id="images"
                type="file"
                accept="image/*"
                multiple
                @change="handleFileChange"
                class="file-input"
              />
              <div class="upload-content">
                <svg
                  class="upload-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <h4>Add More Images</h4>
                <p>Click to browse or drag and drop</p>
                <span class="file-types">PNG, JPG, GIF up to 5MB each</span>
                <span class="upload-limit"
                  >{{ currentImages.length + imagePreviews.length }}/10
                  images</span
                >
              </div>
            </div>

            <!-- New Image Previews -->
            <div class="image-previews" v-if="imagePreviews.length > 0">
              <h4 class="subsection-title">New Images to Add</h4>
              <div class="new-images-grid">
                <div
                  v-for="(preview, index) in imagePreviews"
                  :key="`new-${index}`"
                  class="image-preview-item"
                >
                  <img
                    :src="preview.url"
                    :alt="`New product image ${index + 1}`"
                    class="preview-image"
                  />
                  <div class="image-overlay">
                    <button
                      type="button"
                      @click="removeImage(index)"
                      class="remove-image-btn"
                      title="Remove image"
                    >
                      <svg
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
                    <div class="image-info">
                      <span class="image-name">{{ preview.name }}</span>
                      <span class="image-size">{{
                        formatFileSize(preview.size)
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Upload Limit Message -->
            <div
              v-if="currentImages.length + imagePreviews.length >= 10"
              class="upload-limit-message"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                ></path>
              </svg>
              <span
                >Maximum 10 images reached. Remove some images to add
                more.</span
              >
            </div>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="form-actions">
          <button type="button" @click="resetForm" class="btn btn-secondary">
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
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              ></path>
            </svg>
            Reset Changes
          </button>
          <button type="submit" :disabled="submitting" class="btn btn-primary">
            <svg
              v-if="submitting"
              class="btn-icon spinner"
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
            <span v-else>Update Product</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getProduct, updateProduct, getCategories } from "../api";

interface ImagePreview {
  url: string;
  name: string;
  size: number;
  file: File;
}

export default defineComponent({
  name: "EditProductView",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const fileInput = ref<HTMLInputElement>();

    const loading = ref(true);
    const submitting = ref(false);
    const error = ref("");
    const categories = ref<any[]>([]);
    const currentImages = ref<string[]>([]);
    const imagePreviews = ref<ImagePreview[]>([]);

    const form = reactive({
      name: "",
      description: "",
      price: 0,
      category: "",
    });

    const productId = route.params.id as string;

    const loadProduct = async () => {
      try {
        const [productRes, categoriesRes] = await Promise.all([
          getProduct(productId),
          getCategories(),
        ]);

        const product = productRes.data;
        categories.value = categoriesRes.data;

        form.name = product.name;
        form.description = product.description;
        form.price = product.price;
        form.category = product.category?._id || product.category || "";

        // Load current images
        if (product.images && Array.isArray(product.images)) {
          currentImages.value = product.images;
        }
      } catch (err: any) {
        error.value = err?.response?.data?.message || "Failed to load product.";
      } finally {
        loading.value = false;
      }
    };

    const triggerFileInput = () => {
      fileInput.value?.click();
    };

    const handleFileChange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const files = target.files;

      if (!files) return;

      Array.from(files).forEach((file) => {
        if (file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const url = e.target?.result as string;
            imagePreviews.value.push({
              url,
              name: file.name,
              size: file.size,
              file,
            });
          };
          reader.readAsDataURL(file);
        }
      });

      // Reset file input
      target.value = "";
    };

    const removeImage = (index: number) => {
      imagePreviews.value.splice(index, 1);
    };

    const removeCurrentImage = (index: number) => {
      currentImages.value.splice(index, 1);
    };

    const moveCurrentImage = (index: number, direction: number) => {
      const newIndex = index + direction;
      if (newIndex >= 0 && newIndex < currentImages.value.length) {
        const temp = currentImages.value[index];
        currentImages.value[index] = currentImages.value[newIndex];
        currentImages.value[newIndex] = temp;
      }
    };

    const formatFileSize = (bytes: number) => {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    const resetForm = () => {
      loadProduct();
      imagePreviews.value = [];
    };

    const handleSubmit = async () => {
      submitting.value = true;
      try {
        const data = new FormData();
        data.append("name", form.name);
        data.append("description", form.description);
        data.append("price", String(form.price));
        data.append("category", form.category);

        // Add current images (in order)
        currentImages.value.forEach((image, index) => {
          data.append("currentImages", image);
          data.append("currentImageOrder", String(index));
        });

        // Add new images
        imagePreviews.value.forEach((preview) => {
          data.append("images", preview.file);
        });

        await updateProduct(productId, data);
        router.push(`/products/${productId}`);
      } catch (err: any) {
        error.value =
          err?.response?.data?.message || "Failed to update product.";
      } finally {
        submitting.value = false;
      }
    };

    onMounted(loadProduct);

    return {
      productId,
      form,
      loading,
      submitting,
      error,
      categories,
      currentImages,
      imagePreviews,
      fileInput,
      loadProduct,
      handleSubmit,
      triggerFileInput,
      handleFileChange,
      removeImage,
      removeCurrentImage,
      moveCurrentImage,
      formatFileSize,
      resetForm,
    };
  },
});
</script>

<style scoped>
.edit-product-view {
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

/* Form Container */
.form-container {
  max-width: 800px;
  margin: 0 auto;
}

.product-form {
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
}

/* Form Sections */
.form-section {
  padding: 2rem;
  border-bottom: 1px solid #e2e8f0;
}

.form-section:last-child {
  border-bottom: none;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1.5rem;
}

.section-icon {
  width: 20px;
  height: 20px;
  color: #3b82f6;
}

/* Form Grid */
.form-grid {
  display: grid;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

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

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.875rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  background: white;
  color: #000;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  background: white;
  color: #000;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

/* Price Input */
.price-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.currency-symbol {
  position: absolute;
  left: 0.75rem;
  color: #6b7280;
  font-weight: 500;
}

.price-input {
  padding-left: 2rem;
}

/* Ensure all form inputs have consistent styling */
.form-input::placeholder,
.form-textarea::placeholder {
  color: #9ca3af;
}

.form-input option {
  background: white;
  color: #000;
}

/* Images Section */
.images-section {
  margin-top: 1rem;
}

.current-images-section {
  margin-bottom: 2rem;
}

.subsection-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
}

.current-images-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.current-image-item {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid #e5e7eb;
  transition: border-color 0.2s ease;
}

.current-image-item:hover {
  border-color: #3b82f6;
}

.current-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
}

.current-image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.current-image-item:hover .current-image-overlay {
  opacity: 1;
}

/* Upload Area */
.upload-area {
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  padding: 3rem 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #f9fafb;
  margin-bottom: 1.5rem;
}

.upload-area:hover {
  border-color: #3b82f6;
  background: #f0f9ff;
}

.file-input {
  display: none;
}

.upload-content h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.5rem 0;
}

.upload-content p {
  color: #6b7280;
  margin: 0 0 0.5rem 0;
}

.file-types,
.upload-limit {
  display: block;
  font-size: 0.75rem;
  color: #9ca3af;
  margin-bottom: 0.25rem;
}

.upload-icon {
  width: 48px;
  height: 48px;
  color: #9ca3af;
  margin-bottom: 1rem;
}

/* Image Previews */
.image-previews {
  margin-bottom: 1.5rem;
}

.new-images-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.image-preview-item {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid #e5e7eb;
  transition: border-color 0.2s ease;
}

.image-preview-item:hover {
  border-color: #3b82f6;
}

.preview-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.image-preview-item:hover .image-overlay {
  opacity: 1;
}

.remove-image-btn {
  background: rgba(239, 68, 68, 0.9);
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.remove-image-btn:hover {
  background: rgba(239, 68, 68, 1);
  transform: scale(1.1);
}

.remove-image-btn svg {
  width: 16px;
  height: 16px;
}

.image-info {
  color: white;
  font-size: 0.75rem;
}

.image-name {
  display: block;
  font-weight: 500;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.image-size {
  opacity: 0.8;
}

.image-order {
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 20px;
  padding: 0.25rem;
}

.order-btn {
  width: 24px;
  height: 24px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.order-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.3);
}

.order-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.order-btn svg {
  width: 12px;
  height: 12px;
}

.order-number {
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  min-width: 20px;
  text-align: center;
}

/* Upload Limit Message */
.upload-limit-message {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #fef3c7;
  color: #d97706;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
}

.upload-limit-message svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

/* Form Actions */
.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding: 2rem;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
}

/* Buttons */
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

.btn-primary:hover:not(:disabled) {
  background: #2563eb;
  transform: translateY(-1px);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.btn-secondary {
  background: #f1f5f9;
  color: #475569;
  border: 1px solid #e2e8f0;
}

.btn-secondary:hover {
  background: #e2e8f0;
}

/* Loading and Error States */
.loading-state,
.error-state {
  text-align: center;
  padding: 4rem 2rem;
}

.loading-spinner {
  margin-bottom: 1rem;
}

.spinner {
  width: 48px;
  height: 48px;
  animation: spin 1s linear infinite;
  color: #3b82f6;
}

.error-icon {
  width: 64px;
  height: 64px;
  color: #ef4444;
  margin-bottom: 1rem;
}

.error-state h3 {
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.error-state p {
  color: #6b7280;
  margin-bottom: 1.5rem;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Responsive Design */
@media (min-width: 640px) {
  .form-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .current-images-grid,
  .new-images-grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
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

  .form-actions {
    justify-content: flex-end;
  }

  .current-images-grid,
  .new-images-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}

@media (min-width: 1024px) {
  .form-container {
    max-width: 900px;
  }

  .current-images-grid,
  .new-images-grid {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }
}
</style>
