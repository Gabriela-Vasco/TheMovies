import {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import "../../../styles/main.scss"

export default function MovieDetails(){
    const params = useParams()
    const [movie, setMovie] = useState(null)
    const [formatedDate, setFormatedDate] = useState("")


    async function fetchMovieDetailsData() {
        const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${params.id}?api_key=427c6a1f4842e0a377188d4ee2935509&language=pt-BR`)
        return data;
    } 

    useEffect(() => {
        fetchMovieDetailsData()
        .then((data) => {
            setMovie(data)
            setFormatedDate(data?.release_date.split("-").reverse().join("/"))
        })
        .catch((error) => {
            console.log(error)
        })
    }, [])


    return (
        <div>
            <div className="movie-details">
                    <img className="movie-details__img" src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}/> 
                    <div className="movie-details__info">
                        <div className="movie-details__circle">
                            <span className="movie-details__rating">{movie?.vote_average}</span>
                        </div>
                        <h3 className="movie-details__title">{`${movie?.title} (${formatedDate.split("/")[2]})`}</h3>
                        <span className="movie-details__date">{formatedDate}</span>
                        {movie?.genres.map(genre => (
                            <p className="movie-details__paragraph">{genre.name}</p>
                            )
                        )}
                        <p className="movie-details__paragraph"><strong>Sinopse:</strong>{movie?.overview}</p>
                        <p className="movie-details__paragraph"><strong>Idioma original:</strong>{movie?.original_language.toUpperCase()}</p>
                        <p className="movie-details__paragraph"><strong>Título original:</strong>{movie?.original_title}</p>
                        
                    </div>
                        {/* <svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.2913 2.61183C19.7805 2.10083 19.1741 1.69547 18.5066 1.41891C17.8392 1.14235 17.1238 1 16.4013 1C15.6788 1 14.9634 1.14235 14.2959 1.41891C13.6285 1.69547 13.022 2.10083 12.5113 2.61183L11.4513 3.67183L10.3913 2.61183C9.3596 1.58013 7.96032 1.00053 6.50129 1.00053C5.04226 1.00053 3.64298 1.58013 2.61129 2.61183C1.5796 3.64352 1 5.04279 1 6.50183C1 7.96086 1.5796 9.36013 2.61129 10.3918L3.67129 11.4518L11.4513 19.2318L19.2313 11.4518L20.2913 10.3918C20.8023 9.88107 21.2076 9.27464 21.4842 8.60718C21.7608 7.93972 21.9031 7.22431 21.9031 6.50183C21.9031 5.77934 21.7608 5.06393 21.4842 4.39647C21.2076 3.72901 20.8023 3.12258 20.2913 2.61183V2.61183Z" stroke="#BA0707" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg> */}
                    </div>
                </div> 
    )
}