import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://urbanapi.onrender.com/",
});

axiosInstance.defaults.withCredentials = true;
