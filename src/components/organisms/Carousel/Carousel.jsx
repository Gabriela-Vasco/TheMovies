import { useEffect, useState } from "react";
import axios from 'axios';
import '../../../styles/main.scss'

const apiKey = import.meta.env.VITE_API_KEY;

export default function Carousel(){
  const [movies, setMovies] = useState([]);

  async function fetchMovieData() {
    const { data } = await axios.get(`https://api.themoviedb.org/3/movie/popular?${apiKey}&language=pt-BR`)
    const response = data?.results.splice(0, 8)
    setMovies(response)

    return movies;
}  

useEffect(() => {
  fetchMovieData()
}, [])


  return (
    <div className="itens-wrapper">
      <div className="itens">
        {movies.map((movie) => {
           return (
          <div className="item" >
            <img src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}/>
          </div> );
        })}
      </div>
    </div>
  )
}