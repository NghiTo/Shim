import axios from "axios";
import { store } from "../store/store";
import { clearUser } from "../store/userReducer";
import { getNewAccessToken } from "../apis/auth.api";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

type FailedRequest = {
  resolve: (value: string) => void;
  reject: (error: unknown) => void;
};

let isRefreshing = false;
const failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token: string | null) => {
  while (failedQueue.length > 0) {
    const { resolve, reject } = failedQueue.shift()!;
    if (token) {
      resolve(token);
    } else {
      reject(error);
    }
  }
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      Object.defineProperty(originalRequest, "_retry", {
        value: true,
        writable: true,
        configurable: true,
      });

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => axiosInstance(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        await getNewAccessToken();
        processQueue(null, "Token refreshed successfully");
        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        store.dispatch(clearUser());
        localStorage.clear();
        if (window.confirm("Your login session has expired")) {
          window.location.href = "/login";
        } else {
          window.location.href = "/";
        }
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
