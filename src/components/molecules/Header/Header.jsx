import { NavLink, Link } from "react-router-dom"
import "./Header.css"

export default function Header() {
    const activeStyles = {
        color: "#D1FF00",
        fontWeight: "600",
    }

    return (
        <header>
            <Link className="site-logo" to="/">the movies</Link>
            <nav className="navbar">
                <NavLink 
                    to="/filmes"
                    style={({isActive}) => isActive ? activeStyles : null}
                >
                    Filmes
                </NavLink>
                <NavLink 
                    to="/series"
                    style={({isActive}) => isActive ? activeStyles : null}
                >
                    Séries
                </NavLink>
            </nav>
        </header>
    )
}