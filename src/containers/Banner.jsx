import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { fetchTrendingMovies, getAllMovies } from "../redux/moviesSlice";

const Banner = () => {
  const base_url = "https://image.tmdb.org/t/p/original";
  const dispatch = useDispatch();
  const { trendingMovies } = useSelector(getAllMovies);

  useEffect(() => {
    dispatch(fetchTrendingMovies());
  }, [dispatch]);

  const randomIndex = Math.floor(Math.random() * trendingMovies.length);
  const randomMovie = trendingMovies[randomIndex];

  const backgroundImageUrl = randomMovie?.backdrop_path
    ? `${base_url}${randomMovie.backdrop_path}`
    : null;

  const bannerStyle = {
    backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : "",
    backgroundSize: "cover",
    backgroundPosition: "top center",
    position: "relative",
    height: "35rem",
  };

  return (
    <header>
      {randomMovie && (
        <div style={bannerStyle}>
          <div className="absolute inset-0 bg-blue-600 opacity-50"></div>
          <div className="absolute bottom-12 text-md w-1/2 ml-6">
            <div className="bg-slate-100/50 w-24 rounded-2xl text-center text-sm">
              New Movie
            </div>
            <h1 className="font-semibold text-4xl mb-4 mt-2">
              {randomMovie?.title ||
                randomMovie?.name ||
                randomMovie?.original_name}
            </h1>
            <h3>{randomMovie.overview}</h3>
            <div>
              <button className="bg-white text-black rounded-3xl px-4 py-2 mt-6">
                <PlayArrowIcon sx={{ fontSize: 20 }} />
                <span className="ml-1 mt-0.5">Watch Movie</span>
              </button>
              <button className="text-white border rounded-3xl px-5 py-2 mt-6 ml-3 text-center">
                <span className="mr-1 mt-0.5">More Info</span>
                <ArrowForwardIcon sx={{ fontSize: 16 }} />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Banner;
