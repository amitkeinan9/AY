import axios from "axios";
export const backendAxiosInstance = axios.create({
  baseURL: "/api",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

backendAxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/auth/refresh"
    ) {
      originalRequest._retry = true;
      const { accessToken, refreshToken } = (
        await backendAxiosInstance.get("/auth/refresh", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("refreshToken"),
          },
        })
      ).data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
      originalRequest.headers["Authorization"] = "Bearer " + accessToken;
      return backendAxiosInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);
