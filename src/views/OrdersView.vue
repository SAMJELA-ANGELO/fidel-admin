<template>
  <div class="orders-view">
    <!-- Page Header -->
    <div class="page-header">
      <div class="page-title">
        <h1>Orders</h1>
        <p class="page-subtitle">Track and manage customer orders</p>
      </div>
      <div class="page-actions">
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
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            ></path>
          </svg>
          Export
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon total">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            ></path>
          </svg>
        </div>
        <div class="stat-content">
          <h3 class="stat-value">{{ orders.length }}</h3>
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
        <div class="stat-content">
          <h3 class="stat-value">{{ pendingOrders.length }}</h3>
          <p class="stat-label">Pending</p>
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
        <div class="stat-content">
          <h3 class="stat-value">{{ completedOrders.length }}</h3>
          <p class="stat-label">Completed</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon revenue">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
            ></path>
          </svg>
        </div>
        <div class="stat-content">
          <h3 class="stat-value">${{ totalRevenue }}</h3>
          <p class="stat-label">Total Revenue</p>
        </div>
      </div>
    </div>

    <!-- Filters -->
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
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search orders..."
          class="search-input"
        />
      </div>
      <div class="filter-actions">
        <select v-model="statusFilter" class="filter-select">
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
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
      <p>Loading orders...</p>
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
      <h3>Error Loading Orders</h3>
      <p>{{ error }}</p>
      <button @click="loadOrders" class="btn btn-primary">Try Again</button>
    </div>

    <!-- Empty State -->
    <div v-else-if="filteredOrders.length === 0" class="empty-state">
      <div class="empty-icon">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          ></path>
        </svg>
      </div>
      <h3>No Orders Found</h3>
      <p>Orders will appear here once customers start placing them.</p>
    </div>

    <!-- Orders List -->
    <div v-else class="orders-list">
      <div v-for="order in filteredOrders" :key="order._id" class="order-card">
        <div class="order-header">
          <div class="order-id">
            <span class="order-number"
              >#{{ order._id.slice(-6).toUpperCase() }}</span
            >
            <span class="order-date">{{ formatDate(order.createdAt) }}</span>
          </div>
          <div class="order-status">
            <span class="status-badge" :class="order.status">
              {{ order.status }}
            </span>
          </div>
        </div>

        <div class="order-content">
          <div class="order-customer">
            <div class="customer-info">
              <svg
                class="customer-icon"
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
              <div>
                <h4 class="customer-name">{{ order.user }}</h4>
                <p class="customer-email">customer@example.com</p>
              </div>
            </div>
          </div>

          <div class="order-products">
            <h4 class="products-title">Products</h4>
            <div class="products-list">
              <div
                v-for="item in order.products"
                :key="item.product"
                class="product-item"
              >
                <div class="product-info">
                  <span class="product-name">{{ item.product }}</span>
                  <span class="product-quantity">x{{ item.quantity }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="order-footer">
            <div class="order-total">
              <span class="total-label">Total</span>
              <span class="total-amount">${{ order.total }}</span>
            </div>
            <div class="order-actions">
              <router-link
                :to="`/orders/${order._id}`"
                class="action-btn view"
                title="View Details"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  ></path>
                </svg>
                View
              </router-link>
              <button
                @click="deleteOrder(order._id)"
                class="action-btn delete"
                title="Delete Order"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        </div>
      </div>
    </div>

    <!-- Results Count -->
    <div v-if="filteredOrders.length > 0" class="results-count">
      Showing {{ filteredOrders.length }} of {{ orders.length }} orders
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import { getOrders, deleteOrder } from "../api";

export default defineComponent({
  name: "OrdersView",
  setup() {
    const orders = ref<any[]>([]);
    const loading = ref(true);
    const error = ref("");
    const searchQuery = ref("");
    const statusFilter = ref("");

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
            order.user.toLowerCase().includes(searchQuery.value.toLowerCase())
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

    const deleteOrderHandler = async (orderId: string) => {
      if (!confirm("Are you sure you want to delete this order?")) return;

      try {
        await deleteOrder(orderId);
        await loadOrders();
      } catch (err: any) {
        error.value = err?.response?.data?.message || "Failed to delete order.";
      }
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
    };
  },
});
</script>

<style scoped>
.orders-view {
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

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  color: white;
  flex-shrink: 0;
}

.stat-icon.total {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
}

.stat-icon.pending {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.stat-icon.completed {
  background: linear-gradient(135deg, #10b981, #059669);
}

.stat-icon.revenue {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
}

.stat-icon svg {
  width: 24px;
  height: 24px;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 1.875rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.25rem 0;
  line-height: 1;
}

.stat-label {
  color: #64748b;
  font-size: 0.875rem;
  margin: 0;
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
  margin: 0;
}

/* Orders List */
.orders-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.order-card {
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  transition: all 0.2s ease;
}

.order-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.order-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.order-id {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.order-number {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
}

.order-date {
  font-size: 0.875rem;
  color: #64748b;
}

.status-badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
}

.status-badge.pending {
  background: #fef3c7;
  color: #d97706;
}

.status-badge.processing {
  background: #dbeafe;
  color: #2563eb;
}

.status-badge.completed {
  background: #d1fae5;
  color: #059669;
}

.status-badge.cancelled {
  background: #fee2e2;
  color: #dc2626;
}

.order-content {
  padding: 1.5rem;
}

.order-customer {
  margin-bottom: 1.5rem;
}

.customer-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.customer-icon {
  width: 20px;
  height: 20px;
  color: #64748b;
}

.customer-name {
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.25rem 0;
}

.customer-email {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
}

.order-products {
  margin-bottom: 1.5rem;
}

.products-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.75rem 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.products-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.product-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  background: #f8fafc;
  border-radius: 8px;
}

.product-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.product-name {
  font-size: 0.875rem;
  color: #1e293b;
  font-weight: 500;
}

.product-quantity {
  font-size: 0.75rem;
  color: #64748b;
  background: #e2e8f0;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
}

.order-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
}

.order-total {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.total-label {
  font-size: 0.75rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.total-amount {
  font-size: 1.25rem;
  font-weight: 700;
  color: #059669;
}

.order-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn.view {
  background: #f1f5f9;
  color: #475569;
}

.action-btn.edit {
  background: #3b82f6;
  color: white;
}

.action-btn:hover {
  transform: translateY(-1px);
}

.action-btn svg {
  width: 16px;
  height: 16px;
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

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
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

  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 1024px) {
  .orders-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}
</style>
