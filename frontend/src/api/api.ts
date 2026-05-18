import axios from "axios";

const API = axios.create({
  baseURL: "https://smart-leads-backend-n3sz.onrender.com",
});

export default API;