import { axiosInstance } from './apiConfig';

// add a notification  
export const AddNotficaations = async (data: any) => {
  try {
    const response = await axiosInstance.post("/api/notifications/notify", data);
    return response.data;
  } catch (error: any) {
    return error.response?.data;
  }
};

// get all notifications by user
export const GetAllNotifications = async () => {
  try {
    const response = await axiosInstance.get("/api/notifications/get-all-notifications");
    return response.data;
  } catch (error: any) {
    return error.response?.data;
  }
};

// delete notification
export const DeleteNotifications = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/api/notifications/dalete-notfications/${id}`);
    return response.data;
  } catch (error: any) {
    return error.response?.data;
  }
};

// read all notifications
export const ReadAllNotifications = async () => {
  try {
    const response = await axiosInstance.put("/api/notifications/read-all-notifications");
    return response.data;
  } catch (error: any) {
    return error.response?.data;
  }
};
