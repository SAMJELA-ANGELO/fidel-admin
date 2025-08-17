<template>
  <div class="order-detail-view">
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
      <p>Loading order details...</p>
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
      <h3>Error Loading Order</h3>
      <p>{{ error }}</p>
      <button class="btn btn-primary" @click="loadOrder">Try Again</button>
    </div>

    <div v-else-if="order" class="order-detail">
      <div class="page-header">
        <div class="page-title">
          <h1>Order #{{ order._id.slice(-6).toUpperCase() }}</h1>
          <p class="page-subtitle">Details for this order</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary" @click="openInvoiceModal">
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
                d="M3 8.25V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18V8.25m-18 0H5.25m-2.25 0a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 8.25m-18 0V6a2.25 2.25 0 012.25-2.25h3.69l.75.75H21V18a2.25 2.25 0 01-2.25 2.25h-13.5A2.25 2.25 0 013 18V8.25z"
              ></path>
            </svg>
            Resend Invoice
          </button>
          <button class="btn btn-danger" @click="deleteOrder">
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
            Delete Order
          </button>
        </div>
      </div>

      <div class="details-grid">
        <div class="card card-info">
          <h2>Order Information</h2>
          <div class="info-group">
            <div class="info-item">
              <label>Order ID</label>
              <p class="font-mono">{{ order._id }}</p>
            </div>
            <div class="info-item">
              <label>Status</label>
              <span class="status-badge" :class="`status-${order.status}`">{{
                order.status
              }}</span>
            </div>
            <div class="info-item">
              <label>Total Amount</label>
              <p class="price">
                ${{ order.total ? order.total.toFixed(2) : "0.00" }}
              </p>
            </div>
            <div class="info-item">
              <label>Created On</label>
              <p>{{ formatDate(order.createdAt) }}</p>
            </div>
          </div>
        </div>

        <div class="card card-customer">
          <h2>Customer Details</h2>
          <div class="info-group">
            <div class="info-item">
              <label>Name</label>
              <p>{{ order.firstName }} {{ order.lastName }}</p>
            </div>
            <div class="info-item">
              <label>Email</label>
              <p>{{ order.email }}</p>
            </div>
            <div class="info-item">
              <label>Phone</label>
              <p>{{ order.phone }}</p>
            </div>
            <div v-if="order.companyName" class="info-item">
              <label>Company</label>
              <p>{{ order.companyName }}</p>
            </div>
          </div>
        </div>

        <div class="card card-shipping">
          <h2>Shipping & Delivery</h2>
          <div class="info-group">
            <div class="info-item">
              <label>Shipping Address</label>
              <p>
                {{ order.city }}, {{ order.state }}, {{ order.country }}
                {{ order.postcode }}
              </p>
            </div>
            <div class="info-item">
              <label>Payment Method</label>
              <p>{{ order.paymentMethod }}</p>
            </div>
            <div
              v-if="order.scheduledDelivery && order.scheduledDelivery.date"
              class="info-item"
            >
              <label>Scheduled Delivery</label>
              <p>
                {{ formatDate(order.scheduledDelivery.date) }}
                <span v-if="order.scheduledDelivery.note" class="delivery-note"
                  >({{ order.scheduledDelivery.note }})</span
                >
              </p>
            </div>
            <div v-if="order.orderNote" class="info-item">
              <label>Order Note</label>
              <p>{{ order.orderNote }}</p>
            </div>
          </div>
        </div>

        <div class="card card-products">
          <h2>Order Items</h2>
          <table class="items-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in order.products" :key="item.product._id">
                <td class="product-cell">
                  <img
                    v-if="item.product.images?.length"
                    :src="item.product.images[0]"
                    alt="Product Image"
                    class="product-image"
                  />
                  <span>{{ item.product.name }}</span>
                </td>
                <td>{{ item.quantity }}</td>
                <td>
                  ${{
                    item.product.price ? item.product.price.toFixed(2) : "0.00"
                  }}
                </td>
                <td>
                  ${{ (item.quantity * (item.product.price || 0)).toFixed(2) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="back-section">
        <router-link to="/orders" class="btn btn-secondary">
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
          Back to Orders
        </router-link>
      </div>
    </div>
  </div>

  <DeleteConfirmModal
    :show="showDeleteModal"
    :item-name="`Order #${order?._id?.slice(-6)?.toUpperCase() || 'Order'}`"
    description="This will permanently remove the order from your system. All associated data will be lost."
    :loading="false"
    @close="closeDeleteModal"
    @confirm="confirmDelete"
  />

  <div v-if="showInvoiceModal" class="modal-overlay">
    <div class="modal">
      <div class="modal-header">
        <h3>Resend Invoice</h3>
        <button class="modal-close" @click="closeInvoiceModal">×</button>
      </div>
      <div class="modal-body">
        <p>
          Edit order details and resend invoice to customer. The total will be
          calculated automatically.
        </p>
        <form @submit.prevent="sendInvoice">
          <div class="form-grid">
            <div class="form-group">
              <label for="toEmail">Recipient Email</label>
              <input
                id="toEmail"
                v-model="invoiceForm.toEmail"
                type="email"
                required
              />
            </div>
            <div class="form-group">
              <label for="firstName">First Name</label>
              <input
                id="firstName"
                v-model="invoiceForm.firstName"
                type="text"
              />
            </div>
            <div class="form-group">
              <label for="lastName">Last Name</label>
              <input id="lastName" v-model="invoiceForm.lastName" type="text" />
            </div>
            <div class="form-group">
              <label for="phone">Phone</label>
              <input id="phone" v-model="invoiceForm.phone" type="tel" />
            </div>
            <div class="form-group">
              <label for="country">Country</label>
              <input id="country" v-model="invoiceForm.country" type="text" />
            </div>
            <div class="form-group">
              <label for="city">City</label>
              <input id="city" v-model="invoiceForm.city" type="text" />
            </div>
            <div class="form-group">
              <label for="state">State</label>
              <input id="state" v-model="invoiceForm.state" type="text" />
            </div>
            <div class="form-group">
              <label for="postcode">Postcode</label>
              <input id="postcode" v-model="invoiceForm.postcode" type="text" />
            </div>
            <div class="form-group full-width">
              <label for="companyName">Company Name</label>
              <input
                id="companyName"
                v-model="invoiceForm.companyName"
                type="text"
              />
            </div>
            <div class="form-group full-width">
              <label for="paymentMethod">Payment Method</label>
              <input
                id="paymentMethod"
                v-model="invoiceForm.paymentMethod"
                type="text"
              />
            </div>
            <div class="form-group">
              <label for="deliveryDate">Scheduled Delivery Date</label>
              <input
                id="deliveryDate"
                v-model="invoiceForm.scheduledDelivery.date"
                type="date"
              />
            </div>
            <div class="form-group">
              <label for="deliveryNote">Scheduled Delivery Note</label>
              <input
                id="deliveryNote"
                v-model="invoiceForm.scheduledDelivery.note"
                type="text"
              />
            </div>
            <div class="form-group full-width">
              <label for="orderNote">Order Note</label>
              <textarea
                id="orderNote"
                v-model="invoiceForm.orderNote"
              ></textarea>
            </div>
            <div class="form-group full-width">
              <label>Order Status</label>
              <select v-model="invoiceForm.status">
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="shipped">Shipped</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div class="form-group full-width">
            <label>Products</label>
            <table class="items-table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in invoiceForm.products"
                  :key="item.product._id || index"
                >
                  <td>
                    <input
                      v-model="item.product.name"
                      type="text"
                      class="editable-input"
                    />
                  </td>
                  <td>
                    <input
                      v-model.number="item.product.price"
                      type="number"
                      step="0.01"
                      class="editable-input"
                    />
                  </td>
                  <td>
                    <input
                      v-model.number="item.quantity"
                      type="number"
                      class="editable-input"
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      class="btn-remove"
                      @click="removeProduct(index)"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              type="button"
              class="btn btn-secondary add-product-btn"
              @click="addProduct"
            >
              Add Product
            </button>
          </div>

          <div class="invoice-total">
            Total: ${{ calculatedTotal.toFixed(2) }}
          </div>

          <div v-if="successMessage" class="alert-success">
            {{ successMessage }}
          </div>
          <div v-if="invoiceError" class="alert-danger">{{ invoiceError }}</div>
          <div class="modal-actions">
            <button
              type="button"
              class="btn btn-secondary"
              @click="closeInvoiceModal"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="sendingInvoice"
            >
              <span v-if="sendingInvoice">Sending...</span>
              <span v-else>Send Invoice</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getOrder, deleteOrder, updateOrder, editAndSendInvoice } from "../api";
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

    // New state for invoice functionality
    const showInvoiceModal = ref(false);
    const invoiceForm = ref<any>({
      toEmail: "",
      firstName: "",
      lastName: "",
      country: "",
      city: "",
      state: "",
      companyName: "",
      postcode: "",
      phone: "",
      orderNote: "",
      scheduledDelivery: { date: "", note: "" },
      paymentMethod: "",
      products: [],
      total: 0,
      status: "pending",
    });
    const sendingInvoice = ref(false);
    const invoiceError = ref("");
    const successMessage = ref("");

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

    const deleteOrderHandler = () => {
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

    const openInvoiceModal = () => {
      if (order.value) {
        invoiceForm.value = {
          toEmail: order.value.email,
          firstName: order.value.firstName,
          lastName: order.value.lastName,
          country: order.value.country,
          city: order.value.city,
          state: order.value.state,
          companyName: order.value.companyName,
          postcode: order.value.postcode,
          phone: order.value.phone,
          orderNote: order.value.orderNote,
          scheduledDelivery: {
            date: order.value.scheduledDelivery?.date || "",
            note: order.value.scheduledDelivery?.note || "",
          },
          paymentMethod: order.value.paymentMethod,
          products: order.value.products.map((p: any) => ({
            product: { ...p.product },
            quantity: p.quantity,
          })),
          total: order.value.total,
          status: order.value.status,
        };
        showInvoiceModal.value = true;
        invoiceError.value = "";
        successMessage.value = "";
      }
    };

    const calculatedTotal = computed(() => {
      return invoiceForm.value.products.reduce((sum: number, item: any) => {
        const price = item.product?.price || 0;
        const quantity = item.quantity || 0;
        return sum + price * quantity;
      }, 0);
    });

    const sendInvoice = async () => {
      sendingInvoice.value = true;
      invoiceError.value = "";
      successMessage.value = "";

      // Update the total in the form data before sending
      invoiceForm.value.total = calculatedTotal.value;

      try {
        // First, update the order in the database with the new fields
        const updateData = { ...invoiceForm.value };
        delete updateData.toEmail; // Exclude toEmail from the database update
        await updateOrder(order.value._id, updateData);

        // Then, send the invoice with the updated data
        await editAndSendInvoice(order.value._id, {
          toEmail: invoiceForm.value.toEmail,
          invoiceData: invoiceForm.value,
        });

        // Reload the order to reflect the changes in the main view
        await loadOrder();

        successMessage.value = "Invoice sent and order updated successfully!";
      } catch (err: any) {
        invoiceError.value =
          err?.response?.data?.message || "Failed to send invoice.";
      } finally {
        sendingInvoice.value = false;
      }
    };

    const removeProduct = (index: number) => {
      invoiceForm.value.products.splice(index, 1);
    };

    const addProduct = () => {
      invoiceForm.value.products.push({
        product: {
          name: "New Product",
          price: 0,
          images: [],
        },
        quantity: 1,
      });
    };

    const closeInvoiceModal = () => {
      showInvoiceModal.value = false;
    };

    const formatDate = (dateString: string) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
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
      loadOrder,
      showInvoiceModal,
      invoiceForm,
      sendingInvoice,
      invoiceError,
      successMessage,
      openInvoiceModal,
      sendInvoice,
      closeInvoiceModal,
      calculatedTotal,
      removeProduct,
      addProduct,
    };
  },
});
</script>

