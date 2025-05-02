// src/services/tmdbApi.ts
import axios from "axios";

const ACCESS_TOKEN = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NmRlNjg2ZjlhNjc3YmQ4MjRhY2EzMThjMjhmZDUwZCIsIm5iZiI6MTc0MDk5NzU4Ny42LCJzdWIiOiI2N2M1ODNkM2EzMjc3YWI0YTFlNzZkZWEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.F8DYKF9u-Z8qmuNlTsisaAj-1S4RG6hZrMIrq8pFYwk`;
const API_KEY = `66de686f9a677bd824aca318c28fd50d`;

const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: ACCESS_TOKEN,
    "Content-Type": "application/json",
  },
});

export default tmdbApi;
