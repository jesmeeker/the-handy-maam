import { CustomerProfile } from "./CustomerProfile"
import { EmployeeProfile } from "./EmployeeProfile"

export const Profile = () => {
    const localHandyMaamUser = localStorage.getItem("handymaam_user")
    const localUser = JSON.parse(localHandyMaamUser)

    if (localUser.staff) {
        return <>
        	<EmployeeProfile UserId={localUser.id} currentUser={localUser}/>
        </>
    } 
	else {
		return <>
			<CustomerProfile UserId={localUser.id} currentUser={localUser}/>
		</>
	}
}