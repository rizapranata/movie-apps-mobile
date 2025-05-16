import tmdbApi from "@/services/tmdbApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

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
          language: "en-US",
        },
      });
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
