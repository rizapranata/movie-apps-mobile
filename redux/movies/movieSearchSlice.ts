import { createSlice } from "@reduxjs/toolkit";
import { MoviesItem } from "../models/moviesModel";
import { fetchSearchMovies } from "./moviesApi";

interface MovieSearchState {
  movies: MoviesItem[];
  loading: boolean;
  error: string | null;
}

const initialState: MovieSearchState = {
  movies: [],
  loading: false,
  error: null,
};

const movieSearchSlice = createSlice({
  name: "movieSearch",
  initialState,
  reducers: {
    resetMovies: (state) => {
      state.movies = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchSearchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      });
  },
});

export const { resetMovies } = movieSearchSlice.actions;
export default movieSearchSlice.reducer;