<style scoped>
/* Base Styles & Utilities */
.order-detail-view {
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
.btn-primary {
  background-color: #3b82f6;
  color: white;
}
.btn-primary:hover {
  background-color: #2563eb;
}
.btn-secondary {
  background-color: #e2e8f0;
  color: #475569;
}
.btn-secondary:hover {
  background-color: #cbd5e1;
}
.btn-danger {
  background-color: #ef4444;
  color: white;
}
.btn-danger:hover {
  background-color: #dc2626;
}
.btn-icon {
  width: 20px;
  height: 20px;
}

/* Page Header */
.page-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
.page-actions {
  display: flex;
  gap: 0.5rem;
}
@media (min-width: 768px) {
  .page-header {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

/* Main Content Grid */
.details-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}
@media (min-width: 1024px) {
  .details-grid {
    grid-template-columns: 2fr 1fr;
    grid-template-rows: auto auto;
  }
  .card-info {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
  }
  input {
    padding: 0.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    color: #334155;
    background-color: white;
  }
  .card-customer {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
  }
  .card-products {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
  }
  .card-shipping {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
  }
}

/* Card Styles */
.card {
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  padding: 2rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}
.card h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 1.5rem 0;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 1rem;
}

/* Info Items */
.info-group {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
}
@media (min-width: 640px) {
  .info-group {
    grid-template-columns: repeat(2, 1fr);
  }
}
.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.info-item label {
  font-weight: 600;
  color: #94a3b8;
  font-size: 0.8rem;
  text-transform: uppercase;
}
.info-item p,
.info-item span {
  font-size: 1rem;
  color: #334155;
  margin: 0;
}
.font-mono {
  font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier,
    monospace;
  font-size: 0.9rem;
}

/* Status Badges */
.status-badge {
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

.price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #059669;
}

/* Order Items Table Styles */
.items-table {
  width: 100%;
  border-collapse: collapse;
}
.items-table th,
.items-table td {
  padding: 1rem 0;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}
.items-table th {
  font-weight: 600;
  color: #94a3b8;
  text-transform: uppercase;
  font-size: 0.8rem;
}
.items-table tbody tr:last-child td {
  border-bottom: none;
}
.items-table td {
  color: #334155;
}
.product-cell {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.product-image {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  flex-shrink: 0;
}

/* Back Button */
.back-section {
  margin-top: 2rem;
}

/* State Messages */
.loading-state,
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
}
.loading-spinner,
.error-icon {
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
  margin: 0;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 900px; /* Increased max-width */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  max-height: 90vh; /* Prevents overflow */
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  flex-shrink: 0;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #1e293b;
}

.modal-close {
  background: none;
  border: none;
  font-size: 2rem;
  color: #9ca3af;
  cursor: pointer;
}

.modal-body {
  padding: 1.5rem;
  overflow-y: auto;
}

.modal-body p {
  color: #64748b;
  margin: 0 0 1rem 0;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}
@media (min-width: 640px) {
  .form-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group {
  display: flex;
  flex-direction: column;
}
.form-group label {
  font-weight: 600;
  color: #475569;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}
.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
}
.form-group textarea {
  min-height: 80px;
}

/* Editable Products Table */
.items-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}
.items-table th,
.items-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}
.items-table th {
  background-color: #f1f5f9;
}
.editable-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
}
.btn-remove {
  background-color: #fef2f2;
  color: #ef4444;
  border: 1px solid #fecaca;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
}
.btn-remove:hover {
  background-color: #fee2e2;
}

.add-product-btn {
  margin-top: 1rem;
}

.invoice-total {
  font-size: 1.5rem;
  font-weight: 700;
  text-align: right;
  margin-top: 1.5rem;
  color: #059669;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.alert-success {
  background-color: #d1fae5;
  color: #059669;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  text-align: center;
}

.alert-danger {
  background-color: #fee2e2;
  color: #dc2626;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  text-align: center;
}
</style>
