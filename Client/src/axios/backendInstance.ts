import axios from "axios";

export const backendAxiosInstance = axios.create({
  baseURL: "/api"
});

backendAxiosInstance.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem("accessToken")}`;

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

backendAxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (!originalRequest._retry) {
      originalRequest._retry = 0;
    }

    if (
      error.response.status === 401 &&
      originalRequest._retry < 1 &&
      originalRequest.url !== "/auth/refresh"
    ) {
      originalRequest._retry++;
      const { accessToken, refreshToken } = (
        await backendAxiosInstance.get("/auth/refresh", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("refreshToken"),
          },
        })
      ).data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      return backendAxiosInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);
