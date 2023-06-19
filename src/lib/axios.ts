import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

//in this app this is not needed since the server shares the same baseURL as the client
