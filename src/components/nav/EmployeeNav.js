import { Link, useNavigate } from "react-router-dom"
import accountGraphic from "../../assets/graphics/account_white.png"
import logoWhite from "../../assets/graphics/logo_white.png"

import "./NavBar.css"

export const EmployeeNav = () => {
    const navigate = useNavigate()

    function refreshPage() {
        window.location.reload(false)
    }

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link to="/"><img width="60" className="accountButton" src={logoWhite}/></Link>
            </li>
            <li className="navbar__item active">billing</li>
            <li className="navbar__item active">reviews</li>
            <li className="navbar__item active">requests</li>
            
            <li className="navbar__item active">
                <Link className="navbar__link" to="/profile">Profile</Link>
            </li>
            <li className="navbar__item active">
                <Link to="/profile"><img width="30" className="accountButton" src={accountGraphic}/></Link>
            </li>
            {
                localStorage.getItem("handymaam_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            refreshPage()
                            localStorage.removeItem("handymaam_user")
                            navigate("/")
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}