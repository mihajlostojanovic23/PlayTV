import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

export let axiosInstance: AxiosInstance | null = null;

export const createAxiosInstance = (): void => {
  axiosInstance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
  });
};

const request = async ({ ...options }) => {
  const onSuccess = (response: AxiosResponse) => response;
  const onError = (error: AxiosError) => {
    // DISPLAY API ERROR MESSAGES ON DEV ENVIRONMENT
    if (process.env.NODE_ENV === "development") {
      if (error.response) {
        // Request was made but server responded with something
        // other than 2xx
        console.error("Status:", error.response.status);
        console.error("Data:", error.response.data);
        console.error("Headers:", error.response.headers);
      } else {
        // Something else happened while setting up the request
        // triggered the error
        console.error("Error Message:", error.message);
      }

      return Promise.reject(error.response || error.message);
    }
  };

  return axiosInstance!(options).then(onSuccess).catch(onError);
};

export default request;
