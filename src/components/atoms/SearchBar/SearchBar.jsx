import {useState} from "react";
import {useNavigate} from "react-router-dom";
import "../../../styles/main.scss";

export default function SearchBar(){
    const [search, setSearch] = useState("")
    const navigate = useNavigate()

    function handleSubmit(e){
        e.preventDefault()
        
        if(!search) return
        navigate(`/search?q=${search}`)
        setSearch("")
    }

    return (
        <div >
            <form className="search-bar" onSubmit={handleSubmit}>
                <input 
                    className="search-bar search-bar__input" 
                    type="search" 
                    placeholder={`Digite para pesquisar...`}
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                />
                <button className="search-bar search-bar__button" type="submit">
                    <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="#1B1B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M19.35 20.35L15 16" stroke="#1B1B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </form>
        </div>
    )
}