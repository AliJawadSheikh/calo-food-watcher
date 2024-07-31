import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

/**
 * Create and configure an Axios instance with base URL and headers.
 * Configures Axios with default headers and an authorization token.
 */
const createAxiosInstance = (): AxiosInstance => {
  const baseURL =
    process.env.REACT_APP_API_URL || 'http://localhost:3001/api/v1';

  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      config.headers['Authorization'] = `Bearer ${
        process.env.REACT_APP_DEFAULT_ACCESS_TOKEN || ''
      }`;
      return config;
    },
    (error) => Promise.reject(error)
  );

  return instance;
};

/**
 * Handle successful responses from Axios.
 * Extracts and returns data from the Axios response.
 */
const handleSuccess = (response: AxiosResponse) => response.data;

/**
 * Handle errors from Axios responses.
 * Extracts error code and message, then rejects the promise with them.
 */
const handleError = (error: any) => {
  const { response } = error;
  let errorCode = 500;
  let errorMessage = 'An unexpected error occurred.';

  if (response) {
    errorCode = response.status;
    errorMessage = response.data.message || response.statusText;
  }

  return Promise.reject({ code: errorCode, message: errorMessage });
};

// Initialize Axios instance and set up response interceptors
const axiosInstance = createAxiosInstance();
axiosInstance.interceptors.response.use(handleSuccess, handleError);

export { axiosInstance };
