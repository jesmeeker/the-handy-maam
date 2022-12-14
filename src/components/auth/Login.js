import React, { useState } from "react"
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Login = (props) => {
    const [email, set] = useState("")
    const navigate = useNavigate()
    const location =  useLocation()
    
    let from = ""
  

    if (location.state !== null) {from = location.state.from}
    
    

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("handymaam_user", JSON.stringify({
                        id: user.id,
                        staff: user.isStaff
                    }))}
                    else {
                        window.alert("Invalid login")
                    }})
                        .then(() => {
                            if (from  === "requestButton/register") {
                                navigate("/request")}
                            else {
                                navigate("/profile")
                        }})
    }

    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>The Handy Ma'am</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <div>customer - ashley_martino@gmail.com</div>
            <section className="link--register">
                <Link to="/register" state={{ from: "login" }}>Not a member yet?</Link>
            </section>
        </main>
    )
}

