import axios from "axios";

const USERS_API = "https://dummyjson.com/users";

export const fetchUsers = async () => {
  const res = await axios.get(USERS_API);
  return res.data.users;
};

export const fetchUser = async (id: number) => {
  const res = await axios.get(`${USERS_API}/${id}`);
  return res.data;
};

export const createUser = async (data: {
  firstName: string;
  lastName: string;
  email: string;
}) => {
  const res = await axios.post(USERS_API, data);
  return res.data;
};

export const updateUser = async (
  id: number,
  data: { firstName: string; lastName: string; email: string },
) => {
  const res = await axios.put(`${USERS_API}/${id}`, data);
  return res.data;
};

export const deleteUser = async (id: number) => {
  const res = await axios.delete(`${USERS_API}/${id}`);
  return res.data;
};
