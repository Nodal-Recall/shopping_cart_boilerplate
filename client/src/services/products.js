import axios from "axios";
const baseUrl = "/api"

const getAll = async () => {
  try {
    const response = await axios.get(`${baseUrl}/products`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

const create = async (newProduct) => {
  try {
    const response = await axios.post(`${baseUrl}/products`, newProduct);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

const update = async (id, updatedProduct) => {
  try {
    const response = await axios.put(`${baseUrl}/products/${id}`, updatedProduct);
    return response.data;
  } catch(e) {
    console.log(e);
  }
};

const deleteProduct = async (id) => {
  try {
    await axios.delete(`${baseUrl}/products/${id}`);
  } catch(e) {
    console.log(e);
  }
};

const products = {
  getAll,
  create,
  update,
  deleteProduct
}

export default products;

