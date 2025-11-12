import axios from "axios";
import { toast } from "sonner";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response ?? {};
    switch (status) {
      case 201:
      case 204:
        toast.info(error.response);
        break;
      case 401:
        throw error.response.data;
      default:
        throw error.response.data;
    }
  }
);
