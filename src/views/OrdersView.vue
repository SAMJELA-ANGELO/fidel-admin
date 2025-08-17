<template>
  <div class="orders-view">
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
      <p>Loading orders...</p>
    </div>

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
      <h3>Error Loading Orders</h3>
      <p>{{ error }}</p>
      <button class="btn btn-primary" @click="loadOrders">Try Again</button>
    </div>

    <div v-else class="orders-list-container">
      <div class="page-header">
        <div>
          <h1>Orders</h1>
          <p>Manage customer orders and track their status.</p>
        </div>
        <div class="header-actions">
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
              placeholder="Search by Order ID or Name..."
              class="search-input"
            />
          </div>
          <div class="filter-actions">
            <select v-model="statusFilter" class="filter-select">
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon total">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2m0 0l2-2m-2 2v-4"
              ></path>
            </svg>
          </div>
          <div>
            <p class="stat-value">{{ orders.length }}</p>
            <p class="stat-label">Total Orders</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon pending">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div>
            <p class="stat-value">{{ pendingOrders.length }}</p>
            <p class="stat-label">Pending Orders</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon completed">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div>
            <p class="stat-value">{{ completedOrders.length }}</p>
            <p class="stat-label">Completed Orders</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon revenue">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2m4 0h1a2 2 0 002-2v-3a2 2 0 00-2-2H9m0 0V9m-6 6h6m3 0V9m1 10h1a2 2 0 002-2v-3a2 2 0 00-2-2h-3m-3 0V9"
              ></path>
            </svg>
          </div>
          <div>
            <p class="stat-value">${{ totalRevenue }}</p>
            <p class="stat-label">Total Revenue</p>
          </div>
        </div>
      </div>

      <div class="orders-list">
        <div
          v-for="order in filteredOrders"
          :key="order._id"
          class="order-card"
        >
          <div class="card-header">
            <div class="order-id">
              Order #{{ order._id.slice(-6).toUpperCase() }}
            </div>
            <div class="order-status-badge">
              <span :class="`status-${order.status}`">{{ order.status }}</span>
            </div>
          </div>

          <div class="card-body">
            <div class="customer-info-row">
              <svg
                class="icon-md text-slate-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
              <div class="customer-details">
                <span class="customer-name"
                  >{{ order.firstName }} {{ order.lastName }}</span
                >
                <span class="customer-email">{{ order.email }}</span>
              </div>
            </div>

            <table class="products-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Qty</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in order.products" :key="item._id">
                  <td class="product-cell">
                    <img
                      v-if="item.product && item.product.images.length"
                      :src="item.product.images[0]"
                      alt="Product Image"
                      class="product-image"
                    />
                    <span v-if="item.product">{{ item.product.name }}</span>
                  </td>
                  <td>x{{ item.quantity }}</td>
                </tr>
              </tbody>
            </table>

            <div class="details-row">
              <div class="total-amount-box">
                <span class="label">Total</span>
                <span class="amount"
                  >${{ order.total ? order.total.toFixed(2) : "0.00" }}</span
                >
              </div>
              <div class="order-date-box">
                <span class="label">Ordered On</span>
                <span class="date">{{ formatDate(order.createdAt) }}</span>
              </div>
            </div>
          </div>

          <div class="card-footer">
            <router-link
              :to="`/orders/${order._id}`"
              class="btn-sm btn-primary"
            >
              View Details
            </router-link>
            <button
              class="btn-sm btn-danger"
              @click.stop="
                deleteOrder(
                  order._id,
                  `Order #${order._id.slice(-6).toUpperCase()}`
                )
              "
            >
              Delete
            </button>
          </div>
        </div>

        <div
          v-if="filteredOrders.length === 0 && !loading && !error"
          class="empty-state"
        >
          <div class="empty-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h2m0 0h4a2 2 0 012 2v6m-12 0H5a2 2 0 01-2-2V7a2 2 0 012-2h2"
              ></path>
            </svg>
          </div>
          <h3>No Orders Found</h3>
          <p>Your search or filter criteria returned no results.</p>
        </div>
      </div>
    </div>
  </div>

  <DeleteConfirmModal
    :show="showDeleteModal"
    :item-name="deletingOrderNumber"
    description="This will permanently remove the order from your system. All associated data will be lost."
    :loading="false"
    @close="closeDeleteModal"
    @confirm="confirmDelete"
  />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import { getOrders, deleteOrder } from "../api";
import DeleteConfirmModal from "../components/DeleteConfirmModal.vue";

