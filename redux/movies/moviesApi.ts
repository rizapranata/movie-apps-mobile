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
      const response = await tmdbApi.get("movie/now_playing", {
        params: {
          API_KEY,
          page,
        },
      });
      return {
        results: response.data.results,
        page: response.data.page,
        total_pages: response.data.total_pages,
      };
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const fetchDynamicLinkMovies = createAsyncThunk(
  "tmdb/fetchMovies",
  async ({ path, page }: FetchParams, thunkApi) => {
    console.log("pagess:", page);

    try {
      const response = await tmdbApi.get(path, {
        params: {
          API_KEY,
          page,
        },
      });
      return {
        results: response.data.results,
        page: response.data.page,
        total_pages: response.data.total_pages,
      };
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const fetchTopRatedMovies = createAsyncThunk(
  "/movie/top_rated",
  async (page: 1, thunkApi) => {
    try {
      const response = await tmdbApi.get("movie/top_rated", {
        params: {
          API_KEY,
          page,
        },
      });
      return {
        results: response.data.results,
        page: response.data.page,
        total_pages: response.data.total_pages,
      };
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const fetchDetailMovie = createAsyncThunk(
  "/movie/:id",
  async (id: number, thunkApi) => {
    try {
      const response = await tmdbApi.get(`/movie/${id}`, {
        params: {
          API_KEY,
          language: "en-US",
        },
      });
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const fetchSearchMovies = createAsyncThunk(
  "movies/fetch",
  async (query: string, thunkApi) => {
    try {
      const response = await tmdbApi.get(`/search/movie`, {
        params: {
          query,
          API_KEY,
        },
      });
      return response.data.results;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const fetchReviewsMovie = createAsyncThunk(
  "reviews/movie",
  async (id: number, thunkApi) => {
    try {
      const response = await tmdbApi.get(`/movie/${id}/reviews`, {
        params: {
          API_KEY,
          language: "en-US",
        },
      });
      return response.data.results;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const fetchCreditsMovie = createAsyncThunk(
  "credits/movie",
  async (id: number, thunkApi) => {
    try {
      const response = await tmdbApi.get(`/movie/${id}/credits`, {
        params: {
          API_KEY,
          language: "en-US",
        },
      });
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
