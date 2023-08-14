import Checkbox from "../../atoms/Checkbox/Checkbox";
import SearchBar from "../../atoms/SearchBar/SearchBar";

import '../../../styles/main.scss'

export default function Home() {
    return (
        <>
            <div className="home">
                <SearchBar />
                {/* <Checkbox /> */}
            </div>  
        </>
    )
}