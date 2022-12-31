import { Outlet, Route, Routes } from "react-router-dom"
import { Login } from "../auth/Login"
import { Main } from "../pages/Main"
import { EditProfileForm } from "../profiles/EditProfileForm"
import { Profile } from "../profiles/Profile"
import { RequestDetail } from "../requests/RequestDetail"
import { RequestPage } from "../requests/RequestPage"
import { ReviewPage } from "../reviews/ReviewPage"

export const EmployeeViews = () => {
	return <>
        <Routes>
            
            <Route path="*" element={
				<>
                <Outlet />
            </>
        }>
				<Route path="*" element={ <Main />} />
				<Route path="login" element={ <Login />} />
                <Route path="profile" element={ <Profile />} />
                <Route path="profile/edit" element={ <EditProfileForm />} />
                <Route path="request/:id" element={ <RequestDetail/>}  />
                <Route path="requests" element={ <RequestPage />} />

                <Route path="reviews" element={ <ReviewPage />} />
            </Route>
        </Routes>
    </>
}
