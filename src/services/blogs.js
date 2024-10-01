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

const updateBlog = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog);
  return response.data;
};

const deleteBlog = async (blog) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config);
  return response.data;
};

export { getAll, createBlog, updateBlog, deleteBlog };
