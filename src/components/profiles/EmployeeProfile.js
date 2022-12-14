import React, { useEffect, useState } from "react"
import { RequestButton } from "../requests/RequestButton"
import { Request } from "../requests/Request"
import { Navigate, useNavigate } from "react-router-dom"
import ToggleSwitch from "../Switches/ToggleSwitch"

export const EmployeeProfile = ({ UserId, currentUser }) => {
    const [employee, setEmployee] = useState({})
    const [value, setValue] = useState(true)
    const [requests, setRequests] = useState([])
    const [employeeRequests, setEmployeeRequests] = useState([])
    const [filteredRequests , setFilteredRequests] = useState([])
    const [employeeReviews, setEmployeeReviews] = useState([])
    const [employees, setEmployees] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:8088/employees?userId=${UserId}&_expand=user&_expand=specialty`)
        .then(response => response.json())
        .then((data) => {
            setEmployee(data[0])
        }) 
        fetch(`http://localhost:8088/employees?_expand=user`)
        .then(response => response.json())
        .then((data) => {
            setEmployees(data)
        }) 
    },
    []
    )

    useEffect(() => {
        fetch(`http://localhost:8088/serviceRequests?_embed=employeeRequests`)
        .then(response => response.json())
        .then((data) => {
            setRequests(data)
            setFilteredRequests(data)
        }) 
    },
    []
    )

    useEffect(() => {
        fetch(`http://localhost:8088/employeeRequests?employeeId=${employee.id}&_expand=serviceRequest`)
        .then(response => response.json())
        .then((data) => {
            setEmployeeRequests(data)
        }) 
    },
    [employee]
    )

    useEffect(() => {
        fetch(`http://localhost:8088/reviews?employeeId=${employee.id}`)
        .then(response => response.json())
        .then((data) => {
            setEmployeeReviews(data)
        }) 
    },
    [employee]
    )

    useEffect(
        () => {

            getAllRequests()

            if (value === true) {
                setFilteredRequests(requests)
            }
            else {
                setFilteredRequests(employeeRequests)
            }
        },
        [value]
    )

    const getAllRequests = () => {
        fetch(`http://localhost:8088/serviceRequests`)
            .then(response => response.json())
            .then((data) => {
                setRequests(data)
            })
    }

    let charMax = 30
    let i = 1

    return <>
                <section className="subpage--section">                
                    <article className='subpage--article'>
                        <h1 className="subpage--header">My Profile</h1>
                            <h2 className="subpage--subheader">My Info</h2>
                                <article className="subpage--profile">
                                    <div>Name: {employee?.user?.firstName} {employee?.user?.lastName}</div>
                                    <div>Title: {employee?.title}/hour</div> 
                                    <div>Pay Rate: ${employee?.hourlyRate}/hour</div> 
                                    <div>Specialty: {employee?.specialty?.name}</div> 
                                    <br></br>
                                    <div>Email: {employee?.user?.email}</div>
                                        <button
                                            onClick={() =>
                                                navigate("/profile/edit")}>Edit
                                        </button>
                                            <br></br> 
                                </article>
                            <h2 className="subpage--subheader">Requests</h2>
                                <section><React.Fragment>
                                    <ToggleSwitch value={value} setValue={setValue}
                                    label="All Requests" label2="My Requests"/>
                                </React.Fragment></section>
                                    {/* PUT A TOGGLE HERE  FOR MY/ALL REQUESTS*/}
                                <article className="requests">
                                    {
                                        filteredRequests.map(
                                            (request) => <Request 
                                                currentUser={currentUser}
                                                requestObject={request}
                                                employees={employees}
                                                getAllRequests={getAllRequests}
                                                value={value} 
                                                requestNumber={i++}/>
                                                )
                                    }
                                </article>
                            <h2 className="subpage--subheader">My Reviews</h2>
                                    <br></br> 
                                    <br></br> 
                                <article className="reviews">
                                    {
                                        employeeReviews.map((review) => <div>
                                            `${review?.text.substring(0, charMax)}...``
                                        </div>)
                                    }    
                                </article>
                    </article>    
                </section>
            </>
    
}