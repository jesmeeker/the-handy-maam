import { Navigate, useLocation, useNavigate } from "react-router-dom"
import { CustomerViews } from "./CustomerViews"

export const Authorized = ({ children }) => {
    const location = useLocation()

    if (localStorage.getItem("handymaam_user")) {
        return <Navigate
            to={"/profile"}/>}
    else {
        return <Navigate
            to={"/"}/>
    }
}

