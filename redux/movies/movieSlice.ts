import { createSlice } from "@reduxjs/toolkit";
import { PlayNowMovies } from "../models/moviesPlayNow.Model";
import { fetchNowPlayingMovies } from "./moviesApi";

interface MovieState {
  moviesPlayNow: PlayNowMovies;
  loading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  moviesPlayNow: {
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
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchNowPlayingMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNowPlayingMovies.fulfilled, (state, action) => {
        state.moviesPlayNow = action.payload;
        state.loading = false;
      })
      .addCase(fetchNowPlayingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default moviesSlice.reducer;
