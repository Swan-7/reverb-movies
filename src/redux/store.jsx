import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./moviesSlice";
import searchReducer from "./searchSlice";

// Create a redux store
const store = configureStore({
  reducer: {
    movies: moviesReducer,
    search: searchReducer,
  },
});

export default store;
