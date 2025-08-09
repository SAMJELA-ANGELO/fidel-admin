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
        <button class="btn btn-primary">
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
        </button>
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
          <h3 class="stat-value">1,234</h3>
          <p class="stat-label">Total Orders</p>
          <div class="stat-change positive">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              ></path>
            </svg>
            +12.5%
          </div>
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
          <h3 class="stat-value">$45,678</h3>
          <p class="stat-label">Total Revenue</p>
          <div class="stat-change positive">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              ></path>
            </svg>
            +8.2%
          </div>
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
          <h3 class="stat-value">89</h3>
          <p class="stat-label">Active Products</p>
          <div class="stat-change neutral">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              ></path>
            </svg>
            +0%
          </div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon customers">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            ></path>
          </svg>
        </div>
        <div class="stat-content">
          <h3 class="stat-value">567</h3>
          <p class="stat-label">Total Customers</p>
          <div class="stat-change positive">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              ></path>
            </svg>
            +15.3%
          </div>
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
            <div
              class="order-item"
              v-for="order in recentOrders"
              :key="order.id"
            >
              <div class="order-info">
                <div class="order-id">#{{ order.id }}</div>
                <div class="order-customer">{{ order.customer }}</div>
                <div class="order-date">{{ order.date }}</div>
              </div>
              <div class="order-status" :class="order.status">
                {{ order.status }}
              </div>
              <div class="order-amount">${{ order.amount }}</div>
            </div>
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
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "DashboardView",
  setup() {
    const recentOrders = ref([
      {
        id: "ORD-001",
        customer: "John Doe",
        date: "2 hours ago",
        status: "pending",
        amount: "299.99",
      },
      {
        id: "ORD-002",
        customer: "Jane Smith",
        date: "4 hours ago",
        status: "completed",
        amount: "149.50",
      },
      {
        id: "ORD-003",
        customer: "Mike Johnson",
        date: "6 hours ago",
        status: "processing",
        amount: "89.99",
      },
      {
        id: "ORD-004",
        customer: "Sarah Wilson",
        date: "1 day ago",
        status: "completed",
        amount: "199.99",
      },
    ]);

    return {
      recentOrders,
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

.stat-icon.revenue {
  background: linear-gradient(135deg, #10b981, #059669);
}

.stat-icon.products {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.stat-icon.customers {
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
  margin: 0 0 0.5rem 0;
}

.stat-change {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.stat-change.positive {
  color: #059669;
}

.stat-change.negative {
  color: #dc2626;
}

.stat-change.neutral {
  color: #64748b;
}

.stat-change svg {
  width: 12px;
  height: 12px;
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
  transition: background 0.2s ease;
}

.order-item:hover {
  background: #f1f5f9;
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

.order-amount {
  font-weight: 600;
  color: #1e293b;
  font-size: 0.875rem;
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
}

.quick-action:hover {
  background: #f1f5f9;
  transform: translateX(4px);
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
    grid-template-columns: repeat(4, 1fr);
  }

  .dashboard-grid {
    grid-template-columns: 2fr 1fr;
  }
}

@media (min-width: 1024px) {
  .page-title h1 {
    font-size: 2.25rem;
  }
}
</style>
