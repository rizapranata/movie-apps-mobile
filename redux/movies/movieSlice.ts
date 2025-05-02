import { createSlice } from "@reduxjs/toolkit";
import { Movies } from "../models/moviesModel";
import { fetchDynamicLinkMovies, fetchTopRatedMovies } from "./moviesApi";

interface MovieState {
  moviesTopRated: Movies;
  moviesDynamicLink: Movies;
  loading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  moviesTopRated: {
    dates: {
      maximum: new Date().toISOString(),
      minimum: new Date().toISOString(),
    },
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  loading: false,
  error: null,
  moviesDynamicLink: {
    dates: {
      maximum: new Date().toISOString(),
      minimum: new Date().toISOString(),
    },
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchDynamicLinkMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDynamicLinkMovies.fulfilled, (state, action) => {
        state.moviesDynamicLink = action.payload;
        state.loading = false;
      })
      .addCase(fetchDynamicLinkMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchTopRatedMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
        state.moviesTopRated = action.payload;
        state.loading = false;
      })
      .addCase(fetchTopRatedMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default moviesSlice.reducer;
