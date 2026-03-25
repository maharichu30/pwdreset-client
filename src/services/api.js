import axios from "axios";

const API = axios.create({
  baseURL: "https://pwdreset-server-production.up.railway.app/api"
});

export default API;