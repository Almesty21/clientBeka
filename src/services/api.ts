import { axiosInstance } from "./apiConfig";

// Define About type (optional - adjust to your real fields)
export interface AboutPayload {
  title: string;
  description: string;
  image?: string;
}

// ------------------- CREATE ABOUT -------------------
export const CreateAbout = async (
  payload: AboutPayload
): Promise<any> => {
  try {
    const response = await axiosInstance.post(`/about/`, payload);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) return error.message;
    return "Unknown error occurred";
  }
};

// ------------------- GET ALL ABOUT -------------------
export const GetAbout = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/about/`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) return error.message;
    return "Unknown error occurred";
  }
};

// ------------------- GET ABOUT BY ID -------------------
export const GetAboutById = async (
  id: string
): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/about/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) return error.message;
    return "Unknown error occurred";
  }
};

// ------------------- UPDATE ABOUT -------------------
export const UpdateAbout = async (
  id: string,
  payload: AboutPayload
): Promise<any> => {
  try {
    const response = await axiosInstance.put(`/about/${id}`, payload);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) return error.message;
    return "Unknown error occurred";
  }
};

// ------------------- DELETE ABOUT -------------------
export const DeleteAbout = async (
  id: string
): Promise<any> => {
  try {
    const response = await axiosInstance.delete(`/about/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) return error.message;
    return "Unknown error occurred";
  }
};
