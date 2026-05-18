import axios from "axios";

const API = axios.create({
  baseURL:
    "https://smart-leads-backend-n3sz.onrender.com/api",
});

export default API;