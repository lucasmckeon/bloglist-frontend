import axios from 'axios';
const baseUrl = '/api/blogs';
import { token } from './token.js';
const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};
const createBlog = async (blog) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

export { getAll, createBlog };
