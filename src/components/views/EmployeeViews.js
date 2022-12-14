import { Outlet, Route, Routes } from "react-router-dom"
import { Login } from "../auth/Login"
import { Main } from "../pages/Main"
import { EditProfileForm } from "../profiles/EditProfileForm"
import { Profile } from "../profiles/Profile"
import { RequestDetail } from "../requests/RequestDetail"

export const EmployeeViews = () => {
	return <>
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
                <Route path="profile/edit" element={ <EditProfileForm />} />
                <Route path="request/:id" element={ <RequestDetail/>}  />
            </Route>
        </Routes>
    </>
}
