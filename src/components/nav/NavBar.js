import { CustomerNav } from "./CustomerNav"
import { EmployeeNav } from "./EmployeeNav"
import { UnauthorizedUserNav } from "./UnauthorizedNav"
import "./NavBar.css"


export const NavBar = () => {
    const localHandyMaamUser = localStorage.getItem("handymaam_user")
    const localUser = JSON.parse(localHandyMaamUser)
        
    if (!localUser) {
        return <>
			<UnauthorizedUserNav />  
        </>
    } 
    else if (localUser.staff) {
        return <>
        	<EmployeeNav />
        </>
    } 
	else {
		return <>
			<CustomerNav />
		</>
	}
}
