import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users";

//! get all Users 
export const getUsers = async (id) => {
  const url = id ? `${API_URL}/${id}` : API_URL;
  const response = await axios.get(url);
  return response.data; // Axios returns the data in the `data` field
};

//! create new User
export const createUser = async (userData) => {
  const response = await axios.post(API_URL, userData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data; // Return the created user
};

//! update User
export const updateUser = async (userData) => {
  const response = await axios.put(`${API_URL}/${userData.id}`, userData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data; // Return the updated user
};

//! delete User
export const deletedUser = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);

  if (response.status !== 200) {
    throw new Error(`Failed to delete user: ${response.status}`);
  }

  return response.data; // Axios typically returns empty data for DELETE requests
};
