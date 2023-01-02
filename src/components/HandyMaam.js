import { Route, Routes } from "react-router-dom"
import { Authorized } from "./views/Authorized"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import "./HandyMaam.css"
import { Footer } from "./nav/Footer"



export const HandyMaam = () => {
	return <Routes>
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<Register />} />

		<Route path="*" element={
			<Authorized>
				<><div id="content-wrap">
					<NavBar />
					<ApplicationViews />
   				</div>
   			<Footer />
				</>
			</Authorized>

		} />
	</Routes>
}

