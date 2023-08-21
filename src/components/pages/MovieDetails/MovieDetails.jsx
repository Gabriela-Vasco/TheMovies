import {useState, useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import {FaStar} from "react-icons/fa";
import {BsWallet2, BsHourglassSplit, BsFillFileEarmarkTextFill, BsCurrencyDollar, BsCameraReelsFill, BsCalendarDateFill, BsArrowLeft} from "react-icons/bs";
import axios from 'axios';
import "../../../styles/main.scss"

const apiKey = import.meta.env.VITE_API_KEY;

export default function MovieDetails(){
    const params = useParams()
    const [movie, setMovie] = useState(null)
    const [formatedDate, setFormatedDate] = useState("")
    const [formatedRating, setFormatedRating] = useState("")


    async function fetchMovieDetailsData() {
        const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${params.id}?${apiKey}&language=pt-BR`)
        return data;
    } 
    console.log(movie)

    useEffect(() => {
        fetchMovieDetailsData()
        .then((data) => {
            setMovie(data)
            setFormatedDate(data?.release_date.split("-").reverse().join("/"))
            setFormatedRating(parseFloat(data?.vote_average).toFixed(1))
        })
        .catch((error) => {
            console.log(error)
        })
    }, [])


    return (
        <div>
            <Link className="link" to=".." relative="path"><BsArrowLeft className="icon"/>Voltar</Link>
            <div className="details">
                    <img className="details__img" src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`} alt={movie?.title}/> 
                    <div className="details__info">
                        <h3 className="details__title" data-testid="movie-title">{`${movie?.title} (${formatedDate.split("/")[2]})`}</h3>

                        <h4 className="details__tagline">{movie?.tagline}</h4>

                        <div className="details__genres">
                            {movie?.genres.map(genre => (
                                <p className="details__genre">{genre.name}</p>
                                )
                                )}
                        </div>

                        <p className="details__paragraph"><BsFillFileEarmarkTextFill className="icon"/><strong>Sinopse</strong></p>
                        <span>{movie?.overview}</span>

                        <br />
                        <br />
                        <div className="info-container">
                            <div>
                                <p className="details__paragraph"><FaStar className="icon"/><strong>Avaliação dos usuários</strong></p>
                                <span>{formatedRating}%</span>
                            </div>
                            
                            <div>
                                <p className="details__paragraph"><BsCalendarDateFill className="icon"/><strong>Data de lançamento</strong></p>
                                <span>{formatedDate}</span>
                            </div>
                             
                            <div>
                                <p className="details__paragraph"><BsHourglassSplit className="icon"/><strong>Duração</strong></p>
                                <span>{`${movie?.runtime} minutos`}</span>
                            </div>
                            
                            <div>
                                <p className="details__paragraph"><BsCameraReelsFill className="icon"/><strong>Título original</strong></p>
                                <span>{movie?.original_title}</span>
                            </div>
                           
                            <div>
                                <p className="details__paragraph"><BsWallet2 className="icon"/><strong>Orçamento</strong></ p>
                                <span>{movie?.budget.toLocaleString('pt-BR', {style: "currency", currency: "BRL"})}</span>
                            </div>
                            
                            <div>
                                <p className="details__paragraph"><BsCurrencyDollar className="icon"/><strong>Receita</strong></p>
                                <span>{movie?.revenue.toLocaleString('pt-BR', {style: "currency", currency: "BRL"})}</span>
                            </div>

                        </div>
                        
                </div>
            </div>
        </div> 
    )
}