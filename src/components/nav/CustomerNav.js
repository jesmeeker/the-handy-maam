import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import accountGraphic from "../../assets/graphics/account_white.png"
import logoWhite from "../../assets/graphics/logo_white.png"
import { RequestButton } from "../requests/RequestButton"
import "./NavBar.css"

export const CustomerNav = () => {
    const [customer, setCustomer] = useState({})
    const localHandyMaamUser = localStorage.getItem("handymaam_user")
    const localUser = JSON.parse(localHandyMaamUser)

    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:8088/customers?userId=${localUser.id}&_expand=user`)
        .then(response => response.json())
        .then((data) => {
            setCustomer(data[0])
        }) 
    },
    []
    )

    function refreshPage() {
        window.location.reload(false)
    }


    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link to="/"><img width="30" className="accountButton" src={logoWhite}/></Link>
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
            {/* <li className="navbar__item active">
                <Link className="navbar__link" to="/profile">Profile</Link>
            </li> */}
            {
                localStorage.getItem("handymaam_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("handymaam_user")
                            navigate("/")
                            refreshPage()
                        }}>Logout</Link>
                    </li>
                    : ""
            }
            <li className="navbar__item active">
                <Link to="/profile" className="navbar__link"><img width="20" className="accountButton" src={accountGraphic}/></Link>
            </li>
        </ul>
    )
}