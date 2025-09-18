const { default: axios } = require("axios");

const getProduct = async (key) => {
  const res = await axios.get(`http://localhost:3000/api/products/${key}`);
  return res.data;
};
export default getProduct;
