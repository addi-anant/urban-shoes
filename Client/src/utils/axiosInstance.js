import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://urbanapi.azurewebsites.net",
});

axiosInstance.defaults.withCredentials = true;
