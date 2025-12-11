import { axiosInstance } from "./apiConfig";

// Define optional About payload type
export interface AboutPayload {
  title?: string;
  description?: string;
  image?: string;
}

// ---------------- CREATE ABOUT ----------------
export const CreateAbout = async (
  payload: AboutPayload
): Promise<any> => {
  try {
    const response = await axiosInstance.post(`/About/`, payload);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) return error.message;
    return "Unknown error occurred";
  }
};

// ---------------- GET ALL ABOUT ----------------
export const GetAbout = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/About/`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) return error.message;
    return "Unknown error occurred";
  }
};

// ---------------- GET ABOUT BY ID ----------------
export const GetAboutById = async (
  id: string
): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/About/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) return error.message;
    return "Unknown error occurred";
  }
};

// ---------------- UPDATE ABOUT ----------------
export const UpdateAbout = async (
  id: string,
  payload: AboutPayload
): Promise<any> => {
  try {
    const response = await axiosInstance.put(`/About/${id}`, payload);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) return error.message;
    return "Unknown error occurred";
  }
};

// ---------------- DELETE ABOUT ----------------
export const DeleteAbout = async (
  id: string
): Promise<any> => {
  try {
    const response = await axiosInstance.delete(`/About/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) return error.message;
    return "Unknown error occurred";
  }
};
