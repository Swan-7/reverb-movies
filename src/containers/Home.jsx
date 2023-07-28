import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addClickedMovie } from "../redux/moviesSlice";
import MovieListing from './MovieListing';
import Banner from './Banner';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Get the clicked movie data from local storage
    const clickedMovieData = localStorage.getItem("clickedMovie");
    if (clickedMovieData) {
      const clickedMovie = JSON.parse(clickedMovieData);
      // Dispatch the addClickedMovie action to store the movie data in Redux state
      dispatch(addClickedMovie(clickedMovie));
      console.log("Clicked Movie Data:", clickedMovie);
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
