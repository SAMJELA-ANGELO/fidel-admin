<template>
  <div class="create-product-view">
    <div class="page-header">
      <div class="page-title">
        <h1>Create Product</h1>
        <p class="page-subtitle">Add a new product to your catalog</p>
      </div>
      <div class="page-actions">
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

    <div class="form-container">
      <form
        class="product-form"
        enctype="multipart/form-data"
        @submit.prevent="handleSubmit"
      >
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
              <label for="weight" class="form-label">Weight *</label>
              <input
                id="weight"
                v-model="form.weight"
                type="text"
                class="form-input"
                placeholder="e.g. 2g, 1oz"
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
            Pricing and Details
          </h3>

          <div class="form-grid">
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

            <div class="form-group">
              <label for="rating" class="form-label">Rating (1-5)</label>
              <input
                id="rating"
                v-model.number="form.rating"
                type="number"
                min="1"
                max="5"
                step="1"
                class="form-input"
                placeholder="Enter rating"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="flavours" class="form-label"
              >Flavours (comma-separated)</label
            >
            <input
              id="flavours"
              v-model="form.flavours"
              type="text"
              class="form-input"
              placeholder="e.g., Strawberry, Banana, Mint"
            />
          </div>
        </div>

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
            <div v-if="imagePreviews.length < 10" class="upload-area">
              <input
                id="images"
                type="file"
                accept="image/*"
                multiple
                class="file-input"
                @change="handleFileChange"
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
                <h4>Upload Product Images</h4>
                <p>Click to browse or drag and drop</p>
                <span class="file-types">PNG, JPG, GIF up to 5MB each</span>
                <span class="upload-limit"
                  >{{ imagePreviews.length }}/10 images</span
                >
              </div>
            </div>

            <div v-if="imagePreviews.length > 0" class="image-previews">
              <div
                v-for="(preview, index) in imagePreviews"
                :key="index"
                class="image-preview-item"
              >
                <img
                  :src="preview.url"
                  :alt="`Product image ${index + 1}`"
                  class="preview-image"
                />
                <div class="image-overlay">
                  <button
                    type="button"
                    class="remove-image-btn"
                    title="Remove image"
                    @click="removeImage(index)"
                  >
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <div class="image-order">
                  <button
                    type="button"
                    class="order-btn prev"
                    :disabled="index === 0"
                    title="Move up"
                    @click="moveImage(index, -1)"
                  >
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    class="order-btn next"
                    :disabled="index === imagePreviews.length - 1"
                    title="Move down"
                    @click="moveImage(index, 1)"
                  >
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

            <div v-if="imagePreviews.length >= 10" class="upload-limit-message">
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

        <div class="form-actions">
          <button type="button" class="btn btn-secondary" @click="resetForm">
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
            Reset
          </button>
          <button type="submit" class="btn btn-primary" :disabled="loading">
            <svg
              v-if="loading"
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
            <svg
              v-else
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
            {{ loading ? "Creating..." : "Create Product" }}
          </button>
        </div>

        <div v-if="error" class="message error">
          <svg
            class="message-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          {{ error }}
        </div>

        <div v-if="success" class="message success">
          <svg
            class="message-icon"
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
          Product created successfully! Redirecting to products page...
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { createProduct, getCategories } from "../api";

