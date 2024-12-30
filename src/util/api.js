import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  // baseURL: "https://chiecnonbe.onrender.com/api/v1",
  baseURL: "http://localhost:3002/api/v1",
});

export default instance;
