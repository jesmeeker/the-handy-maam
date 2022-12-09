import { Link } from "react-router-dom"

export const Employee = ({employeeObject}) => {
    
        return <section className="employeeCard">
                `<img src={employeeObject.user.image} alt={employeeObject.user.firstName} className="employeeImg" width="200px"></img>`
                <section><Link className="employeeLink" to={`/employees/${employeeObject.id}`}>{employeeObject?.user.firstName} {employeeObject?.user.lastName}</Link></section>
                <section style={{ fontWeight: 'bold' }}>{employeeObject?.title}</section><br></br>
                <section>{employeeObject?.bio}</section>
</section>
}