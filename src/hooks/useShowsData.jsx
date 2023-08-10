import { useQuery } from "@tanstack/react-query";
import axios from 'axios';

const fetchShowsData = async () => {
    const response = await axios.get(` https://api.themoviedb.org/3/tv/popular?api_key=427c6a1f4842e0a377188d4ee2935509&language=pt-BR`);
    return response?.data?.results;
}

export default function useShowsData(){
    const query = useQuery({
        queryFn: fetchShowsData,
        queryKey: ['shows']
    })

    return query;
}