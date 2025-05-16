// src/services/tmdbApi.ts
import axios from "axios";

const ACCESS_TOKEN = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NmRlNjg2ZjlhNjc3YmQ4MjRhY2EzMThjMjhmZDUwZCIsIm5iZiI6MTc0MDk5NzU4Ny42LCJzdWIiOiI2N2M1ODNkM2EzMjc3YWI0YTFlNzZkZWEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.F8DYKF9u-Z8qmuNlTsisaAj-1S4RG6hZrMIrq8pFYwk`;
const API_KEY = `66de686f9a677bd824aca318c28fd50d`;

const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json",
  },
});

tmdbApi.interceptors.request.use(
  async (config) => {
    // const token = await AsyncStorage.getItem('token'); // React Native
    // const token = localStorage.getItem("token"); // React Web
    const token = ACCESS_TOKEN;

    config.params = {
      ...(config.params || {}),
      api_key: API_KEY,
    };

    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

tmdbApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("api error", error);
    return Promise.reject(error);
  }
);

// Request Interceptor: tambahkan Authorization header
// tmdbApi.interceptors.request.use(
//   async (config) => {
//     // const token = await AsyncStorage.getItem('token'); // React Native
//     const token = localStorage.getItem("token"); // React Web
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// Response Interceptor: handle unauthorized (token expired)
// tmdbApi.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       // Bisa logout user, redirect ke login, atau refresh token
//       console.warn("Token expired. Redirect to login...");
//       await localStorage.removeItem("token");
//       // await AsyncStorage.removeItem('token');
//       // navigation.navigate('Login'); // Gunakan navigation jika ada
//     }
//     return Promise.reject(error);
//   }
// );

export default tmdbApi;
