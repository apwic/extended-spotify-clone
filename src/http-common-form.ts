import axios from "axios";

axios.defaults.withCredentials = true;
export default axios.create({
  baseURL: "http://localhost:1356",
  headers: {
    "Content-type": "multipart/form-data"
  }
});