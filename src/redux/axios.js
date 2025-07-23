import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://berrybazaar.co.in/admin/Application-API/web-services.php",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export default axiosInstance;
