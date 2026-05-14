import axios from "axios";

const API = axios.create({
  // Use '/api' for development (proxy in package.json), or REACT_APP_API_BASE_URL for production
  baseURL: process.env.REACT_APP_API_BASE_URL || "/api",
  withCredentials: true, // send cookies for auth
});

export default API;