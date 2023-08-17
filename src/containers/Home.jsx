import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addClickedMovie } from "../redux/moviesSlice";
import MovieListing from './MovieListing';
import Banner from './Banner';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const clickedMovieData = localStorage.getItem("clickedMovie");
    if (clickedMovieData) {
      const clickedMovie = JSON.parse(clickedMovieData);
      dispatch(addClickedMovie(clickedMovie));
    }
  }, [dispatch]);

  return (
    <div>
      <Banner/>
      <MovieListing  />
    </div>
  )
}

export default Home
