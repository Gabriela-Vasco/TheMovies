import { useQuery } from "@tanstack/react-query";
import axios from 'axios';

const fetchMovieData = async () => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=427c6a1f4842e0a377188d4ee2935509&language=pt-BR`)
    return response?.data?.results;
}

export default function useMoviesData(){
    const query = useQuery({
        queryFn: fetchMovieData,
        queryKey: ['movies']
    })

    return query;
}