import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovieDetail,
  getSelectedMovie,
  getAllMovies,
  fetchGenres,
  addClickedMovie,
} from "../redux/moviesSlice";
import Slider from "react-slick";
import movieTrailer from "movie-trailer";
import Youtube from "react-youtube";

const MovieDetails = () => {
  const base_url = "https://image.tmdb.org/t/p/w300";
  const base_url_2 = "https://image.tmdb.org/t/p/original";
  const { id } = useParams();
  const dispatch = useDispatch();
  const data = useSelector(getSelectedMovie);
  const { movieDetail, genres } = useSelector(getAllMovies);
  const backgroundImageUrl = `${base_url_2}${data.backdrop_path}`;
  const [trailerUrl, setTrailerUrl] = useState("");

  const bannerStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "top center",
    position: "relative",
    height: "35rem",
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

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleMovieClick = () => {
    dispatch(addClickedMovie(data));
  };

  const handleClick = () => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      console.log("Movie Title:", data.title);
      movieTrailer(data?.title || "")
        .then((url) => {
          console.log("Movie Trailer URL:", url);
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  const similarMovies = genres?.filter((genre) =>
    movieDetail.genres.some((movieGenre) => movieGenre.id === genre.id)
  );
  console.log(similarMovies);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchMovieDetail(id)).then(() => setLoading(false));
    dispatch(fetchGenres());
  }, [dispatch, id]);

  

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div
            className="relative bg-no-repeat mb-12 md-block"
            style={bannerStyle}
          >
            <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute inset-0 bg-black opacity-50" />
          </div>

          <div className="md:flex flex-col">
            <div className="md:shrink-0">
              <div className=" md:absolute md:top-24 flex mx-auto md:left-64 text-sm z-999">
                <div className="w-full h-full">
                  <img
                    onClick={handleClick}
                    className="rounded-3xl mx-auto lg:mx-0"
                    src={`${base_url}${data.poster_path}`}
                    alt={data.title}
                  />
                </div>
              </div>

              <div className="absolute md:top-40 top-0 flex left-0 md:left-[37rem] text-sm mt-auto">
                <div className="flex flex-col gap-4 mt-24">
                  <div>
                    <h2 className="text-3xl font-extrabold mb-6">
                      {data.original_title}
                    </h2>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="">
                      {data.genres &&
                        data.genres.slice(0, 5).map((genre, i) => (
                          <span
                            key={i}
                            className={`px-3 py-1 border-2 border-white rounded-2xl ${
                              i < 4 ? "mr-2" : ""
                            }`}
                          >
                            {genre.name}
                          </span>
                        ))}
                    </span>
                    <div className="flex flex-col mt-8 gap-0.5">
                      <span className="font-extrabold">
                        Tagline: <br />
                        <span className="font-light">{data.tagline}</span>
                      </span>
                      <span className="font-extrabold">
                        Duration: <br />
                        <span className="font-light">{data.runtime}</span>
                      </span>
                      <span className="font-extrabold">
                        Release Date: <br />
                        <span className="font-light">{data.release_date}</span>
                      </span>
                    </div>
                  </div>
                  <div className=" font-extrabold">
                    Overview: <br />
                    <span className="font-light">{data.overview}</span>
                  </div>
                </div>
              </div>
            </div>

            {trailerUrl && (
              <div className="w-full mb-12">
                <Youtube
                  videoId={trailerUrl}
                  opts={opts}
                  iframeClassName={"md:ml-80 mt-12 hidden md:block"}
                />
              </div>
            )}
          </div>

          
      <button onClick={handleMovieClick} className="hidden">Add to Local Storage</button>

          <h3 className="hidden">Similar Movies</h3>
          {similarMovies?.length > 0 ? (
            <Slider {...settings}>
              {similarMovies.map((movie) => (
                <div key={movie.id}>
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <h4>{movie.title}</h4>
                  <p>{movie.release_date}</p>
                </div>
              ))}
            </Slider>
          ) : (
            <p className="hidden">No similar movies found.</p>
          )}
        </div>
      )}
    </>
  );
};

export default MovieDetails;
