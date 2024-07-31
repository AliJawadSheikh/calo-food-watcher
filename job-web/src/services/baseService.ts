import { axiosInstance } from './api/axiosConfig';

export const get = <T>(url: string): Promise<T> => {
  return axiosInstance.get(url);
};

export const post = <T>(url: string, data: any): Promise<T> => {
  return axiosInstance.post(url, data);
};
