import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addClickedMovie } from "../redux/moviesSlice";
import MovieListing from './MovieListing';
import Banner from './Banner';
import SearchResults from "../containers/SearchResults";
import { useSelector } from "react-redux";
import { getSearchResults } from "../redux/searchSlice";

const Home = () => {
  const searchResults = useSelector(getSearchResults);
  const dispatch = useDispatch();

  //  const [isSearchMode, setIsSearchMode] = useState(false)
  //  const exitSearchMode = () => {
  //    setIsSearchMode(!isSearchMode);
  //  };

  useEffect(() => {
    const clickedMovieData = localStorage.getItem("clickedMovie");
    if (clickedMovieData) {
      const clickedMovie = JSON.parse(clickedMovieData);
      dispatch(addClickedMovie(clickedMovie));
    }
  }, [dispatch]);

  return (
    <div>
      {searchResults.length === 0 && <Banner />}
      {searchResults.length > 0 && (
        <SearchResults />
      )}
      <MovieListing />
    </div>
  );
};

export default Home
