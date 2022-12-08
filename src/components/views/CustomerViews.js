import { Outlet, Route, Routes, useNavigate } from "react-router-dom"
import { Login } from "../auth/Login"
import { Register } from "../auth/Register"
import { About } from "../pages/About"
import { Education } from "../pages/Education"
import { Main } from "../pages/Main"
import { Reviews } from "../pages/Reviews"
import { Services } from "../pages/Services"
import { Profile } from "../profiles/Profile"
import { RequestForm } from "../requests/RequestForm"
import { Success } from "../requests/Success"

export const CustomerViews = () => {
	const localHandyMaamUser = localStorage.getItem("handymaam_user")
    const localUser = JSON.parse(localHandyMaamUser)

    let navigate = useNavigate()

    return <>
        <Routes>
            
            <Route path="*" element={
				<>
                <Outlet />
            </>
        }>

                <Route path="request" element={ <RequestForm /> } />
                <Route path="*" element={ <Main /> } />
                <Route path="profile" element={ <Profile />} />
                <Route path="login" element={ <Login />} />
                <Route path="about" element={ <About />} />
                <Route path="education" element={ <Education />} />
                <Route path="services" element={ <Services />} />
		        <Route path="reviews" element={ <Reviews />} />
                <Route path="success" element={ <Success /> } />

                </Route>
        	</Routes>
        </>
    }