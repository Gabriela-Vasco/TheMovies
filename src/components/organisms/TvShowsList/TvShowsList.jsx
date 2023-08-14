import { useEffect, useState } from "react";
import { useQuery, useQueryClient,} from "@tanstack/react-query";
import axios from 'axios';
import ContentCard from "../../molecules/ContentCard/ContentCard";
import '../../../styles/main.scss'

export default function MoviesList() {
    const queryClient = useQueryClient()
    const [page, setPage] = useState(1); 

    const handlePrevPage = () => {
        page > 1 ? setPage(page - 1) : null
    }

    const handleNextPage = () => {
        setPage(page + 1)
    }

    async function fetchShowsData(page = 1) {
        const { data } = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=427c6a1f4842e0a377188d4ee2935509&language=pt-BR&page=${page}`)
        return data?.results;
    }

    const {status, data, error, isFetching, isPreviousData, isLoading} = useQuery({
        queryFn: () => fetchShowsData(page),
        queryKey: ['shows', page],
        keepPreviousData: true,
        staleTime: 5000,
    })

    useEffect(() => {
        if (!isPreviousData && data?.hasMore) {
          queryClient.prefetchQuery({
            queryKey: ['shows', page + 1],
            queryFn: () => fetchShowsData(page + 1),
          })
        }
      }, [data, isPreviousData, page, queryClient])


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

            {!isLoading && data?.length === 0 && <p>Nenhum filme encontrado</p>}

            {isLoading && <p>Carregando...</p>}
        </div>
    )
}