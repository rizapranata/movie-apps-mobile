import { configureStore } from "@reduxjs/toolkit";
import movies from "./movies/movieSlice";

export const store = configureStore({
  reducer: {
    movies: movies,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