export default defineComponent({
  name: "OrdersView",
  components: {
    DeleteConfirmModal,
  },
  setup() {
    const orders = ref<any[]>([]);
    const loading = ref(true);
    const error = ref("");
    const searchQuery = ref("");
    const statusFilter = ref("");
    const showDeleteModal = ref(false);
    const deletingOrderId = ref<string | null>(null);
    const deletingOrderNumber = ref("");

    const loadOrders = async () => {
      loading.value = true;
      error.value = "";
      try {
        const res = await getOrders();
        orders.value = res.data;
      } catch (err: any) {
        error.value = err?.response?.data?.message || "Failed to load orders.";
      } finally {
        loading.value = false;
      }
    };

    const filteredOrders = computed(() => {
      let filtered = orders.value;
      if (searchQuery.value) {
        filtered = filtered.filter(
          (order) =>
            order._id.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            order.firstName
              .toLowerCase()
              .includes(searchQuery.value.toLowerCase()) ||
            order.lastName
              .toLowerCase()
              .includes(searchQuery.value.toLowerCase())
        );
      }
      if (statusFilter.value) {
        filtered = filtered.filter(
          (order) => order.status === statusFilter.value
        );
      }
      return filtered;
    });

    const pendingOrders = computed(() =>
      orders.value.filter((order) => order.status === "pending")
    );
    const completedOrders = computed(() =>
      orders.value.filter((order) => order.status === "completed")
    );
    const totalRevenue = computed(() =>
      orders.value
        .reduce((sum, order) => sum + (order.total || 0), 0)
        .toFixed(2)
    );

    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    const deleteOrderHandler = async (orderId: string, orderNumber: string) => {
      deletingOrderId.value = orderId;
      deletingOrderNumber.value = orderNumber;
      showDeleteModal.value = true;
    };

    const confirmDelete = async () => {
      if (!deletingOrderId.value) return;
      try {
        await deleteOrder(deletingOrderId.value);
        await loadOrders();
        showDeleteModal.value = false;
        deletingOrderId.value = null;
        deletingOrderNumber.value = "";
      } catch (err: any) {
        error.value = err?.response?.data?.message || "Failed to delete order.";
      }
    };

    const closeDeleteModal = () => {
      showDeleteModal.value = false;
      deletingOrderId.value = null;
      deletingOrderNumber.value = "";
    };

    onMounted(loadOrders);

    return {
      orders,
      loading,
      error,
      searchQuery,
      statusFilter,
      filteredOrders,
      pendingOrders,
      completedOrders,
      totalRevenue,
      loadOrders,
      deleteOrder: deleteOrderHandler,
      formatDate,
      showDeleteModal,
      deletingOrderNumber,
      confirmDelete,
      closeDeleteModal,
    };
  },
});
</script>

<style scoped>
/* Base Styles & Utilities */
.orders-view {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  background-color: #f8fafc;
  min-height: 100vh;
  padding: 2rem;
}
.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s ease;
  cursor: pointer;
  border: 1px solid transparent;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
}
.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}
.btn-primary {
  background-color: #3b82f6;
  color: white;
}
.btn-primary:hover {
  background-color: #2563eb;
}
.btn-danger {
  background-color: #ef4444;
  color: white;
}
.btn-danger:hover {
  background-color: #dc2626;
}
.icon-md {
  width: 20px;
  height: 20px;
}
.text-slate-500 {
  color: #64748b;
}

/* Page Header */
.page-header {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}
.page-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}
.page-header p {
  color: #64748b;
  margin: 0;
}
.header-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
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
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.9rem;
  background: #f9fafb;
}
.filter-actions {
  display: flex;
  gap: 1rem;
}
.filter-select {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.9rem;
  background: white;
}
@media (min-width: 768px) {
  .page-header {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .header-actions {
    flex-direction: row;
    align-items: center;
    width: auto;
  }
}

/* Stats Cards */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}
.stat-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}
.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}
.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.stat-icon.total {
  background: #dbeafe;
  color: #2563eb;
}
.stat-icon.pending {
  background: #fef3c7;
  color: #d97706;
}
.stat-icon.completed {
  background: #d1fae5;
  color: #059669;
}
.stat-icon.revenue {
  background: #ede9fe;
  color: #7c3aed;
}
.stat-icon svg {
  width: 28px;
  height: 28px;
}
.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.25rem 0;
}
.stat-label {
  font-size: 0.9rem;
  color: #64748b;
  margin: 0;
}
@media (min-width: 640px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Orders List */
.orders-list {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
}
@media (min-width: 768px) {
  .orders-list {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1280px) {
  .orders-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

.order-card {
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  transition: all 0.2s ease;
}
.order-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: #f1f5f9;
  border-bottom: 1px solid #e2e8f0;
}
.order-id {
  font-weight: 600;
  color: #1e293b;
}
.order-status-badge span {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
}
.status-pending {
  background-color: #fef3c7;
  color: #d97706;
}
.status-processing {
  background-color: #dbeafe;
  color: #2563eb;
}
.status-completed {
  background-color: #d1fae5;
  color: #059669;
}
.status-cancelled {
  background-color: #fee2e2;
  color: #dc2626;
}

.card-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.customer-info-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.customer-details {
  display: flex;
  flex-direction: column;
}
.customer-name {
  font-weight: 600;
  color: #1e293b;
}
.customer-email {
  font-size: 0.875rem;
  color: #64748b;
}

/* Products Table Styles */
.products-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: -0.5rem;
}
.products-table th,
.products-table td {
  padding: 0.5rem 0;
  text-align: left;
  font-size: 0.875rem;
}
.products-table thead th {
  color: #94a3b8;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #e2e8f0;
}
.products-table tbody tr:not(:last-child) {
  border-bottom: 1px solid #f1f5f9;
}
.products-table tbody td:first-child {
  color: #334155;
  font-weight: 500;
}
.products-table tbody td:last-child {
  color: #64748b;
  font-weight: 500;
}
.product-cell {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.product-image {
  width: 32px;
  height: 32px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid #e2e8f0;
  flex-shrink: 0;
}

.details-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1rem;
}
.total-amount-box,
.order-date-box {
  display: flex;
  flex-direction: column;
}
.label {
  font-size: 0.75rem;
  color: #94a3b8;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 0.25rem;
}
.amount {
  font-size: 1.5rem;
  font-weight: 700;
  color: #059669;
}
.date {
  font-size: 0.9rem;
  color: #475569;
}

.card-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #e2e8f0;
  background-color: #f1f5f9;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

/* State Messages */
.loading-state,
.error-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
}
.loading-spinner,
.error-icon,
.empty-icon {
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
.error-icon svg,
.empty-icon svg {
  width: 48px;
  height: 48px;
}
.error-icon svg {
  color: #ef4444;
}
.empty-icon svg {
  color: #9ca3af;
}
.error-state h3,
.empty-state h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
}
.error-state p,
.empty-state p {
  color: #64748b;
  margin: 0;
}
</style>
