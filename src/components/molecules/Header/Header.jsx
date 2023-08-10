import { NavLink, Link } from "react-router-dom"
import "../../../styles/main.scss"

export default function Header() {
    const activeStyles = {
        color: "#D1FF00",
        fontWeight: "600",
    }

    return (
        <header className="header">
            <Link className="header header__logo" to="/">the movies</Link>
            <nav className="header header__navbar">
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