import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import queryString from "query-string";
import utils from "../utils";

// Add to env
const baseURL = "http://146.190.98.185:8080";
const version = "/v1";

const privateClient = axios.create({
  baseURL: baseURL + version,
});

privateClient.interceptors.request.use(async (config) => {
  const jsonValue = await AsyncStorage.getItem("token");
  // const { token } = JSON.parse(jsonValue);

  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVzZXJfaWQiOjEsInJvbGUiOiJ1c2VyIn0sImV4cCI6MTY3MzI2MTE5MCwiaWF0IjoxNjcyNjU2MzkwfQ.aAcI8uuOMbqkSlj2Kvm2dZMKljs3HXnXzTREhnmVaTM`,
      // Authorization: `Bearer ${token}`,
    },
  };
});

privateClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    throw err.response.data;
  }
);

export default privateClient;
