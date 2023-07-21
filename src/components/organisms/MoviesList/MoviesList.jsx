import MovieCard from "../../molecules/MovieCard/MovieCard";
import "./MoviesList.css"

export default function MoviesList({Title, Year, Rating}) {
    return (
        <div className="movies-list">
            <MovieCard 
                Title="Avangers"
                Year="2019"
                Rating="8.5"
            />
            <MovieCard 
                Title="Halloween"
                Year="1975"
                Rating="9.0"
            />
            <MovieCard 
                Title="Alien"
                Year="1985"
                Rating="10"
            />
            <MovieCard 
                Title="Get Out"
                Year="2016"
                Rating="10"
            />

        </div> 
    )
}