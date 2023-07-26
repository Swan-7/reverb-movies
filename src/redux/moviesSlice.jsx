import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../apis/MovieApi";
import requests from "../apis/movieApiKey";

export const fetchTrendingMovies = createAsyncThunk(
  "movies/fetchTrendingMovies",
  async () => {
    const fetchUrl = requests.fetchTrending;
    const request = await axios.get(fetchUrl);
    const { data, status } = request;
    return { data, statusCode: status };
  }
);

export const fetchTopRatedMovies = createAsyncThunk(
  "movies/fetchTopRatedMovies",
  async () => {
    const fetchUrl = requests.fetchTopRated;
    const request = await axios.get(fetchUrl);
    const { data, status } = request;
    return { data, statusCode: status };
  }
);

export const fetchActionMovies = createAsyncThunk(
  "movies/fetchActionMovies",
  async () => {
    const fetchUrl = requests.fetchActionMovies;
    const request = await axios.get(fetchUrl);
    const { data, status } = request;
    return { data, statusCode: status };
  }
);

export const fetchComdedyMovies = createAsyncThunk(
  "movies/fetchComdedyMovies",
  async () => {
    const fetchUrl = requests.fetchComdedyMovies;
    const request = await axios.get(fetchUrl);
    const { data, status } = request;
    return { data, statusCode: status };
  }
);

export const fetchHorrorMovies = createAsyncThunk(
  "movies/fetchHorrorMovies",
  async () => {
    const fetchUrl = requests.fetchHorrorMovies;
    const request = await axios.get(fetchUrl);
    const { data, status } = request;
    return { data, statusCode: status };
  }
);

export const fetchRomanceMovies = createAsyncThunk(
  "movies/fetchRomanceMovies",
  async () => {
    const fetchUrl = requests.fetchRomanceMovies;
    const request = await axios.get(fetchUrl);
    const { data, status } = request;
    return { data, statusCode: status };
  }
);

export const fetchDocumentaries = createAsyncThunk(
  "movies/fetchDocumentaries",
  async () => {
    const fetchUrl = requests.fetchDocumentaries;
    const request = await axios.get(fetchUrl);
    const { data, status } = request;
    return { data, statusCode: status };
  }
);

const initialState = {
  trendingMovies: [],
  topRatedMovies: [],
  actionMovies: [],
  comdedyMovies: [],
  horrorMovies: [],
  romanceMovies: [],
  documentaries: [],
  statusCode: null,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingMovies.fulfilled, (state, { payload }) => {
        state.trendingMovies = payload.data.results;
        state.statusCode = payload.statusCode;
      })
      .addCase(fetchTopRatedMovies.fulfilled, (state, { payload }) => {
        state.topRatedMovies = payload.data.results;
        state.statusCode = payload.statusCode;
      })
      .addCase(fetchActionMovies.fulfilled, (state, { payload }) => {
        state.actionMovies = payload.data.results;
        state.statusCode = payload.statusCode;
      })
      .addCase(fetchComdedyMovies.fulfilled, (state, { payload }) => {
        state.comdedyMovies = payload.data.results;
        state.statusCode = payload.statusCode;
      })
      .addCase(fetchHorrorMovies.fulfilled, (state, { payload }) => {
        state.horrorMovies = payload.data.results;
        state.statusCode = payload.statusCode;
      })
      .addCase(fetchRomanceMovies.fulfilled, (state, { payload }) => {
        state.romanceMovies = payload.data.results;
        state.statusCode = payload.statusCode;
      })
      .addCase(fetchDocumentaries.fulfilled, (state, { payload }) => {
        state.documentaries = payload.data.results;
        state.statusCode = payload.statusCode;
      })
  },
});

export const getAllMovies = (state) => state.movies;
export default movieSlice.reducer;
