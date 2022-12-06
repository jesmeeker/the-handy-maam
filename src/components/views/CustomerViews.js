import { Outlet, Route, Routes } from "react-router-dom"
import { Register } from "../auth/Register"
import { Profile } from "../profiles/Profile"

export const CustomerViews = () => {
	return <Routes>
	<Route path="/" element={
		<>
			<h1>The Handy Ma'am</h1>
			<div>Run by women, for women.</div>

			<div>Customer View</div>

			<Outlet />
		</>
	}>
		<Route path="/profile" element={ <Profile />}></Route>
	</Route>
</Routes>
}