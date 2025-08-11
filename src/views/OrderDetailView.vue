<template>
  <div class="order-detail-view">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="order" class="order-detail">
      <div class="page-header">
        <div class="page-title">
          <h1>Order #{{ order._id.slice(-6).toUpperCase() }}</h1>
          <p class="page-subtitle">Order Details</p>
        </div>
        <div class="page-actions">
          <button @click="deleteOrder" class="btn btn-danger">
            Delete Order
          </button>
        </div>
      </div>

      <div class="order-content">
        <div class="order-info">
          <h2>Order Information</h2>
          <div class="info-grid">
            <div class="info-item">
              <label>Order ID</label>
              <span>{{ order._id }}</span>
            </div>
            <div class="info-item">
              <label>Status</label>
              <span class="status-badge" :class="order.status">{{
                order.status
              }}</span>
            </div>
            <div class="info-item">
              <label>Total Amount</label>
              <span class="price">${{ order.total }}</span>
            </div>
            <div class="info-item">
              <label>Created</label>
              <span>{{ formatDate(order.createdAt) }}</span>
            </div>
          </div>
        </div>

        <div class="order-items">
          <h2>Order Items</h2>
          <div class="items-list">
            <div v-for="item in order.items" :key="item._id" class="item-card">
              <div class="item-info">
                <h3>{{ item.product.name }}</h3>
                <p>{{ item.product.description }}</p>
                <div class="item-meta">
                  <span>Quantity: {{ item.quantity }}</span>
                  <span>Price: ${{ item.price }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="back-section">
          <router-link to="/orders" class="btn btn-secondary"
            >Back to Orders</router-link
          >
        </div>
      </div>
    </div>
  </div>

  <!-- Delete Confirmation Modal -->
  <DeleteConfirmModal
    :show="showDeleteModal"
    :item-name="`Order #${order?._id?.slice(-6)?.toUpperCase() || 'Order'}`"
    description="This will permanently remove the order from your system. All associated data will be lost."
    :loading="false"
    @close="closeDeleteModal"
    @confirm="confirmDelete"
  />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getOrder, deleteOrder } from "../api";
import DeleteConfirmModal from "../components/DeleteConfirmModal.vue";

export default defineComponent({
  name: "OrderDetailView",
  components: {
    DeleteConfirmModal,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const order = ref<any>(null);
    const loading = ref(true);
    const error = ref("");
    const showDeleteModal = ref(false);

    const loadOrder = async () => {
      loading.value = true;
      error.value = "";
      try {
        const res = await getOrder(route.params.id as string);
        order.value = res.data;
      } catch (err: any) {
        error.value = err?.response?.data?.message || "Failed to load order.";
      } finally {
        loading.value = false;
      }
    };

    const deleteOrderHandler = async () => {
      showDeleteModal.value = true;
    };

    const confirmDelete = async () => {
      try {
        await deleteOrder(order.value._id);
        router.push("/orders");
      } catch (err: any) {
        error.value = err?.response?.data?.message || "Failed to delete order.";
      }
    };

    const closeDeleteModal = () => {
      showDeleteModal.value = false;
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

    onMounted(loadOrder);

    return {
      order,
      loading,
      error,
      deleteOrder: deleteOrderHandler,
      formatDate,
      showDeleteModal,
      confirmDelete,
      closeDeleteModal,
    };
  },
});
</script>

<style scoped>
.order-detail-view {
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

.order-content {
  max-width: 800px;
}

.order-info,
.order-items {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.order-info h2,
.order-items h2 {
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

.info-item label {
  font-weight: 600;
  color: #666;
  font-size: 0.875rem;
}

.info-item span {
  font-size: 1rem;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
}

.status-badge.pending {
  background: #fef3c7;
  color: #d97706;
}

.status-badge.completed {
  background: #d1fae5;
  color: #059669;
}

.price {
  font-size: 1.25rem;
  font-weight: 700;
  color: #059669;
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.item-card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
}

.item-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.125rem;
}

.item-info p {
  color: #666;
  margin: 0 0 1rem 0;
}

.item-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: #666;
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
</style>
