import axios from "axios";

const API_BASE =
  process.env.VUE_APP_API_URL || "https://fidel-of6u.onrender.com/api";

export const getProducts = () => axios.get(`${API_BASE}/products`);
export const getProduct = (id: string) =>
  axios.get(`${API_BASE}/products/${id}`);
export const createProduct = (data: FormData) =>
  axios.post(`${API_BASE}/products`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const updateProduct = (id: string, data: FormData) =>
  axios.put(`${API_BASE}/products/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const deleteProduct = (id: string) =>
  axios.delete(`${API_BASE}/products/${id}`);

export const getOrders = () => axios.get(`${API_BASE}/orders`);
export const getOrder = (id: string) => axios.get(`${API_BASE}/orders/${id}`);
export interface OrderUpdate {
  status?: string;
  total?: number;
  products?: Array<{ product: string; quantity: number }>;
  [key: string]: any;
}
export const updateOrder = (id: string, data: OrderUpdate) =>
  axios.put(`${API_BASE}/orders/${id}`, data);
export const deleteOrder = (id: string) =>
  axios.delete(`${API_BASE}/orders/${id}`);

// Categories API
export const getCategories = () => axios.get(`${API_BASE}/categories`);
export const getCategory = (id: string) =>
  axios.get(`${API_BASE}/categories/${id}`);
export const createCategory = (data: { name: string; description?: string }) =>
  axios.post(`${API_BASE}/categories`, data);
export const updateCategory = (
  id: string,
  data: { name: string; description?: string }
) => axios.put(`${API_BASE}/categories/${id}`, data);
export const deleteCategory = (id: string) =>
  axios.delete(`${API_BASE}/categories/${id}`);

export const login = (username: string, password: string) =>
  axios.post(`${API_BASE}/admin/login`, { username, password });
