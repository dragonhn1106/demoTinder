import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://randomuser.me/',
  header: {
    'Content-Type': 'application/json',
  },
});

//Interceptor
// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient;
