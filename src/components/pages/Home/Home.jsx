import Checkbox from "../../atoms/Checkbox/Checkbox";
import SearchBar from "../../atoms/SearchBar/SearchBar";

import '../../../styles/main.scss'

export default function Home() {
    return (
        <>
            <div className="home">
                <h1 className="home__title">Filmes Populares</h1>
                <SearchBar />
                {/* <Checkbox /> */}
            </div>  
        </>
    )
}