import { useEffect, useState } from "react";
import Select from 'react-select';
import axios from 'axios';
import ContentCard from "../../molecules/ContentCard/ContentCard";
import '../../../styles/main.scss'

const apiKey = import.meta.env.VITE_API_KEY;

export default function TvShowsList() {
    const [page, setPage] = useState(1);
    const [tvShow, setTvShow] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [genre, setGenre] = useState("")
    
    const options = [
        { value: 'popularity', label: 'Séries mais populares' },
        { value: 'airing_today', label: 'Lançamentos hoje' },
        { value: 'vote_average', label: 'Melhor avaliadas' },
      ]; 

    useEffect(() => {
        if(!selectedOption){
            fetchShowsData(page)
        }

        if (selectedOption?.value === 'airing_today') {
            fetchAiringToday(page)
        }

        if (selectedOption?.value === 'vote_average') {
            fetchTopRated(page)
        }

        if(selectedOption?.value === 'popularity'){
            fetchShowsData(page)
        }

        if(genre !== "") {
            handleGenre()
        }

    }, [page, selectedOption, genre])

    const handlePrevPage = () => {
        page > 1 ? setPage(page - 1) : null
    }

    const handleNextPage = () => {
        setPage(page + 1)
    }

    async function handleGenre() {
        const { data } = await axios.get(`https://api.themoviedb.org/3/tv/popular?${apiKey}&language=pt-BR&page=${page}`)
        const filteredShows = data.results.filter(show => show.genre_ids.includes(genre))
        setTvShow(filteredShows)
    }

    async function fetchShowsData(page) {
        const { data } = await axios.get(`https://api.themoviedb.org/3/tv/popular?${apiKey}&language=pt-BR&page=${page}`)
        setTvShow(data?.results);
        return tvShow;
    }

    async function fetchAiringToday(page) {
        const { data } = await axios.get(`https://api.themoviedb.org/3/tv/airing_today?${apiKey}&language=pt-BR&page=${page}`)
        setTvShow(data?.results);
        return tvShow;
    }

    async function fetchTopRated(page) {
        const { data } = await axios.get(`https://api.themoviedb.org/3/tv/top_rated?${apiKey}&language=pt-BR&page=${page}`)
        setTvShow(data?.results);
        return tvShow;
    }


    return (
        <div className="tvShow">
            <div className="title__container">
                <h1 className="title">{selectedOption ? selectedOption.label : "Séries mais populares"}</h1>
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
                            <button className={genre === 10759 ? "buttons__button--purple" : "buttons__button"} 
                            onClick={() => setGenre(10759)}>Ação e Aventura</button>
                            <button className={genre === 10762 ? "buttons__button--purple" : "buttons__button"} 
                            onClick={() => setGenre(10762)}>Infantil</button>
                            <button className={genre === 16 ? "buttons__button--purple" : "buttons__button"} 
                            onClick={() => setGenre(16)}>Animação</button>
                            <button className={genre === 35 ? "buttons__button--purple" : "buttons__button"}
                            onClick={() => setGenre(35)}>Comédia</button>
                            <button className={genre === 80 ? "buttons__button--purple" : "buttons__button"}
                            onClick={() => setGenre(80)}>Crime</button>
                            <button className={genre === 99 ? "buttons__button--purple" : "buttons__button"} 
                            onClick={() => setGenre(99)}>Documentário</button>
                            <button className={genre === 18 ? "buttons__button--purple" : "buttons__button"}
                            onClick={() => setGenre(18)}>Drama</button>
                            <button className={genre === 10766 ? "buttons__button--purple" : "buttons__button"}
                            onClick={() => setGenre(10766)}>Novela</button>
                            <button className={genre === 9648 ? "buttons__button--purple" : "buttons__button"}
                            onClick={() => setGenre(9648)}>Mistério</button>
                            <button className={genre === 10765 ? "buttons__button--purple" : "buttons__button"}
                            onClick={() => setGenre(10765)}>Ficção científica e Fantasia</button>
                            <button className={genre === 10764 ? "buttons__button--purple" : "buttons__button"}
                            onClick={() => setGenre(10764)}>Reality Shows</button>
                            <button className={genre === 10767 ? "buttons__button--purple" : "buttons__button"}
                            onClick={() => setGenre(10767)}>Talk Show</button>
                            <button className={genre === 10768 ? "buttons__button--purple" : "buttons__button"}
                            onClick={() => setGenre(10768)}>Guerra e Política</button>
                            <button className={genre === 37 ? "buttons__button--purple" : "buttons__button"}
                            onClick={() => setGenre(37)}>Faroeste</button>
                            <button className="buttons__button-clear" onClick={() => setGenre("")}>Limpar filtro</button>
                    </div>
                </aside>
                <div className="tvShow content__list">
                    {tvShow?.map((tvShow) => (   
                        <ContentCard 
                            key={tvShow.id}
                            Image={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}` }
                            Title={tvShow.name}
                            Year={(tvShow.first_air_date).slice(0,4)}
                            Rating={tvShow.vote_average}
                        />
                    ))}
                </div> 
            </div>
            
            <div className="buttons">
                <button onClick={handlePrevPage} className="buttons buttons__button">Página anterior</button>
                <span style={{color: "white"}} className="buttons buttons__span">{page}</span>
                <button onClick={handleNextPage}className="buttons buttons__button">Próxima página</button>
            </div>

        </div>
    )
}