import { Outlet, Route, Routes } from "react-router-dom"
import { Login } from "../auth/Login"
import { About } from "../pages/About"
import { Education } from "../pages/Education"
import { Main } from "../pages/Main"
import { Services } from "../pages/Services"
import { Profile } from "../profiles/Profile"

export const EmployeeViews = () => {
	return (
        <Routes>
            <Route path="*" element={
                <>
                <div>EMPLOYEE VIEW</div>
                    <h1 className="center">The Handy Ma'am</h1>
					<div className="center">Run by women, for women.</div>

                    <div className="center">Employee View</div>

                    <Outlet />
                </>
            }>
				<Route path="*" element={ <Main />} />
				<Route path="login" element={ <Login />} />
                <Route path="about" element={ <About />} />
                <Route path="education" element={ <Education />} />
                <Route path="services" element={ <Services />} />
            </Route>
        </Routes>
    )
}