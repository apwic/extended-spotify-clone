import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-type": "application/x-www-form-urlencoded"
  }
});