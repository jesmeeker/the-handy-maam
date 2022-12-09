import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"


export const EmployeeDetails = () => {
    const {employeeId} = useParams()
    // This variable is passed from the route that was set up. useParams is pulling that object and deconstructing it here

    const [employee, updateEmployee] = useState()
    const [specialty, updateSpecialty] = useState()

    useEffect(
        () => {
            fetch(`http://localhost:8088/employees?${employeeId}&_expand=user`)
                .then(response => response.json())
                .then((data) => {
                    const singleEmployee = data[0]
                    updateEmployee(singleEmployee)
                })
        },
        [employeeId]
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/specialties?${employee?.specialtyId}`)
            .then(response => response.json())
                .then((data) => {
                    const singleEmployee = data[0]
                    updateSpecialty(singleEmployee)
                })
        }
    )

    return <section className="employee">
    <section className="employee--detail">
    `<img src={employee?.user.image} alt={employee?.user.firstName} className="employeeImg" width="200px"></img>`
    <br></br>   
    <header className="employee__header">{employee?.user.firstName} {employee?.user.lastName}</header>
    <div>Specialty: {specialty?.name}</div><br></br>

    <div>{employee?.bio}</div><br></br>
    </section>
    {/* <footer className="employee__footer">Currently working on {employee?.employeeTickets.length} tickets</footer> */}
    </section>
}