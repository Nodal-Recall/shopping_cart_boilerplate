import axios from "axios";
const baseUrl = "/api"

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${baseUrl}/products`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const createProduct = async (newProduct) => {
  try {
    const response = await axios.post(`${baseUrl}/products`, newProduct);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const updateProduct = async (id, updatedProduct) => {
  try {
    const response = await axios.put(`${baseUrl}/products/${id}`, updatedProduct);
    return response.data;
  } catch(e) {
    console.log(e);
  }
};

export const deleteProduct = async (id) => {
  try {
    await axios.delete(`${baseUrl}/products/${id}`);
  } catch(e) {
    console.log(e);
  }
};

export const getAllItems = async () => {
  try {
    const response = await axios.get(`${baseUrl}/cart`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const addItem = async (id) => {
  try {
    const response = await axios.post(`${baseUrl}/add-to-cart`, { productId: id });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const clearCart = async () => {
  try {
    await axios.post(`${baseUrl}/checkout`);
  } catch(e) {
    console.log(e);
  }
};
