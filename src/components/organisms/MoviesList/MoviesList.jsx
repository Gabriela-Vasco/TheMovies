import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Select from 'react-select';
import axios from 'axios';
import ContentCard from "../../molecules/ContentCard/ContentCard";
import '../../../styles/main.scss'


export default function MoviesList() {
    const [searchParams] = useSearchParams()
    const [page, setPage] = useState(1); 
    const [movies, setMovies] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [genre, setGenre] = useState("")
    
    const options = [
        { value: 'popularity', label: 'Filmes mais populares' },
        { value: 'cinema', label: 'Últimos lançamentos nos cinemas' },
        { value: 'vote_average', label: 'Melhor avaliados' },
      ];  


    useEffect(() => {
        if(!selectedOption){
            fetchMovieData(page)
        }

        if (selectedOption?.value === 'vote_average') {
            fetchTopRatedMovies(page)
        }

        if (selectedOption?.value === 'cinema') {
            fetchNowPlayingMovies(page)
        }

        if(selectedOption?.value === 'popularity'){
            fetchMovieData(page)
        }
    }, [page, selectedOption])

    useEffect(() => {
    async function handleGenre() {
        const { data } = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=427c6a1f4842e0a377188d4ee2935509&language=pt-BR&page=${page}`)
        const filteredMovies = data.results.filter(movie => movie.genre_ids.includes(genre))
        setMovies(filteredMovies)
        console.log(filteredMovies)
    }
    handleGenre()

    },[genre])


    const handlePrevPage = () => {
        page > 1 ? setPage(page - 1) : null
    }

    const handleNextPage = () => {
        setPage(page + 1)
    }

    async function fetchMovieData(page) {
        const { data } = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=427c6a1f4842e0a377188d4ee2935509&language=pt-BR&page=${page}`)
        setMovies(data?.results);
        return movies;
    }    

    async function fetchTopRatedMovies(page) {
        const { data } = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=427c6a1f4842e0a377188d4ee2935509&language=pt-BR&page=${page}`)
        setMovies(data?.results);
        return movies;
    }

    async function fetchNowPlayingMovies(page) {
        const { data } = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=427c6a1f4842e0a377188d4ee2935509&language=pt-BR&page=${page}`)
        setMovies(data?.results);
        return movies;
    }


    return (
        <div className="movies">
            <div className="title__container">
                <h1 className="title">{selectedOption ? selectedOption.label : "Filmes mais populares"}</h1>
            </div>
            
            <div className="movies__container">
                <aside className="container__aside">
                    <div className="aside__sort">
                        <h3 className="sort__title">Ordenar por</h3>
                        <div className="custom-select">
                            <Select
                                defaultValue={options[0]}
                                onChange={setSelectedOption}
                                options={options}
                            />
                            <span className="custom-arrow"></span>
                        </div>
                    </div>
                    <div className="aside__filter">
                        <h3 className="filter__title">Filtrar por</h3>
                        <h4 className="filter__subtitle">Gêneros</h4>
                            <button className="buttons__button" onClick={() => setGenre(28)}>Ação</button>
                            <button className="buttons__button" onClick={() => setGenre(12)}>Aventura</button>
                            <button className="buttons__button" onClick={() => setGenre(16)}>Animação</button>
                            <button className="buttons__button" onClick={() => setGenre(35)}>Comédia</button>
                            <button className="buttons__button" onClick={() => setGenre(80)}>Crime</button>
                            <button className="buttons__button" onClick={() => setGenre(99)}>Documentário</button>
                            <button className="buttons__button" onClick={() => setGenre(18)}>Drama</button>
                            <button className="buttons__button" onClick={() => setGenre(10751)}>Família</button>
                            <button className="buttons__button" onClick={() => setGenre(14)}>Fantasia</button>
                            <button className="buttons__button" onClick={() => setGenre(36)}>História</button>
                            <button className="buttons__button" onClick={() => setGenre(27)}>Terror</button>
                            <button className="buttons__button" onClick={() => setGenre(10402)}>Música</button>
                            <button className="buttons__button" onClick={() => setGenre(9648)}>Mistério</button>
                            <button className="buttons__button" onClick={() => setGenre(10749)}>Romance</button>
                            <button className="buttons__button" onClick={() => setGenre(878)}>Ficção científica</button>
                            <button className="buttons__button" onClick={() => setGenre(10770)}>Filme para TV</button>
                            <button className="buttons__button" onClick={() => setGenre(53)}>Suspense</button>
                            <button className="buttons__button" onClick={() => setGenre(10752)}>Guerra</button>
                            <button className="buttons__button" onClick={() => setGenre(37)}>Faroeste</button>
                    </div>
                </aside>
            <div className="container__list">
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

            <div className="buttons">
                <button onClick={handlePrevPage} className="buttons buttons__button">Página anterior</button>
                <span style={{color: "white"}} className="buttons buttons__span">{page}</span>
                <button onClick={handleNextPage}className="buttons buttons__button">Próxima página</button>
            </div>
            </div>
        </div>
    )
}