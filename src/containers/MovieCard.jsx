import React from 'react'

function MovieCard({ data, isLargeRow }) {
    const base_url = 'https://image.tmdb.org/t/p/w300'
    const { poster_path, name, backdrop_path } = data;

    return (
      <div className="card-item">
        <div className="">
          <img
            src={`${base_url}${isLargeRow ? poster_path : backdrop_path}`}
            alt={name}
            className={`object-contain max-h-[17rem] transition-transform duration-[450ms] hover:scale-110 ${
              !isLargeRow ? "mr-52 w-[94%]" : "mr-48 w-full"
            }`}
          />
        </div>
      </div>
    );
}

export default MovieCard
