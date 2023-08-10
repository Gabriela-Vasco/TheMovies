import { useEffect, useState } from "react";
import MovieCard from "../../molecules/MovieCard/MovieCard";
import '../../../styles/main.scss'

export default function MoviesList() {
    const [tvShows, setTvShows] = useState([]); 
    const [page, setPage] = useState(1); 

     const tvShowsList = async () => {
         const response = await fetch(`
         https://api.themoviedb.org/3/tv/popular?api_key=427c6a1f4842e0a377188d4ee2935509&language=pt-BR&page=${page}`);
         const data = await response.json();
         setTvShows(data.results)
    }

    const handlePrevPage = () => {
        page > 1 ? setPage(page - 1) : null
    }

    const handleNextPage = () => {
        setPage(page + 1)
    }

    useEffect(() => {
        tvShowsList();
    }, [page])


    return (
        <div className="tvShow">
            <div className="tvShow content__list">
                {tvShows.map((tvShow) => (   
                    <MovieCard 
                        key={tvShow.id}
                        Image={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}` }
                        Title={tvShow.name}
                        Year={(tvShow.first_air_date).slice(0,4)}
                        Rating={tvShow.vote_average}
                    />
                ))}

            </div> 
            <div className="buttons">
                <button onClick={handlePrevPage} className="buttons buttons__button">Página anterior</button>
                <span style={{color: "white"}} className="buttons buttons__span">{page}</span>
                <button onClick={handleNextPage}className="buttons buttons__button">Próxima página</button>
            </div>
        </div>
    )
}