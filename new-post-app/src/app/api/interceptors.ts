import { apiClient } from "./apiClient";
import { store } from "../store";
import { setAccessToken } from "../../features/auth/authSlice";

let isRefreshing = false;
let failedQueue: any[] = [];

/**
 * Retry queued requests after refresh
 */
const processQueue = (token: string | null) => {
  failedQueue.forEach((prom) => {
    if (token) prom.resolve(token);
    else prom.reject("Session expired");
  });
  failedQueue = [];
};

/**
 * REQUEST INTERCEPTOR
 * Attach access token from Redux
 */
apiClient.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/**
 * RESPONSE INTERCEPTOR
 * Handle 401 → refresh → retry
 */
apiClient.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // if not 401 → normal error
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // prevent infinite loop
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    // If refresh already running → queue requests
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(apiClient(originalRequest));
          },
          reject,
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      // 🍪 Cookie automatically sent
      const res = await apiClient.post(
        "/auth/refresh",
        {},
        { withCredentials: true },
      );

      const newAccessToken = res.data.accessToken;

      // Save new token in Redux
      store.dispatch(setAccessToken(newAccessToken));

      processQueue(newAccessToken);

      // Retry original request
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return apiClient(originalRequest);
    } catch (err) {
      processQueue(null);

      // refresh failed → logout user
      window.location.href = "/auth";
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  },
);
