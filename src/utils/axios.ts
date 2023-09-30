import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export default api;
