import { useNavigate } from "react-router-dom"

export const RequestButton = () => {

    const localHandyMaamUser = localStorage.getItem("handymaam_user")
    const localUser = JSON.parse(localHandyMaamUser)

    let navigate = useNavigate()
    return <button className="subPage--requestButton"
                            onClick={() => {
                                localUser
                                ? navigate("/request")
                                : navigate("/register")}
                            }
                                >+ request service
            </button>
}