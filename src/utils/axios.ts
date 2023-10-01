import axios from "axios";

const api = () => {
  const token = localStorage.getItem("access_token") ?? "12331";

  return axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    // withCredentials: false,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "*/*",
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

export default api;
