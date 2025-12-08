import { axiosInstance } from "./apiConfig";

// Create About
export const CreateAbout = async (payload) => {
  try {
    const response = await axiosInstance.post(`/About/`, payload);
    return response.data;
  } catch (error) {
    return error.message; // You may want better error handling (e.g., error.response.data)
  }
};

// Get all About entries
export const GetAbout = async () => {
  try {
    const response = await axiosInstance.get(`/About/`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// Get About by ID
export const GetAboutById = async (id) => {
  try {
    const response = await axiosInstance.get(`/About/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// Update About
export const UpdateAbout = async (id, payload) => {
  try {
    const response = await axiosInstance.put(`/About/${id}`, payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// Delete About
export const DeleteAbout = async (id) => {
  try {
    const response = await axiosInstance.delete(`/About/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
