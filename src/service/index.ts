import axios from "axios";
import jwt from "jwt-decode";

import { toast } from "react-toastify";
// import { ROLE } from "../common/constant";
const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
 });

instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    if (response.config.method !== "get") {
      if (!response.request.responseURL.includes("/login")) {
        toast.success(response.data.message);
      } else {
        if (response.data) {
          const payload: any = jwt(response.data.data || "");
          //   if (payload?.role === ROLE.PUBLIC) {
          //     toast.error("You are not an admin.");
          //     localStorage.clear();
          //   } else {
          //     toast.success(response.data.message);
          //   }
          toast.success(response.data.message);
        }
      }
    }
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      alert("You have logged out, please log in again.");
      window.location.href = "/login";
      return;
    }
    toast.error(error.response.data?.message || "An error occurred.");
    return Promise.reject(error);
  }
);

export default instance;
