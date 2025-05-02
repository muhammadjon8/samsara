import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const baseURL = process.env.BASE_API;
const apiKey = process.env.SAMSARA_API_KEY;

if (!baseURL || !apiKey) {
  console.error("BASE_API or SAMSARA_API_KEY is not defined.");
  throw new Error("Environment variables are not properly defined.");
}

console.log("API Base URL:", baseURL);

const baseApi = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
  withCredentials: true,
});

export default baseApi;
