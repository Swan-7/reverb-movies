import React from 'react';
import MovieCard from './MovieCard';
import requests from '../apis/movieApiKey';

const MovieListing = () => {
    return (
        <div>
            <MovieCard title="Trending Now" fetchUrl={requests.fetchTrending}/>
            <MovieCard title="Top Rated" fetchUrl={requests.fetchTopRated}/>
        </div>
    );
};

export default MovieListing;