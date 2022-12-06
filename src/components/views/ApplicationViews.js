import { CustomerViews } from './CustomerViews'
import { EmployeeViews } from './EmployeeViews'
import { UnauthorizedUserViews } from './UnauthorizedUserViews'



export const ApplicationViews = () => {

	const localHandyMaamUser = localStorage.getItem("handymaam_user")
    const localUser = JSON.parse(localHandyMaamUser)
        
    if (!localUser) {
        return <>
			<UnauthorizedUserViews />  
        </>
    } 
    else if (localUser.staff) {
        return <>
        	<EmployeeViews />
        </>
    } 
	else {
		return <>
			<CustomerViews />
		</>
	}
}
