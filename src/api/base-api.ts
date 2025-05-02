import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const baseApi = axios.create({
  baseURL: process.env.BASE_API,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.SAMSARA_API_KEY}`,
  },
  withCredentials: true,
});

export default baseApi;
