import { useEffect, useState } from "react";
import MovieCard from "../../molecules/MovieCard/MovieCard";
import "./MoviesList.css"

export default function MoviesList() {
    const [movies, setMovies] = useState([]); 

     const moviesList = async () => {
         const response = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=427c6a1f4842e0a377188d4ee2935509&language=en-US&page=1");
         const data = await response.json();
         setMovies(data.results)
    }

    useEffect(() => {
        moviesList();
    }, [])


    return (
        <div className="movies-list">
            {movies.map((movie) => (   
                <MovieCard 
                    key={movie.id}
                    Image={`https://image.tmdb.org/t/p/w500${movie.poster_path}` }
                    Title={movie.title}
                    Year={(movie.release_date).slice(0,4)}
                    Rating={movie.vote_average}
                />
            ))}
          

        </div> 
    )
}