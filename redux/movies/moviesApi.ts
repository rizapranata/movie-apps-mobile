import tmdbApi from "@/services/tmdbApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = `66de686f9a677bd824aca318c28fd50d`;

type FetchParams = {
  path: string;
  page?: number;
};

export const fetchNowPlayingMovies = createAsyncThunk(
  "tmdb/fetchMovies",
  async (page: 1, thunkApi) => {
    try {
      const response = tmdbApi.get("movie/now_playing", {
        params: {
          API_KEY,
          page,
        },
      });
      return (await response).data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const fetchDynamicLinkMovies = createAsyncThunk(
  "tmdb/fetchMovies",
  async ({ path, page = 1 }: FetchParams, thunkApi) => {
    try {
      const response = tmdbApi.get(path, {
        params: {
          API_KEY,
          page,
        },
      });
      return (await response).data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const fetchTopRatedMovies = createAsyncThunk(
  "/movie/top_rated",
  async (page: 1, thunkApi) => {
    try {
      const response = tmdbApi.get("movie/top_rated", {
        params: {
          API_KEY,
          page,
        },
      });
      return (await response).data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
