<template>
  <div class="dashboard">
    <!-- Page Header -->
    <div class="page-header">
      <div class="page-title">
        <h1>Dashboard</h1>
        <p class="page-subtitle">
          Welcome back! Here's what's happening with your store today.
        </p>
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

    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon orders">
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
          <h3 class="stat-value">{{ ordersCount }}</h3>
          <p class="stat-label">Total Orders</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon products">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            ></path>
          </svg>
        </div>
        <div class="stat-content">
          <h3 class="stat-value">{{ productsCount }}</h3>
          <p class="stat-label">Active Products</p>
        </div>
      </div>
    </div>

    <!-- Recent Activity & Quick Actions -->
    <div class="dashboard-grid">
      <!-- Recent Orders -->
      <div class="dashboard-card">
        <div class="card-header">
          <h3>Recent Orders</h3>
          <router-link to="/orders" class="view-all">View All</router-link>
        </div>
        <div class="card-content">
          <div class="order-list">
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

            <!-- Empty State -->
            <div v-else-if="recentOrders.length === 0" class="empty-orders">
              <div class="empty-icon-wrapper">
                <svg
                  class="empty-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  ></path>
                </svg>
              </div>
              <h4 class="empty-title">No Orders Yet</h4>
              <p class="empty-message">
                When customers place orders, they'll appear here
              </p>
              <div class="empty-actions">
                <router-link
                  to="/create-product"
                  class="btn btn-primary btn-sm"
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
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    ></path>
                  </svg>
                  Add Your First Product
                </router-link>
              </div>
            </div>

            <!-- Orders List -->
            <template v-else>
              <div
                class="order-item"
                v-for="order in recentOrders"
                :key="order._id"
              >
                <div class="order-info">
                  <div class="order-id">#{{ order._id.slice(-6) }}</div>
                  <div class="order-customer">
                    {{ order.customerName || "Guest Customer" }}
                  </div>
                  <div class="order-date">
                    {{ formatDate(order.createdAt) }}
                  </div>
                </div>
                <div class="order-status" :class="order.status">
                  {{ order.status }}
                </div>
                <div class="order-amount">${{ order.total }}</div>
              </div>

              <!-- View All Orders Link -->
              <div class="view-all-orders">
                <router-link to="/orders" class="view-all-link">
                  View All Orders
                  <svg
                    class="arrow-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </router-link>
              </div>
            </template>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="dashboard-card">
        <div class="card-header">
          <h3>Quick Actions</h3>
        </div>
        <div class="card-content">
          <div class="quick-actions">
            <router-link to="/create-product" class="quick-action">
              <div class="action-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
              </div>
              <div class="action-content">
                <h4>Add New Product</h4>
                <p>Create a new product listing</p>
              </div>
            </router-link>

            <router-link to="/orders" class="quick-action">
              <div class="action-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  ></path>
                </svg>
              </div>
              <div class="action-content">
                <h4>View Orders</h4>
                <p>Check order status and details</p>
              </div>
            </router-link>

            <router-link to="/products" class="quick-action">
              <div class="action-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  ></path>
                </svg>
              </div>
              <div class="action-content">
                <h4>Manage Products</h4>
                <p>Edit and organize your products</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { getProducts, getOrders } from "../api";

export default defineComponent({
  name: "DashboardView",
  setup() {
    const ordersCount = ref(0);
    const productsCount = ref(0);
    const recentOrders = ref<any[]>([]);
    const loading = ref(true);

    const fetchStats = async () => {
      try {
        loading.value = true;
        const [ordersRes, productsRes] = await Promise.all([
          getOrders(),
          getProducts(),
        ]);
        const orders = ordersRes.data;
        const products = productsRes.data;
        ordersCount.value = Array.isArray(orders) ? orders.length : 0;
        productsCount.value = Array.isArray(products) ? products.length : 0;
        // Show up to 4 most recent orders
        recentOrders.value = Array.isArray(orders) ? orders.slice(0, 4) : [];
      } catch (e) {
        console.error("Error fetching dashboard data:", e);
        ordersCount.value = 0;
        productsCount.value = 0;
        recentOrders.value = [];
      } finally {
        loading.value = false;
      }
    };

    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    };

    onMounted(fetchStats);

    return {
      ordersCount,
      productsCount,
      recentOrders,
      loading,
      formatDate,
    };
  },
});
</script>

<style scoped>
.dashboard {
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

.stat-icon.orders {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
}

.stat-icon.products {
  background: linear-gradient(135deg, #f59e0b, #d97706);
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

/* Dashboard Grid */
.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.dashboard-card {
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  background: #f8fafc;
}

.card-header h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.view-all {
  color: #3b82f6;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: color 0.2s ease;
}

.view-all:hover {
  color: #1d4ed8;
}

.card-content {
  padding: 1.5rem;
}

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;
  color: #64748b;
}

.loading-spinner {
  margin-bottom: 1rem;
}

.spinner {
  width: 32px;
  height: 32px;
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

/* Empty Orders State */
.empty-orders {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;
  text-align: center;
}

.empty-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: #f1f5f9;
  border-radius: 50%;
  margin-bottom: 1.5rem;
}

.empty-icon {
  width: 40px;
  height: 40px;
  color: #94a3b8;
}

.empty-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #475569;
  margin: 0 0 0.5rem 0;
}

.empty-message {
  color: #64748b;
  font-size: 0.875rem;
  margin: 0 0 1.5rem 0;
  max-width: 280px;
  line-height: 1.5;
}

.empty-actions {
  display: flex;
  gap: 0.75rem;
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

/* Order List */
.order-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.order-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 8px;
  transition: all 0.2s ease;
  border: 1px solid #e2e8f0;
}

.order-item:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.order-info {
  flex: 1;
}

.order-id {
  font-weight: 600;
  color: #1e293b;
  font-size: 0.875rem;
}

.order-customer {
  color: #64748b;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.order-date {
  color: #94a3b8;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.order-status {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
  margin: 0 1rem;
}

.order-status.pending {
  background: #fef3c7;
  color: #d97706;
}

.order-status.processing {
  background: #dbeafe;
  color: #2563eb;
}

.order-status.completed {
  background: #d1fae5;
  color: #059669;
}

.order-status.cancelled {
  background: #fee2e2;
  color: #dc2626;
}

.order-amount {
  font-weight: 600;
  color: #1e293b;
  font-size: 0.875rem;
}

/* View All Orders Link */
.view-all-orders {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
}

.view-all-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #3b82f6;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.75rem;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.view-all-link:hover {
  background: #f0f9ff;
  color: #1d4ed8;
}

.arrow-icon {
  width: 16px;
  height: 16px;
}

/* Quick Actions */
.quick-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.quick-action {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;
  border: 1px solid #e2e8f0;
}

.quick-action:hover {
  background: #f1f5f9;
  transform: translateX(4px);
  border-color: #cbd5e1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.action-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #3b82f6;
  border-radius: 8px;
  color: white;
  flex-shrink: 0;
}

.action-icon svg {
  width: 20px;
  height: 20px;
}

.action-content h4 {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.25rem 0;
}

.action-content p {
  font-size: 0.75rem;
  color: #64748b;
  margin: 0;
}

/* Responsive Design */
@media (min-width: 640px) {
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

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .dashboard-grid {
    grid-template-columns: 2fr 1fr;
  }
}

@media (min-width: 1024px) {
  .page-title h1 {
    font-size: 2.25rem;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
