import { useNavigate } from "react-router-dom"

export const RequestButton = () => {

    const localHandyMaamUser = localStorage.getItem("handymaam_user")
    const localUser = JSON.parse(localHandyMaamUser)

    let navigate = useNavigate()

    let handleNavigate = () => {
        localUser
        ? navigate("/request", {state: "requestButton"})
        : navigate("/register", {state: "requestButton"})
    }

    return <button className="subPage--requestButton" 
                    // state={{ from: "requestButton" }}
                    onClick={() => {handleNavigate()}
                       
                    }>+ request service
            </button>
}