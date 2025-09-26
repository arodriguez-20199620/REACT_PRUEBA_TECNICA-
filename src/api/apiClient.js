import axios from "axios";

export const api = axios.create({
  baseURL: "http://35.93.187.118:5000/api/",
  withCredentials: true,
});
