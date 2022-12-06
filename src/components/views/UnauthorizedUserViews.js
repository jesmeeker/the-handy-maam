import { Outlet, Route, Routes } from "react-router-dom"
import { Register } from "../auth/Register"
import { Profile } from "../profiles/Profile"




export const UnauthorizedUserViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>The Handy Ma'am</h1>
                    <div>Run by women, for women.</div>

                    <div>Unauthorized User View</div>

                    <Outlet />
                </>
            }>
                <Route path="register" element={ <Register /> } />
                <Route path="/profile" element={ <Profile />} />

            </Route>
        </Routes>
    )
}