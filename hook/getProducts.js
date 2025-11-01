import axios from "axios";

const getProducts = async (route, limit) => {
  const url = limit ? `/${route}?limit=${limit}` : `/${route}`;
  const res = await axios.get(url);
  return res.data;
};

export default getProducts;
