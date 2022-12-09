import { useNavigate } from "react-router-dom"

export const Main = () => {

    const localHandyMaamUser = localStorage.getItem("handymaam_user")
    const localUser = JSON.parse(localHandyMaamUser)

    let navigate = useNavigate()
    return <>
    
                    <article className="mainPage">
                        <h1 className="mainPage--header">The Handy Ma'am</h1>
                        <div className="right">Run by women, for women.</div>
                    </article>
                    <button className="requestButton"
                            onClick={() => {
                                localUser
                                ? navigate("/request")
                                : navigate("/register")}
                            }
                                >+ request service
                    </button>
                                 
            </>
}