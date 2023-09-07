import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getSearchResults } from "../redux/searchSlice";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import Slider from "react-slick";

const SearchResults = () => {
  const searchResults = useSelector(getSearchResults);
  const base_url = "https://image.tmdb.org/t/p/w300";

  const [isSearchResultsVisible, setIsSearchResultsVisible] = useState(true);

  const toggleSearchResults = () => {
    setIsSearchResultsVisible(!isSearchResultsVisible);
  };

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      {isSearchResultsVisible && (
        <div className="pl-8 pt-4 mt-28">
          <div className="flex justify-between mr-16">
            <h2 className="text-sky-300 mb-3 text-2xl font-bold">
              Search Results
            </h2>
            <button
              onClick={toggleSearchResults}
              className="bg-gray-800 text-white rounded-full p-2 hover:bg-gray-600 hover:text-gray-100"
            >
              <CloseIcon />
            </button>
          </div>
          <div className="mx-5 my-0 overflow-y-hidden scrollbar-none p-6">
            <Slider {...settings}>
              {searchResults.map((movie) => (
                <Link to={`/movie/${movie.id}`}>
                  <div className="object-contain ">
                    <img
                      key={movie.id}
                      src={`${base_url}${movie.poster_path}`}
                      alt={movie.title}
                      className="object-contain max-h-[17rem] transition-transform duration-[450ms] hover:scale-110"
                    />
                  </div>
                </Link>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchResults;
