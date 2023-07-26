import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./moviesSlice";

// Create a redux store
const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
});

export default store;
