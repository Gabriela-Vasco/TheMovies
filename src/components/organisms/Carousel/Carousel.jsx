import { useEffect, useState } from "react";
import {BsCameraReelsFill} from "react-icons/bs";
import axios from 'axios';
import '../../../styles/main.scss'

const apiKey = import.meta.env.VITE_API_KEY;

export default function Carousel(){
  const [movies, setMovies] = useState([]);
  const [active, setActive] = useState(0);
  const handleToggle = (index) => setActive(index);

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
        {movies.map((movie, index) => {
           const isActive = active === index ? "active" : "";
           return (
          <div key={index} className={`item ${isActive}`} onClick={() => handleToggle(index)}>
            <img src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}/>
          </div> );
        })}
      </div>
    </div>
  )
}