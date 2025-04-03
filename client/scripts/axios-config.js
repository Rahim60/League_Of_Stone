import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.100:5000", // Remplace par ton IP locale
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
