import axios from "axios";

export const Axios = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});
 
/*Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);*/