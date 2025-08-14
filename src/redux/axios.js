import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://berrybazaar.co.in/admin/Application-API/web-services.php",
  // vitebaseURL: "https://berrybazaar.co.in/admin/Application-API/admin-apis.php",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("Authorization");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    const token = response.data?.token || response.data?.data?.token;
    if (token) {
      localStorage.setItem("Authorization", token);
      console.log("Token saved to localStorage:", token); // debug log
    }
    return response;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
