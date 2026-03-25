import axios from "axios";

const API = axios.create({
  baseURL: "https://pwdreset-server.netlify.app/api"
});

export default API;