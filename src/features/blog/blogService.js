import axios from "axios";
import { config } from "../../utils/axiosConfig";
import { URL } from "../../utils/URL";

const getBlogs = async () => {
  const res = await axios.get(`${URL}/blog`);
  return res.data;
};

const createBlog = async (data) => {
  const response = await axios.post(`${URL}/blog`, data, config);
  return response.data;
};

const getABlog = async (id) => {
  const response = await axios.get(`${URL}/blog/${id}`, config);
  return response.data;
};

const updateABlog = async (blog) => {
  const response = await axios.put(
    `${URL}/blog/${blog.id}`,
    { title: blog.blogData.title },
    config
  );
  return response.data;
};

const deleteBlog = async (id) => {
  const response = await axios.delete(`${URL}/blog/${id}`, config);
  return response.data;
};

const blogService = {
  getBlogs,
  createBlog,
  getABlog,
  deleteBlog,
  updateABlog,
};

export default blogService;
