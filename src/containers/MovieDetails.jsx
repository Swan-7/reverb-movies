import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LanguageIcon from "@mui/icons-material/Language";
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
  const base_url = "https://image.tmdb.org/t/p/w500";
  const base_url_2 = "https://image.tmdb.org/t/p/original";
  const { id } = useParams();
  const dispatch = useDispatch();
  const data = useSelector(getSelectedMovie);
  const { movieDetail, genres } = useSelector(getAllMovies);
  const backgroundImageUrl = `${base_url_2}${data.backdrop_path}`;
  const [trailerUrl, setTrailerUrl] = useState("");
  
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

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

  const convertToHoursMinutes = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return [hours, remainingMinutes];
  }

  const movieDurationMinutes = data.runtime;
  const [hours, minutes] = convertToHoursMinutes(movieDurationMinutes);


  const opts = {
    height: "390",
    width: "640",
    playerVars: {
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

  const percentage = (data.vote_average / 10) * 100;

  const similarMovies = genres?.filter((genre) =>
    movieDetail.genres.some((movieGenre) => movieGenre.id === genre.id)
  );
  
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
        <div className="mb-12">
          <div
            className="relative bg-no-repeat mb-12 md-block"
            style={bannerStyle}
          >
            <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute inset-0 bg-black opacity-50" />
          </div>

          <div className="md:flex flex-col">
            <div className="md:shrink-0">
              <div className=" md:absolute md:top-24 flex mx-auto md:left-16 text-sm z-999">
                <div className="w-full h-full relative inline-block overflow-hidden">
                  <img
                    onClick={handleClick}
                    className="rounded-3xl mx-auto lg:mx-0 w-2/3 transition-transform"
                    src={`${base_url}${data.poster_path}`}
                    alt={data.title}
                  />
                  <div
                    className="absolute inset-0 bg-gray-600 cursor-pointer rounded-3xl opacity-0 flex items-center justify-center transition-opacity hover:opacity-50 w-2/3
                  transition ease-out delay-150 hover:-translate-y-1 duration-300"
                  >
                    <p className="text-white text-lg px-4 py-2 border rounded-lg">
                      Watch Trailer
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute md:top-24 top-0 flex left-0 md:left-[27rem] text-sm mt-auto">
                <div className="flex flex-col gap-4 mt-24">
                  <div>
                    <h2 className="text-3xl font-extrabold mb-1">
                      {data.original_title}
                    </h2>
                  </div>
                  <div className="flex gap-x-4">
                    <div className="border border-slate-400/100 w-16 text-center text-slate-400/100 rounded-sm">
                      {data.adult ? <p>Adult</p> : <p>PG-13</p>}
                    </div>
                    <span className="font-light">{data.release_date}</span>
                    <span>{`${hours}h ${minutes}m`}</span>
                  </div>
                  <div className="flex flex-col gap-6">
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

                    <div className="flex items-center gap-x-20 mb-6">
                      <div className="flex items-center">
                        <div className="bg-slate-800 p-[0.3rem] rounded-full w-[4.15rem]">
                          <div
                            style={{
                              background: `conic-gradient(rgb(56 189 248) ${percentage}%, rgb(71 85 105) ${percentage}%)`,
                            }}
                            className="w-[3.5rem] h-[3.5rem] flex items-center justify-center rounded-full"
                          >
                            <div className="text-xl font-semibold w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center group-hover:text-[#A45C40]">
                              {Math.floor(percentage)}
                              <span className="text-[0.7rem]">%</span>
                            </div>
                          </div>
                        </div>
                        <span className="text-[1.1rem] font-semibold ml-2 w-4">
                          Vote Average
                        </span>
                      </div>

                      <div className="flex gap-x-6">
                        <a
                          href={data.homepage}
                          className="bg-slate-800 p-2 rounded-full"
                        >
                          <LanguageIcon />
                        </a>
                        <button
                          className="cursor-pointer bg-slate-800 p-2 rounded-full"
                          onClick={handleFavoriteClick}
                        >
                          {isFavorite ? (
                            <FavoriteIcon />
                          ) : (
                            <FavoriteBorderIcon />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="italic">
                        <span className="font-light text-md opacity-80">
                          {data.tagline}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className=" font-extrabold text-lg">
                    Overview: <br />
                    <span className="font-light text-sm block w-1/2">
                      {data.overview}
                    </span>
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

          <button onClick={handleMovieClick} className="hidden">
            Add to Local Storage
          </button>

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
