import axios from "axios";

const API = axios.create({
  baseURL: "https://pwdreset-server.onrender.com/api"
});

export default API;