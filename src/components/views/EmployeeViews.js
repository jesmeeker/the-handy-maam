import { Outlet, Route, Routes } from "react-router-dom"
import { Login } from "../auth/Login"
import { Main } from "../pages/Main"
import { Profile } from "../profiles/Profile"

export const EmployeeViews = () => {
	return (
        <Routes>
            
            <Route path="*" element={
				<>
                                <div>EMPLOYEE VIEW</div>

                <Outlet />
            </>
        }>
				<Route path="*" element={ <Main />} />
				<Route path="login" element={ <Login />} />
                <Route path="profile" element={ <Profile />} />
            </Route>
        </Routes>
    )
}