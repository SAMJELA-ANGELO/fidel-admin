<template>
  <div class="edit-product-view">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="edit-form">
      <h1>Edit Product</h1>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>Name</label>
          <input v-model="form.name" required />
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea v-model="form.description" required></textarea>
        </div>
        <div class="form-group">
          <label>Price</label>
          <input
            v-model.number="form.price"
            type="number"
            step="0.01"
            required
          />
        </div>
        <div class="form-group">
          <label>Category</label>
          <select v-model="form.category" required>
            <option value="">Select category</option>
            <option v-for="cat in categories" :key="cat._id" :value="cat._id">
              {{ cat.name }}
            </option>
          </select>
        </div>
        <button type="submit" :disabled="submitting">
          {{ submitting ? "Updating..." : "Update Product" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getProduct, updateProduct, getCategories } from "../api";

export default defineComponent({
  name: "EditProductView",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const loading = ref(true);
    const submitting = ref(false);
    const error = ref("");
    const categories = ref<any[]>([]);

    const form = reactive({
      name: "",
      description: "",
      price: 0,
      category: "",
    });

    const loadProduct = async () => {
      try {
        const [productRes, categoriesRes] = await Promise.all([
          getProduct(route.params.id as string),
          getCategories(),
        ]);

        const product = productRes.data;
        categories.value = categoriesRes.data;

        form.name = product.name;
        form.description = product.description;
        form.price = product.price;
        form.category = product.category?._id || product.category || "";
      } catch (err: any) {
        error.value = err?.response?.data?.message || "Failed to load product.";
      } finally {
        loading.value = false;
      }
    };

    const handleSubmit = async () => {
      submitting.value = true;
      try {
        const data = new FormData();
        data.append("name", form.name);
        data.append("description", form.description);
        data.append("price", String(form.price));
        data.append("category", form.category);

        await updateProduct(route.params.id as string, data);
        router.push(`/products/${route.params.id}`);
      } catch (err: any) {
        error.value =
          err?.response?.data?.message || "Failed to update product.";
      } finally {
        submitting.value = false;
      }
    };

    onMounted(loadProduct);

    return {
      form,
      loading,
      submitting,
      error,
      categories,
      handleSubmit,
    };
  },
});
</script>

<style scoped>
.edit-product-view {
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

.edit-form {
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  background: #3b82f6;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
