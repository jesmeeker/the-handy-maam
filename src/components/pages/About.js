import { useEffect, useState } from "react"
import { Employee } from "../Employees/Employee"
import { RequestButton } from "../requests/RequestButton"

export const About = () => {
    const [employees , setEmployees] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/employees?_expand=user`)
            .then(response => response.json())
            .then((employeeArray) => {
                setEmployees(employeeArray)
        })
    }, 
    []
    )

    

    return (<>
        < RequestButton /><br></br>
        <section className="subpage--section">
    <h1 className="subpage--header">About Us</h1>
    <article className='subpage--article'>
                <h2>The Beginning</h2>
                 <div>As a stay at home mother, our owner, Jessica, found herself often at home with three young children handling the household upkeep. Many times this meant welcoming service technicians and repair men into her home with no knowledge of their backgrounds and no safety net in place should something go awry. Having a background in DIY and feeling pretty handy around the house, she saw an opportunity to serve the women of her community in a meaningful way. The Handy Ma'am is woman owned and operated and exists to serve women of Middle Tennessee.</div> <br></br>
                 <h2>Growth</h2>
                 <div>The Handy Ma'am began by serving the Franklin, TN community in 2016 with just one Handy Ma'am, the founder and owner, Jessica. Since then we've grown to have a team of ten highly skilled and diverse female specialists. We serve Williamson, Davidson, Wilson, Maury, Rutherford, Cheatam, and Sumner Counties providing all services that fall under the handyman license.</div> <br></br>
                 <h2>Meet the Team</h2>
                 <section className="employees">

                 <article className="subPage--employeeList"></article>
                 {
                    employees.map(
                        (employee) => <Employee key={`employee--${employee.id}`}  
                        employeeObject={employee}  /> 
                        )
                }
                 </section>
                 </article>
            </section>
    </>)
}   