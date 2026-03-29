import axios from "axios";

const POSTS_API = "https://dummyjson.com/posts";

export const fetchPosts = async () => {
  const res = await axios.get(POSTS_API);
  return res.data.posts;
};

export const fetchPost = async (id: number) => {
  const res = await axios.get(`${POSTS_API}/${id}`);
  return res.data;
};

export const createPost = async (data: { title: string; body: string }) => {
  const res = await axios.post(POSTS_API, data);
  return res.data;
};

export const updatePost = async (
  id: number,
  data: { title: string; body: string },
) => {
  const res = await axios.put(`${POSTS_API}/${id}`, data);
  return res.data;
};

export const deletePost = async (id: number) => {
  const res = await axios.delete(`${POSTS_API}/${id}`);
  return res.data;
};
