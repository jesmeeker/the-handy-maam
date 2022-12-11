import { Outlet, Route, Routes, useNavigate } from "react-router-dom"
import { Login } from "../auth/Login"
import { Register } from "../auth/Register"
import { About } from "../pages/About"
import { Education } from "../pages/Education"
import { Profile } from "../profiles/Profile"
import { Reviews } from "../pages/Reviews"
import { Services } from "../pages/Services"
import { RequestForm } from "../requests/RequestForm"
import { Main } from "../pages/Main"
import { EmployeeDetails } from "../Employees/EmployeeDetails"




export const UnauthorizedUserViews = () => {
	const localHandyMaamUser = localStorage.getItem("handymaam_user")
    const localUser = JSON.parse(localHandyMaamUser)

    let navigate = useNavigate()

    return <>
        <Routes>
            
            <Route path="*" element={
                <>
                                <div>UNAUTHORIZED VIEW</div>

                <Outlet />
            </>
        }>

                <Route path="register" element={ <Register /> } />
                <Route path="*" element={ <Main /> } />
                <Route path="login" element={ <Login />} />
                <Route path="about" element={ <About />} />
                <Route path="education" element={ <Education />} />
                <Route path="services" element={ <Services />} />
		        <Route path="reviews" element={ <Reviews />} />
                <Route path="employees/:employeeId" element={ <EmployeeDetails /> } />
                

                </Route>
        </Routes>
            {/* <Main /> */}
        
        </>
    }