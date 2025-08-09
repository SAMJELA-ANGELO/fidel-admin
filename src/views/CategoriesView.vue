<template>
  <div class="categories-view">
    <!-- Page Header -->
    <div class="page-header">
      <div class="page-title">
        <h1>Categories</h1>
        <p class="page-subtitle">Manage your product categories</p>
      </div>
      <div class="page-actions">
        <button @click="showCreateModal = true" class="btn btn-primary">
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
          Add Category
        </button>
      </div>
    </div>

    <!-- Search -->
    <div class="search-section">
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
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search categories..."
          class="search-input"
        />
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
      <p>Loading categories...</p>
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
      <h3>Error Loading Categories</h3>
      <p>{{ error }}</p>
      <button @click="loadCategories" class="btn btn-primary">Try Again</button>
    </div>

    <!-- Empty State -->
    <div v-else-if="filteredCategories.length === 0" class="empty-state">
      <div class="empty-icon">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
          ></path>
        </svg>
      </div>
      <h3>No Categories Found</h3>
      <p>Get started by creating your first category.</p>
      <button @click="showCreateModal = true" class="btn btn-primary">
        Add Category
      </button>
    </div>

    <!-- Categories Grid -->
    <div v-else class="categories-grid">
      <div
        v-for="category in filteredCategories"
        :key="category._id"
        class="category-card"
      >
        <div class="category-header">
          <div class="category-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              ></path>
            </svg>
          </div>
          <div class="category-actions">
            <button
              @click="editCategory(category)"
              class="action-btn edit"
              title="Edit Category"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                ></path>
              </svg>
            </button>
            <button
              @click="deleteCategory(category._id)"
              class="action-btn delete"
              title="Delete Category"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <div class="category-content">
          <h3 class="category-name">{{ category.name }}</h3>
          <p class="category-description">
            {{ category.description || "No description provided" }}
          </p>
          <div class="category-meta">
            <span class="category-id"
              >ID: {{ category._id.slice(-6).toUpperCase() }}</span
            >
            <span class="category-date">{{
              formatDate(category.createdAt)
            }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Results Count -->
    <div v-if="filteredCategories.length > 0" class="results-count">
      Showing {{ filteredCategories.length }} of
      {{ categories.length }} categories
    </div>

    <!-- Create/Edit Modal -->
    <div
      v-if="showCreateModal || showEditModal"
      class="modal-overlay"
      @click="closeModal"
    >
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>{{ showEditModal ? "Edit Category" : "Create Category" }}</h3>
          <button @click="closeModal" class="modal-close">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="modal-form">
          <div class="form-group">
            <label for="categoryName" class="form-label">Category Name *</label>
            <input
              id="categoryName"
              v-model="form.name"
              type="text"
              class="form-input"
              placeholder="Enter category name"
              required
            />
          </div>

          <div class="form-group">
            <label for="categoryDescription" class="form-label"
              >Description</label
            >
            <textarea
              id="categoryDescription"
              v-model="form.description"
              class="form-textarea"
              placeholder="Enter category description..."
              rows="3"
            ></textarea>
          </div>

          <div class="modal-actions">
            <button type="button" @click="closeModal" class="btn btn-secondary">
              Cancel
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="submitting"
            >
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
              {{
                submitting
                  ? showEditModal
                    ? "Updating..."
                    : "Creating..."
                  : showEditModal
                  ? "Update Category"
                  : "Create Category"
              }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../api";

export default defineComponent({
  name: "CategoriesView",
  setup() {
    const categories = ref<any[]>([]);
    const loading = ref(true);
    const error = ref("");
    const searchQuery = ref("");
    const showCreateModal = ref(false);
    const showEditModal = ref(false);
    const submitting = ref(false);
    const editingCategory = ref<any>(null);

    const form = ref({
      name: "",
      description: "",
    });

    const loadCategories = async () => {
      loading.value = true;
      error.value = "";
      try {
        const res = await getCategories();
        categories.value = res.data;
      } catch (err: any) {
        error.value =
          err?.response?.data?.message || "Failed to load categories.";
      } finally {
        loading.value = false;
      }
    };

    const filteredCategories = computed(() => {
      if (!searchQuery.value) return categories.value;

      return categories.value.filter(
        (category) =>
          category.name
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase()) ||
          (category.description &&
            category.description
              .toLowerCase()
              .includes(searchQuery.value.toLowerCase()))
      );
    });

    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    };

    const resetForm = () => {
      form.value = {
        name: "",
        description: "",
      };
      editingCategory.value = null;
    };

    const closeModal = () => {
      showCreateModal.value = false;
      showEditModal.value = false;
      resetForm();
    };

    const editCategory = (category: any) => {
      editingCategory.value = category;
      form.value = {
        name: category.name,
        description: category.description || "",
      };
      showEditModal.value = true;
    };

    const handleSubmit = async () => {
      submitting.value = true;
      try {
        if (showEditModal.value && editingCategory.value) {
          await updateCategory(editingCategory.value._id, form.value);
        } else {
          await createCategory(form.value);
        }

        await loadCategories();
        closeModal();
      } catch (err: any) {
        error.value =
          err?.response?.data?.message || "Failed to save category.";
      } finally {
        submitting.value = false;
      }
    };

    const deleteCategoryHandler = async (categoryId: string) => {
      if (!confirm("Are you sure you want to delete this category?")) return;

      try {
        await deleteCategory(categoryId);
        await loadCategories();
      } catch (err: any) {
        error.value =
          err?.response?.data?.message || "Failed to delete category.";
      }
    };

    onMounted(loadCategories);

    return {
      categories,
      loading,
      error,
      searchQuery,
      filteredCategories,
      showCreateModal,
      showEditModal,
      submitting,
      form,
      loadCategories,
      formatDate,
      closeModal,
      editCategory,
      handleSubmit,
      deleteCategory: deleteCategoryHandler,
    };
  },
});
</script>

<style scoped>
.categories-view {
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

/* Search Section */
.search-section {
  margin-bottom: 2rem;
}

.search-box {
  position: relative;
  max-width: 400px;
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

/* Categories Grid */
.categories-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.category-card {
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  transition: all 0.2s ease;
}

.category-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.category-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.category-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  border-radius: 12px;
}

.category-icon svg {
  width: 24px;
  height: 24px;
}

.category-actions {
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

.category-content {
  padding: 1.5rem;
}

.category-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
}

.category-description {
  color: #64748b;
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0 0 1rem 0;
}

.category-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  color: #9ca3af;
}

.category-id {
  font-family: monospace;
  background: #f1f5f9;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

/* Results Count */
.results-count {
  text-align: center;
  color: #64748b;
  font-size: 0.875rem;
  padding: 1rem 0;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal {
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.modal-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.modal-close {
  width: 32px;
  height: 32px;
  border: none;
  background: #f1f5f9;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.modal-close:hover {
  background: #e2e8f0;
}

.modal-close svg {
  width: 18px;
  height: 18px;
  color: #64748b;
}

.modal-form {
  padding: 1.5rem;
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
  transition: all 0.2s ease;
  background: #f9fafb;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  background: white;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
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

  .categories-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1024px) {
  .categories-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
