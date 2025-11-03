import { axiosInstance } from "./apiConfig";

// Create About
export const CreateAbout = async (payload) => {
  try {
    const response = await axiosInstance.post(`/about/`, payload);
    return response.data;
  } catch (error) {
    return error.message; // You may want better error handling (e.g., error.response.data)
  }
};

// Get all About entries
export const GetAbout = async () => {
  try {
    const response = await axiosInstance.get(`/about/`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// Get About by ID
export const GetAboutById = async (id) => {
  try {
    const response = await axiosInstance.get(`/about/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// Update About
export const UpdateAbout = async (id, payload) => {
  try {
    const response = await axiosInstance.put(`/about/${id}`, payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// Delete About
export const DeleteAbout = async (id) => {
  try {
    const response = await axiosInstance.delete(`/about/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
