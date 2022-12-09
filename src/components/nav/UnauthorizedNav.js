import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"
import logoWhite from "../../assets/graphics/logo_white.png"


export const UnauthorizedUserNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link to="/main"><img width="60" className="accountButton" src={logoWhite}/></Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/about">about</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/education">education</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/services">services</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/reviews">reviews</Link>
            </li>
            
            <li className="navbar__item active">
                <Link className="navbar__link" to="/login">Sign In</Link>
            </li>
        </ul>
    )
}