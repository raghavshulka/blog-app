import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://himanshu-blog.onrender.com/api/v1" 
});

export default axiosInstance;
