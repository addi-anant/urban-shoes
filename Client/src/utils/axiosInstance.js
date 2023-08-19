import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://urbanAPI.onrender.com/",
});

axiosInstance.defaults.withCredentials = true;
