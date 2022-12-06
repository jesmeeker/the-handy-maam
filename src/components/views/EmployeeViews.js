import { Outlet, Route, Routes } from "react-router-dom"
import { Profile } from "../profiles/Profile"

export const EmployeeViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>The Handy Ma'am</h1>
                    <div>Run by women, for women.</div>

                    <div>Employee View</div>

                    <Outlet />
                </>
            }>
				<Route path="/profile" element={ <Profile />} />
            </Route>
        </Routes>
    )
}