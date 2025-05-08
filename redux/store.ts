import { configureStore } from "@reduxjs/toolkit";
import movieDetail from "./movies/movieDetailSlice";
import movieSearch from "./movies/movieSearchSlice";
import movies from "./movies/movieSlice";

export const store = configureStore({
  reducer: {
    movies: movies,
    movieSearch: movieSearch,
    movieDetail: movieDetail,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
