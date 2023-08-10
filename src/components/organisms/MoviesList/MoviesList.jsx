import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useMoviesData from "../../../hooks/useMoviesData";
import ContentCard from "../../molecules/ContentCard/ContentCard";

import '../../../styles/main.scss'

export default function MoviesList() {
    const { data, isLoading } = useMoviesData();
    const [searchParams, setSearchParams] = useSearchParams()
    const [page, setPage] = useState(1); 

    // const genreFilter = searchParams.get("genre_ids")
    // console.log(genreFilter)

    // const displayedMovies = genreFilter 
    // ? movies.filter(movie => movie.genre_ids === genreFilter)
    // : movies

    // function handleFilterChange(key, value) {
    //     setSearchParams(prevParams => {
    //         if (value === null) {
    //             prevParams.delete(key)
    //         } else {
    //             prevParams.set(key, value)
    //         }
    //         return prevParams
    //     })
    // }

    const handlePrevPage = () => {
        page > 1 ? setPage(page - 1) : null
    }

    const handleNextPage = () => {
        setPage(page + 1)
    }


    return (
        <div className="movies">
            <div className="movies content__list">
                {/* <button
                    onClick={() => handleFilterChange("genre_ids", 16)}
                >16</button>

                <button
                    onClick={() => handleFilterChange("genre_ids", 28)}
                >28</button> */}

                {!isLoading && data?.length === 0 && <p>Nenhum filme encontrado</p>}

                {data?.map(movie => (
                    <Link 
                        to={`/filmes/${movie.id}`} 
                        state={{ search: `?${searchParams.toString()}` }}
                        style={{ textDecoration: 'none', display: 'unset'}}
                    >  
                        <ContentCard 
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
            {isLoading && <p>Carregando...</p>}
        </div>
    )
}