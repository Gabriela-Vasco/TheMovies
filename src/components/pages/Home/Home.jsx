import {useState, useEffect} from "react";
import { useSearchParams, Link } from "react-router-dom"; 
import axios from 'axios';
import SearchBar from "../../atoms/SearchBar/SearchBar";
import ContentCard from "../../molecules/ContentCard/ContentCard";

import '../../../styles/main.scss'

const apiKey = import.meta.env.VITE_API_KEY;

export default function Home() {
    const [searchParams] = useSearchParams();
    const [movies, setMovies] = useState([]);
    const query = searchParams.get("q") || "";

    async function getSearchedMovies(){
        const { data } = await axios.get(`https://api.themoviedb.org/3/search/movie?${apiKey}&language=pt-BR&query=${query}`)
        setMovies(data?.results);
        return movies;
    }

    useEffect(() => {
        getSearchedMovies()
    }, [query])

    return (
        <main>
            <SearchBar />
            {query && ( 
                <div className="movies">
                    <div className="title__container">
                        <h2 className="search-results__title">Resultados para: {query}</h2>
                    </div>
                    <div className="list__container">
                        <div className="container__elements">
                            {movies?.map(movie => (
                                <Link key={movie.id}
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
                    </div>
                </div> 
            )}
        </main>
    )
}