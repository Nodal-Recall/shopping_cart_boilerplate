import axios from "axios";
const baseUrl = "/api"

const getAll = async () => {
  try {
    const response = await axios.get(`${baseUrl}/cart`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

const add = async (id) => {
  try {
    const response = await axios.post(`${baseUrl}/add-to-cart`, { productId: id });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

const clear = async () => {
  try {
    await axios.post(`${baseUrl}/checkout`);
  } catch(e) {
    console.log(e);
  }
};

const products = {
  getAll,
  add,
  clear,
}

export default products;

