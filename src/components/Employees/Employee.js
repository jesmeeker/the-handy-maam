import { Link } from "react-router-dom"

export const Employee = ({employeeObject}) => {
    
        return <section className="employeeCard">
                                <Link to={`/employees/${employeeObject.id}`}>
                                        <img src={employeeObject.user.image} alt={employeeObject.user.firstName} className="employeeImg" width="200px"></img>
                                </Link>
                        <section className="employeeTitle">
                                <article><Link className="employeeLink" to={`/employees/${employeeObject.id}`}>
                                        {employeeObject?.user.firstName} {employeeObject?.user.lastName}</Link>, {employeeObject?.title}</article><br></br>
                        </section>
                        <br></br>
                        <section>
                                <div>{employeeObject?.bio}</div>
                        </section>
                </section>
}