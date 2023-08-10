import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../../molecules/MovieCard/MovieCard";

import '../../../styles/main.scss'

export default function MoviesList() {
    const [movies, setMovies] = useState([]); 
    const [page, setPage] = useState(1); 

    const handlePrevPage = () => {
        page > 1 ? setPage(page - 1) : null
    }

    const handleNextPage = () => {
        setPage(page + 1)
    }

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=427c6a1f4842e0a377188d4ee2935509&language=pt-BR&page=${page}`)
            .then(response => response.json())
            .then(data => setMovies(data.results))
    }, [page])


    return (
        <div className="movies">
            <div className="movies content__list">
                {movies.map(movie => (
                    <Link 
                        to={`/filmes/${movie.id}`} 
                        style={{ textDecoration: 'none', display: 'unset'}}
                    >  
                        <MovieCard 
                            key={movie.id}
                            Image={`https://image.tmdb.org/t/p/w500${movie.poster_path}` }
                            Title={movie.title}
                            Year={(movie.release_date).slice(0,4)}
                            Rating={movie.vote_average}
                        />
                    </Link>
                ))}
            </div> 
            <div className="buttons">
                <button onClick={handlePrevPage} className="buttons buttons__button">Página anterior</button>
                <span style={{color: "white"}} className="buttons buttons__span">{page}</span>
                <button onClick={handleNextPage} className="buttons buttons__button">Próxima página</button>
            </div>
        </div>
    )
}