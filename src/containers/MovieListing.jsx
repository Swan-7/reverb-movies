import React, { useEffect } from "react";
import MovieCard from "./MovieCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMovies,
  fetchTrendingMovies,
  fetchTopRatedMovies,
  fetchActionMovies,
  fetchComdedyMovies,
  fetchHorrorMovies,
  fetchRomanceMovies,
  fetchDocumentaries,
} from "../redux/moviesSlice";

const MovieListing = () => {
  const dispatch = useDispatch();
  const {
    trendingMovies,
    topRatedMovies,
    actionMovies,
    comdedyMovies, 
    horrorMovies,
    romanceMovies,
    documentaries,
    statusCode,
  } = useSelector(getAllMovies);

  useEffect(() => {
    dispatch(fetchTrendingMovies());
    dispatch(fetchTopRatedMovies());
    dispatch(fetchActionMovies());
    dispatch(fetchComdedyMovies());
    dispatch(fetchHorrorMovies());
    dispatch(fetchRomanceMovies());
    dispatch(fetchDocumentaries());
  }, [dispatch]);


  const renderMovies = (movies, statusCode, isLargeRow) => {
    return statusCode === 200 && movies.length > 0 ? (
      movies.map((movie, index) => (
        <MovieCard key={index} data={movie} isLargeRow={isLargeRow} />
      ))
    ) : (
      <div>
        <h3>{movies.error}</h3>
      </div>
    );
  }
    

  return (
    <>
      <div className="pl-8 pt-4">
        <h2 className="text-sky-300 mb-3">Trending Now</h2>
        <div className="mx-5 my-0 overflow-y-hidden scrollbar-none p-4">
          <div className="flex">
            {renderMovies(trendingMovies, statusCode, true)}
          </div>
        </div>
      </div>

      <div className="pl-8 pt-4">
        <h2 className="text-sky-300 mb-3">Top Rated</h2>
        <div className="mx-5 my-0 overflow-y-hidden scrollbar-none p-4">
          <div className="flex">{renderMovies(topRatedMovies, statusCode, false)}</div>
        </div>
      </div>

      <div className="pl-8 pt-4">
        <h2 className="text-sky-300 mb-3">Action Movies</h2>
        <div className="mx-5 my-0 overflow-y-hidden scrollbar-none p-4">
          <div className="flex">{renderMovies(actionMovies, statusCode, false)}</div>
        </div>
      </div>

      <div className="pl-8 pt-4">
        <h2 className="text-sky-300 mb-3">Comedy Movies</h2>
        <div className="mx-5 my-0 overflow-y-hidden scrollbar-none p-4">
          <div className="flex">{renderMovies(comdedyMovies, statusCode, false)}</div>
        </div>
      </div>

      <div className="pl-8 pt-4">
        <h2 className="text-sky-300 mb-3">Horror Movies</h2>
        <div className="mx-5 my-0 overflow-y-hidden scrollbar-none p-4">
          <div className="flex">{renderMovies(horrorMovies, statusCode, false)}</div>
        </div>
      </div>

      <div className="pl-8 pt-4">
        <h2 className="text-sky-300 mb-3">Romance Movies</h2>
        <div className="mx-5 my-0 overflow-y-hidden scrollbar-none p-4">
          <div className="flex">{renderMovies(romanceMovies, statusCode, false)}</div>
        </div>
      </div>

      <div className="pl-8 pt-4">
        <h2 className="text-sky-300 mb-3">Documentaries</h2>
        <div className="mx-5 my-0 overflow-y-hidden scrollbar-none p-4">
          <div className="flex">{renderMovies(documentaries, statusCode, false)}</div>
        </div>
      </div>
    </>
  );
};

export default MovieListing;
