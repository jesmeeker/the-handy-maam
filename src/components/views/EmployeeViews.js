import { Outlet, Route, Routes } from "react-router-dom"
import { Login } from "../auth/Login"
import { Profile } from "../profiles/Profile"

export const EmployeeViews = () => {
	return (
        <Routes>
            <Route path="*" element={
                <>
                    <h1 className="center">The Handy Ma'am</h1>
					<div className="center">Run by women, for women.</div>

                    <div className="center">Employee View</div>

                    <Outlet />
                </>
            }>
				<Route path="*" element={ <Profile />} />
				<Route path="/login" element={ <Login />} />
            </Route>
        </Routes>
    )
}