import { Navigate, useLocation, useNavigate } from "react-router-dom"
import { Main } from "../pages/Main"
import { CustomerViews } from "./CustomerViews"

export const Authorized = ({ children }) => {
    const location = useLocation()
        
    if (localStorage.getItem("handymaam_user")) {
        return children
    } else {
        return children
    }

    }



// export const Authorized = ({ children }) => {
//     const location = useLocation()

//     if (localStorage.getItem("honey_user")) {
//         return children
//     }
//     else {
//         return <Navigate
//             to={`/login/${location.search}`}
//             replace
//             state={{ location }} />
//     }
// }

