import { createSlice } from "@reduxjs/toolkit";
import { Review } from "../models/movieReviewModel";
import { MovieDetail } from "../models/moviesDetailModel";
import { MoviesItem } from "../models/moviesModel";
import {
  fetchDetailMovie,
  fetchDynamicLinkMovies,
  fetchReviewsMovie,
  fetchTopRatedMovies,
} from "./moviesApi";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    moviesDynamicLink: [] as MoviesItem[],
    moviesTopRated: [] as MoviesItem[],
    movieDetail: {} as MovieDetail,
    movieReviews: [] as Review[],
    loading: true,
    loadingMoviesDynamicLink: false,
    pageMoviesTopRated: 1,
    pageMoviesDynamicLink: 1,
    totalPageMoviesTopRated: 1,
    totalPagesMoviesDynamicLink: 1,
    error: null as string | null,
  },
  reducers: {
    resetMovies(state) {
      state.moviesDynamicLink = [];
      state.pageMoviesTopRated = 1;
      state.pageMoviesDynamicLink = 1;
      state.totalPageMoviesTopRated = 1;
      state.totalPagesMoviesDynamicLink = 1;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchDynamicLinkMovies.pending, (state) => {
        state.loadingMoviesDynamicLink = true;
        state.error = null;
      })
      .addCase(fetchDynamicLinkMovies.fulfilled, (state, action) => {
        (state.moviesDynamicLink =
          action.payload.page === 1
            ? action.payload.results
            : [...state.moviesDynamicLink, ...action.payload.results]),
          (state.pageMoviesDynamicLink = action.payload.page + 1);
        state.totalPagesMoviesDynamicLink = action.payload.total_pages;
        state.loadingMoviesDynamicLink = false;
      })
      .addCase(fetchDynamicLinkMovies.rejected, (state, action) => {
        state.loadingMoviesDynamicLink = false;
        state.error = action.payload as string | null;
      })
      .addCase(fetchTopRatedMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
        state.moviesTopRated = action.payload.results;
        state.pageMoviesTopRated = action.payload.page + 1;
        state.totalPageMoviesTopRated = action.payload.total_pages;
        state.loading = false;
      })
      .addCase(fetchTopRatedMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null;
      })
      .addCase(fetchDetailMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDetailMovie.fulfilled, (state, action) => {
        state.movieDetail = action.payload;
        state.loading = false;
      })
      .addCase(fetchDetailMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null;
      })
      .addCase(fetchReviewsMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviewsMovie.fulfilled, (state, action) => {
        state.movieReviews = action.payload;
        state.loading = false;
      })
      .addCase(fetchReviewsMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null;
      });
  },
});

export default moviesSlice.reducer;
