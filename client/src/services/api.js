import axios from "axios";

const API = axios.create({
  baseURL: "https://hr-recruitment-assistant.onrender.com/api",
});

export default API;