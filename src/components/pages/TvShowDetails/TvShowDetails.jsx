import {useState, useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import {FaStar} from "react-icons/fa";
import {BsHourglassSplit, BsFillFileEarmarkTextFill, BsFillCaretRightFill, BsCameraReelsFill, BsCalendarDateFill, BsArrowLeft} from "react-icons/bs";
import axios from 'axios';
import "../../../styles/main.scss"

const apiKey = import.meta.env.VITE_API_KEY;

export default function TvShowDetails(){
    const params = useParams()
    const [tvShow, setTvShow] = useState(null)
    const [formatedDate, setFormatedDate] = useState("")
    const [formatedRating, setFormatedRating] = useState("")


    async function fetchTvShowDetailsData() {
        const { data } = await axios.get(`https://api.themoviedb.org/3/tv/${params.id}?${apiKey}&language=pt-BR`)
        return data;
    } 

    useEffect(() => {
        fetchTvShowDetailsData()
        .then((data) => {
            setTvShow(data)
            setFormatedDate(data?.first_air_date.split("-").reverse().join("/"))
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
                    <img className="details__img" src={`https://image.tmdb.org/t/p/w500${tvShow?.poster_path}`} alt={tvShow?.title}/> 
                    <div className="details__info">
                        <h3 className="details__title" data-testid="tvshow-title">{`${tvShow?.name} (${formatedDate.split("/")[2]})`}</h3>

                        <h4 className="details__tagline">{tvShow?.tagline}</h4>

                        <div className="details__genres">
                            {tvShow?.genres.map(genre => (
                                <p className="details__genre">{genre.name}</p>
                                )
                                )}
                        </div>

                        <p className="details__paragraph"><BsFillFileEarmarkTextFill className="icon"/><strong>Sinopse</strong></p>
                        <span>{tvShow?.overview}</span>

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
                                <p className="details__paragraph"><BsHourglassSplit className="icon"/><strong>Último episódio</strong></p>
                                <span>{`${tvShow?.last_episode_to_air.name}`}</span>
                            </div>
                            
                            <div>
                                <p className="details__paragraph"><BsCameraReelsFill className="icon"/><strong>Título original</strong></p>
                                <span>{tvShow?.original_name}</span>
                            </div>
                           
                            <div>
                                <p className="details__paragraph"><BsFillCaretRightFill className="icon"/><strong>Nº temporadas</strong></ p>
                                <span>{tvShow?.number_of_seasons}</span>
                            </div>
                            
                            <div>
                                <p className="details__paragraph"><BsFillCaretRightFill className="icon"/><strong>Nº episódios</strong></p>
                                <span>{tvShow?.number_of_episodes}</span>
                            </div>

                        </div>
                        
                </div>
            </div>
        </div> 
    )
}