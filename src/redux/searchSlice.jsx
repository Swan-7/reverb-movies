import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../apis/movieApi";
import { API_KEY } from "../apis/movieApiKey";

 export const searchMovies = createAsyncThunk(
   "search/searchMovies",
   async (query) => {
     const fetchUrl = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}`;
     const request = await axios.get(fetchUrl);
     const { data, status } = request;
     return { data, statusCode: status };
   }
 );

 const searchSlice = createSlice({
   name: "search",
   initialState: {
     searchResults: [],
     statusCode: null,
   },
   reducers: {},
   extraReducers: (builder) => {
     builder.addCase(searchMovies.fulfilled, (state, { payload }) => {
       state.searchResults = payload?.data?.results ?? [];
       state.statusCode = payload.statusCode;
     });
   },
 });


export const getSearchResults = (state) => state.search.searchResults;

export default searchSlice.reducer;