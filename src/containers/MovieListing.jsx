import React, { useEffect } from "react";
import Slider from "react-slick";
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
        <h3>{movies?.error ?? "Loading..."}</h3>
      </div>
    );
  };

  return (
    <>
      <div className="pl-8 pt-4">
        <h2 className="text-sky-300 mb-3 text-2xl font-bold">TRENDING NOW</h2>
        <div className="mx-5 my-0 overflow-y-hidden scrollbar-none p-4">
          <Slider {...settings}>
            {renderMovies(trendingMovies, statusCode, true)}
          </Slider>
        </div>
      </div>

      <div className="pl-8 pt-4">
        <h2 className="text-sky-300 mb-3 text-2xl font-bold">TOP RATED</h2>
        <div className="mx-5 my-0 overflow-y-hidden scrollbar-none p-4">
          <Slider {...settings}>
            {renderMovies(topRatedMovies, statusCode, false)}
          </Slider>
        </div>
      </div>

      <div className="pl-8 pt-4">
        <h2 className="text-sky-300 mb-3 text-2xl font-bold">ACTION MOVIES</h2>
        <div className="mx-5 my-0 overflow-y-hidden scrollbar-none p-4">
          <Slider {...settings}>
            {renderMovies(actionMovies, statusCode, false)}
          </Slider>
        </div>
      </div>

      <div className="pl-8 pt-4">
        <h2 className="text-sky-300 mb-3 text-2xl font-bold">COMEDY MOVIES</h2>
        <div className="mx-5 my-0 overflow-y-hidden scrollbar-none p-4">
          <Slider {...settings}>
            {renderMovies(comdedyMovies, statusCode, false)}
          </Slider>
        </div>
      </div>

      <div className="pl-8 pt-4">
        <h2 className="text-sky-300 mb-3 text-2xl font-bold">HORROR MOVIES</h2>
        <div className="mx-5 my-0 overflow-y-hidden scrollbar-none p-4">
          <Slider {...settings}>
            {renderMovies(horrorMovies, statusCode, false)}
          </Slider>
        </div>
      </div>

      <div className="pl-8 pt-4">
        <h2 className="text-sky-300 mb-3 text-2xl font-bold">ROMANCE MOVIES</h2>
        <div className="mx-5 my-0 overflow-y-hidden scrollbar-none p-4">
          <Slider {...settings}>
            {renderMovies(romanceMovies, statusCode, false)}
          </Slider>
        </div>
      </div>

      <div className="pl-8 pt-4">
        <h2 className="text-sky-300 mb-3 text-2xl font-bold">DOCUMENTARIES</h2>
        <div className="mx-5 my-0 overflow-y-hidden scrollbar-none p-4">
          <Slider {...settings}>
            {renderMovies(documentaries, statusCode, false)}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default MovieListing;
