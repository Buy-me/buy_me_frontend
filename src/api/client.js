import axios from "axios";
import queryString from "query-string";

// Add to env
const baseURL = "http://146.190.98.185:8080";
const version = "/v1";

const privateClient = axios.create({
  baseURL: baseURL + version,
});

privateClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVzZXJfaWQiOjEsInJvbGUiOiJ1c2VyIn0sImV4cCI6MTY3MjYyODI2OCwiaWF0IjoxNjcyMDIzNDY4fQ.cLxxsKc1LGSW3wgaMc7sjmFXwbXld3XsvBu90JEm5is`,
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
