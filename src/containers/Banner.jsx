import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
          <div className="absolute bottom-8 text-xs w-1/3 ml-24">
            <h1 className="font-black text-3xl mb-8">
              {randomMovie?.title ||
                randomMovie?.name ||
                randomMovie?.original_name}
            </h1>
            <h3>{randomMovie.overview}</h3>
          </div>
        </div>
      )}
    </header>
  );
};

export default Banner;
