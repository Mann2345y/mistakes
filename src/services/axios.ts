import axios from "axios";

const API_BASE_URL = "https://mistakes.streamnft.tech";

export const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/mistakes`,
  withCredentials: true,
});

export const fetchData = async (endpoint: string) => {
  try {
    const response = await axiosInstance.get(`${endpoint}`);

    return response;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
};

export const postData = async (endpoint: string, data: any) => {
  try {
    const response = await axiosInstance.post(`${endpoint}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
