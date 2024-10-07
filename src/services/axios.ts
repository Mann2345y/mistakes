import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://mistakes.streamnft.tech";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const fetchData = async (endpoint: string) => {
  const response = await axiosInstance.get(`${endpoint}`);

  return response.data;
};

export const postData = async (endpoint: string, data: any) => {
  const response = await axiosInstance.post(`${endpoint}`, data);
  return response.data;
};
