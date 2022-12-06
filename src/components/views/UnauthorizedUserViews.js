import { Outlet, Route, Routes } from "react-router-dom"
import { Register } from "../auth/Register"




export const UnauthorizedUserViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>The Handy Ma'am</h1>
                    <div>Run by women, for women.</div>

                    <Outlet />
                </>
            }>
                <Route path="register" element={ <Register /> } />

            </Route>
        </Routes>
    )
}