import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://voyance.azurewebsites.net/",
});

axiosInstance.defaults.withCredentials = true;
