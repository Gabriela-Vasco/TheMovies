import { useEffect, useState } from "react";
import useShowsData from "../../../hooks/useShowsData";
import ContentCard from "../../molecules/ContentCard/ContentCard";
import '../../../styles/main.scss'

export default function MoviesList() {
    const { data, isLoading } = useShowsData();
    const [page, setPage] = useState(1); 

    const handlePrevPage = () => {
        page > 1 ? setPage(page - 1) : null
    }

    const handleNextPage = () => {
        setPage(page + 1)
    }


    return (
        <div className="tvShow">
            <div className="tvShow content__list">
                {data?.map((tvShow) => (   
                    <ContentCard 
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

            {isLoading && <p>Carregando...</p>}
        </div>
    )
}