export default defineComponent({
  name: "CreateProductView",
  setup() {
    const router = useRouter();
    const imagePreviews = ref<
      Array<{ url: string; file: File; name: string; size: number }>
    >([]);

    const categories = ref<any[]>([]);

    const form = reactive({
      name: "",
      description: "",
      price: 0,
      category: "",
      flavours: "",
      rating: 5,
      weight: "",
    });

    const loading = ref(false);
    const error = ref("");
    const success = ref(false);

    const loadCategories = async () => {
      try {
        const res = await getCategories();
        categories.value = res.data;
      } catch (err: any) {
        console.error("Failed to load categories:", err);
      }
    };

    const handleFileChange = (e: Event) => {
      const files = (e.target as HTMLInputElement).files;
      if (!files) return;

      const newFiles = Array.from(files);
      const remainingSlots = 10 - imagePreviews.value.length;
      const filesToAdd = newFiles.slice(0, remainingSlots);

      filesToAdd.forEach((file) => {
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = (e) => {
            imagePreviews.value.push({
              url: e.target?.result as string,
              file: file,
              name: file.name,
              size: file.size,
            });
          };
          reader.readAsDataURL(file);
        }
      });

      // Clear the file input's value to allow re-uploading the same file
      (e.target as HTMLInputElement).value = "";
    };

    const removeImage = (index: number) => {
      imagePreviews.value.splice(index, 1);
    };

    const moveImage = (index: number, direction: number) => {
      const newIndex = index + direction;
      if (newIndex >= 0 && newIndex < imagePreviews.value.length) {
        const temp = imagePreviews.value[index];
        imagePreviews.value[index] = imagePreviews.value[newIndex];
        imagePreviews.value[newIndex] = temp;
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
      form.name = "";
      form.description = "";
      form.price = 0;
      form.category = "";
      form.flavours = "";
      form.rating = 5;
      form.weight = "";
      imagePreviews.value = [];
      error.value = "";
      success.value = false;
    };

    const handleSubmit = async () => {
      error.value = "";
      success.value = false;
      loading.value = true;

      try {
        const data = new FormData();
        data.append("name", form.name);
        data.append("description", form.description);
        data.append("price", String(form.price));
        data.append("category", form.category);
        data.append("rating", String(form.rating));
        data.append("weight", form.weight);
        data.append(
          "flavours",
          JSON.stringify(form.flavours.split(",").map((s) => s.trim()))
        );

        // Append all images
        imagePreviews.value.forEach((imagePreview, index) => {
          data.append("images", imagePreview.file);
        });

        await createProduct(data);
        success.value = true;

        // Reset form
        resetForm();

        // Redirect after 2 seconds
        setTimeout(() => {
          router.push("/products");
        }, 2000);
      } catch (err: any) {
        error.value =
          err?.response?.data?.message || "Failed to create product.";
      } finally {
        loading.value = false;
      }
    };

    onMounted(loadCategories);

    return {
      form,
      loading,
      error,
      success,
      imagePreviews,
      categories,
      handleFileChange,
      handleSubmit,
      removeImage,
      moveImage,
      formatFileSize,
      resetForm,
    };
  },
});
</script>

<style scoped>
/* I've added a few lines to the existing styles. */
.create-product-view {
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
  color: #1e293b;
  margin: 0 0 1.5rem 0;
}

.section-icon {
  width: 20px;
  height: 20px;
  color: #3b82f6;
}

/* Form Grid */
.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

/* Form Groups */
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
.form-textarea,
.form-select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  background: white;
  color: #000;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
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
}

.currency-symbol {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  font-weight: 500;
  pointer-events: none;
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

.upload-area {
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  padding: 3rem 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #f9fafb;
  margin-bottom: 1.5rem;
  position: relative; /* Added to make position: absolute work on the child */
}

.upload-area:hover {
  border-color: #3b82f6;
  background: #f0f9ff;
}

/* This is the key change: we make the file input cover the entire area */
.file-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  pointer-events: none; /* Prevents the inner content from blocking the click */
}

.upload-icon {
  width: 48px;
  height: 48px;
  color: #9ca3af;
}

.upload-content h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

.upload-content p {
  color: #6b7280;
  margin: 0;
}

.file-types {
  font-size: 0.75rem;
  color: #9ca3af;
}

.upload-limit {
  font-size: 0.875rem;
  color: #3b82f6;
  font-weight: 500;
}

/* Image Previews */
.image-previews {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.image-preview-item {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  background: white;
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
  background: rgba(0, 0, 0, 0.7);
  opacity: 0;
  transition: opacity 0.2s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
}

.image-preview-item:hover .image-overlay {
  opacity: 1;
}

.remove-image-btn {
  align-self: flex-end;
  width: 32px;
  height: 32px;
  background: rgba(239, 68, 68, 0.9);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.remove-image-btn:hover {
  background: #dc2626;
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

/* Messages */
.message {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
}

.message.error {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.message.success {
  background: #f0fdf4;
  color: #059669;
  border: 1px solid #bbf7d0;
}

.message-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

/* Spinner */
.spinner {
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

/* Responsive Design */
@media (min-width: 640px) {
  .form-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .image-previews {
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

  .image-previews {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}

@media (min-width: 1024px) {
  .form-container {
    max-width: 900px;
  }

  .image-previews {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }
}
</style>
