import { Navigate, useLocation } from "react-router-dom"

export const Authorized = ({ children }) => {
    const location = useLocation()

    if (localStorage.getItem("handymaam_user")) {
        return children
    }
    else {
        return <Navigate
            to={`/`}/>
    }
}

