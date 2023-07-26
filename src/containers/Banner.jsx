import React, { useEffect, useState } from 'react';
import axios from "../apis/MovieApi";
import requests from "../apis/movieApiKey";

const Banner = () => {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchActionMovies);
            // const { data } = request;
            // console.log(requests.fetchActionMovies);
            setMovie(
                request.data.results[Math.floor(Math.random() * request.data.results.length)]
            );
            console.log(request.data);
            return request;
        }
        fetchData();
    }, []);
    console.log(movie.poster_path)

    return (
        <header>
            title
        </header>
    );
};

export default Banner;