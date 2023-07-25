import React, { useEffect } from 'react'
import axios from '../apis/movieApi';

function MovieCard({ title, fetchUrl }) {
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            console.log(request);
            return request;
        }
        fetchData();
    }, []);

  return (
    <div>
      <h2>{ title }</h2>
    </div>
  )
}

export default MovieCard
