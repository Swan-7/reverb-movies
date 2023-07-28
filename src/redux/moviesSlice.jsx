import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../apis/movieApi";
import requests from "../apis/movieApiKey";
import { API_KEY } from "../apis/movieApiKey";

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

export const fetchMovieDetail = createAsyncThunk(
  "movies/fetchMovieDetail",
  async (id) => {
    const fetchUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos`;
    const request = await axios.get(fetchUrl);
    const { data } = request;
    return { data };
  }
);

export const fetchRandomBackdrop = createAsyncThunk(
  "movies/fetchRandomBackdrop",
  async () => {
    try {
      const fetchUrl = requests.fetchTrending; 
      const request = await axios.get(fetchUrl);
      const { data} = request;

      const randomIndex = Math.floor(Math.random() * data.results.length);
      const randomMovie = data[randomIndex];
      return randomMovie;
    } catch (error) {
      console.error("Error fetching random movie backdrop:", error);
      throw error;
    }
  }
  );

  export const fetchGenres = createAsyncThunk(
    "movies/fetchGenres",
    async () => {
      try {
        const fetchUrl =
          "https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}";
        const request = await axios.get(fetchUrl);
        const { data } = request;
        return data.genres;
      } catch (error) {
        console.error("Error fetching genres:", error);
        throw error;
      }
    }
  )

  export const addClickedMovie = createAsyncThunk(
    "movies/addClickedMovie",
    async (movie) => {
      localStorage.setItem("clickedMovie", JSON.stringify(movie));
      return movie;
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
  movieDetail: {},
  randomMovie: [],
  genres: [],
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingMovies.fulfilled, (state, { payload }) => {
        state.trendingMovies = payload?.data?.results ?? [];
        state.statusCode = payload.statusCode;
      })
      .addCase(fetchTopRatedMovies.fulfilled, (state, { payload }) => {
        state.topRatedMovies = payload?.data?.results ?? [];
        state.statusCode = payload.statusCode;
      })
      .addCase(fetchActionMovies.fulfilled, (state, { payload }) => {
        state.actionMovies = payload?.data?.results ?? [];
        state.statusCode = payload.statusCode;
      })
      .addCase(fetchComdedyMovies.fulfilled, (state, { payload }) => {
        state.comdedyMovies = payload?.data?.results ?? [];
        state.statusCode = payload.statusCode;
      })
      .addCase(fetchHorrorMovies.fulfilled, (state, { payload }) => {
        state.horrorMovies = payload?.data?.results ?? [];
        state.statusCode = payload.statusCode;
      })
      .addCase(fetchRomanceMovies.fulfilled, (state, { payload }) => {
        state.romanceMovies = payload?.data?.results ?? [];
        state.statusCode = payload.statusCode;
      })
      .addCase(fetchDocumentaries.fulfilled, (state, { payload }) => {
        state.documentaries = payload?.data?.results ?? [];
        state.statusCode = payload.statusCode;
      })
      .addCase(fetchMovieDetail.fulfilled, (state, { payload }) => {
        state.movieDetail = payload.data ?? {};
      })
      .addCase(fetchRandomBackdrop.fulfilled, (state, { payload }) => {
        state.randomMovie = payload?.data?.results ?? [];
      })
      .addCase(fetchRandomBackdrop.rejected, (state, action) => {
        console.error("Error fetching random movie backdrop:", action.error);
      })
      .addCase(fetchGenres.fulfilled, (state, { payload }) => {
        state.genres = payload;
      });
  },
});

export const getAllMovies = (state) => state.movies;
export const getSelectedMovie = (state) => state.movies.movieDetail;
export const getRandomMovie = (state) => state.randomMovie;
export const getAllGenres = (state) => state.movies.genres; 
export default movieSlice.reducer;
