import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:4000", // Rails API 주소
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
