import {useState, useEffect} from "react";
import { useSearchParams, Link } from "react-router-dom"; 
import axios from 'axios';

import ContentCard from "../../molecules/ContentCard/ContentCard";

import '../../../styles/main.scss'
import Carousel from "../../organisms/Carousel/Carousel";

const apiKey = import.meta.env.VITE_API_KEY;

export default function Home() {
    const [searchParams] = useSearchParams();
    const [movies, setMovies] = useState([]);
    const [tvShows, setTvShows] = useState([]);
    const query = searchParams.get("q") || "";

    async function getSearchedMovies(){
        const { data } = await axios.get(`https://api.themoviedb.org/3/search/movie?${apiKey}&language=pt-BR&query=${query}`)
        setMovies(data?.results);
        return movies;
    }

    async function getSearchedShow(){
        const { data } = await axios.get(`https://api.themoviedb.org/3/search/tv?${apiKey}&language=pt-BR&query=${query}`)
        setTvShows(data?.results);
        return tvShows;
    }


    useEffect(() => {
        getSearchedMovies()
        getSearchedShow()
        
    }, [query])


    return (
        <main>
            {query ? ( 
                <div className="movies">
                    <div className="title__container">
                        <h2 className="search-results__title">Resultados para: <mark className="search-results__query">{query}</mark></h2>
                    </div>
                    <div className="title__container">
                        <h3 className="list__title">Filmes</h3>
                    </div>
                    <div className="home__container" >
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
                                        Rating={movie.vote_average.toFixed(1)}
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>
                    <br />
                    <div className="title__container">
                        <h3 className="list__title">Séries</h3>
                    </div>
                    <div className="home__container" >
                        <div className="container__elements">
                            {tvShows?.map(show => (
                                <Link key={show.id}
                                    to={`/series/${show.id}`}
                                    state={{ search: `?${searchParams.toString()}` }}
                                    style={{ textDecoration: 'none', display: 'unset'}}
                                >
                                    <ContentCard
                                        key={show.id}
                                        Image={`https://image.tmdb.org/t/p/w500${show.poster_path}` }
                                        Title={show.name}
                                        Year={(show.first_air_date).slice(0,4)}
                                        Rating={show.vote_average.toFixed(1)}
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div> 
            ) : (
                <div  className="home__title" >
                    <h3>Todos os seus filmes e séries preferidos<br /> em um só lugar</h3>
                    <Carousel />
                </div>
            )}
        </main>
    )
}