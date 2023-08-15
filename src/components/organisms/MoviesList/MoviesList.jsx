import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient,} from "@tanstack/react-query";
import Select from 'react-select';
import axios from 'axios';
import ContentCard from "../../molecules/ContentCard/ContentCard";


import '../../../styles/main.scss'

const options = [
    { value: 'popularity.asc', label: 'Popularidade (crescente)' },
    { value: 'release_date.desc', label: 'Data de lançamento (decrescente)' },
    { value: 'release_date.asc', label: 'Data de lançamento (crescente)' },
    { value: 'vote_average.desc', label: 'Avaliação dos usuários (decrescente)' },
    { value: 'vote_average.asc', label: 'Avaliação dos usuários (crescente)' },
    { value: 'original_title.asc', label: 'Título (A-Z)' },
    { value: 'original_title.desc', label: 'Título (Z-A)' },
  ];

export default function MoviesList() {
    const queryClient = useQueryClient()
    const [searchParams, setSearchParams] = useSearchParams()
    const [page, setPage] = useState(1); 
    const [selectedOption, setSelectedOption] = useState(null);

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

    async function fetchMovieData(page = 1) {
        const { data } = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=427c6a1f4842e0a377188d4ee2935509&language=pt-BR&page=${page}`)
        return data?.results;
    }    

    const {status, data, error, isFetching, isPreviousData, isLoading} = useQuery({
        queryFn: () => fetchMovieData(page),
        queryKey: ['movies', page],
        keepPreviousData: true,
        staleTime: 5000,
    })

    useEffect(() => {
        if (!isPreviousData && data?.hasMore) {
          queryClient.prefetchQuery({
            queryKey: ['movies', page + 1],
            queryFn: () => fetchMovieData(page + 1),
          })
        }
      }, [data, isPreviousData, page, queryClient])



    return (
        <div className="movies">
            <div className="title__container">
                <h1 className="title">Filmes Populares</h1>
            </div>
            
            <div className="movies__container">
                <aside className="container__aside">
                    <div className="aside__sort">
                        <h3 className="sort__title">Ordenar por</h3>
                        <div className="custom-select">
                            <Select
                                defaultValue={selectedOption}
                                onChange={setSelectedOption}
                                options={options}
                            />
                            <span className="custom-arrow"></span>
                        </div>
                    </div>
                    <div className="aside__filter">
                        <h3 className="filter__title">Filtrar por</h3>
                        <h4 className="filter__subtitle">Gêneros</h4>
                            <button className="buttons__button">Ação</button>
                            <button className="buttons__button">Aventura</button>
                            <button className="buttons__button">Animação</button>
                            <button className="buttons__button">Comédia</button>
                            <button className="buttons__button">Crime</button>
                            <button className="buttons__button">Documentário</button>
                            <button className="buttons__button">Drama</button>
                            <button className="buttons__button">Família</button>
                            <button className="buttons__button">Fantasia</button>
                            <button className="buttons__button">História</button>
                            <button className="buttons__button">Terror</button>
                            <button className="buttons__button">Música</button>
                            <button className="buttons__button">Mistério</button>
                            <button className="buttons__button">Romance</button>
                            <button className="buttons__button">Ficção científica</button>
                            <button className="buttons__button">Filme para TV</button>
                            <button className="buttons__button">Suspense</button>
                            <button className="buttons__button">Guerra</button>
                            <button className="buttons__button">Faroeste</button>
                    </div>
                </aside>
            <div className="container__list">
                {/* <button
                    onClick={() => handleFilterChange("genre_ids", 16)}
                >16</button>

                <button
                    onClick={() => handleFilterChange("genre_ids", 28)}
                >28</button> */}

                

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
                <button onClick={handleNextPage}className="buttons buttons__button">Próxima página</button>
            </div>

            {!isLoading && data?.length === 0 && <p>Nenhum filme encontrado</p>}

            {isLoading && <p>Carregando...</p>}
            </div>
        </div>
    )
}