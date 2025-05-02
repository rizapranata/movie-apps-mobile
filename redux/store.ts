import { configureStore } from "@reduxjs/toolkit";
import moviesPlayNow from "./movies/movieSlice";

export const store = configureStore({
  reducer: {
    moviesPlayNow: moviesPlayNow,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
