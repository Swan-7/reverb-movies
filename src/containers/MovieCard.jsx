import React from 'react';
import { Link } from 'react-router-dom';

function MovieCard({ data, isLargeRow }) {
    const base_url = 'https://image.tmdb.org/t/p/w300'
    const { poster_path, title, backdrop_path, id } = data;  

    return (
      <div>
        <Link to={`/movie/${data.id}`}>
          <div className="object-contain ">
            <img
              key={id}
              src={`${base_url}${isLargeRow ? poster_path : backdrop_path}`}
              alt={title}
              className={` object-contain max-h-[17rem] transition-transform duration-[450ms] hover:scale-110 ${
                !isLargeRow ? "mr-52 max-w-[94%]" : "mr-48 max-w-full"
              }`}
            />
          </div>
        </Link>
      </div>
    );
}

export default MovieCard
