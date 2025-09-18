import axios from "axios";

const getProducts = async (route, limit) => {
  const url = limit
    ? `http://localhost:3000/${route}?limit=${limit}`
    : `http://localhost:3000/${route}`;
  const res = await axios.get(url);
  return res.data;
};

export default getProducts;
