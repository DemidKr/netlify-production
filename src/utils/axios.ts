import axios from "axios";

const api = () => {
  // const token = localStorage.getItem("access_token") ?? "12331";

  return axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: false,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      // bearer: token,
    },
  });
};

export default api;
