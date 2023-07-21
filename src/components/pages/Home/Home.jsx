import Checkbox from "../../atoms/Checkbox/Checkbox";
import SearchBar from "../../atoms/SearchBar/SearchBar";
import Header from "../../molecules/Header/Header";
import MoviesList from "../../organisms/MoviesList/MoviesList";
import './Home.css'

export default function Home() {
    return (
        <main>
            <Header />

            <div className="main-top">
                <h1>Filmes Populares</h1>
                <SearchBar />
                {/* <Checkbox /> */}
            </div>
            <MoviesList />   
        </main>
    )
}