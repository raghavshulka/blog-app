import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5050/api/v1" 
});

export default axiosInstance;
