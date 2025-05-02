import tmdbApi from "@/services/tmdbApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = `66de686f9a677bd824aca318c28fd50d`;

export const fetchNowPlayingMovies = createAsyncThunk(
  "/movie/now_playing",
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
