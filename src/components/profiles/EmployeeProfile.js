import React, { useEffect, useState } from "react"
import { RequestButton } from "../requests/RequestButton"
import { Request } from "../requests/Request"
import { Link, Navigate, useNavigate } from "react-router-dom"
import ToggleSwitch from "../Switches/ToggleSwitch"
import { ImageUpload } from "../images/ImageUpload"

export const EmployeeProfile = ({ UserId, currentUser }) => {
    const [employee, setEmployee] = useState({})
    // const [value, setValue] = useState(true)
    const [requests, setRequests] = useState([])
    const [employeeRequests, setEmployeeRequests] = useState([])
    const [filteredRequests , setFilteredRequests] = useState([])
    const [employeeReviews, setEmployeeReviews] = useState([])
    const [employees, setEmployees] = useState([])
    const [specialty, setSpecialty] = useState()

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

    useEffect(
        () => {
            fetch(`http://localhost:8088/specialties/?id=${employee?.specialtyId}`)
            .then(response => response.json())
                .then((data) => {
                    const singleEmployee = data[0]
                    setSpecialty(singleEmployee)
                })
        },
        [employee]
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

    // useEffect(() => {
    //     fetch(`http://localhost:8088/reviews?employeeId=${employee.id}`)
    //     .then(response => response.json())
    //     .then((data) => {
    //         setEmployeeReviews(data)
    //     }) 
    // },
    // [employee]
    // )

    // useEffect(
    //     () => {

    //         getAllRequests()

    //         if (value === true) {
    //             setFilteredRequests(requests)
    //         }
    //         else {
    //             setFilteredRequests(employeeRequests)
    //         }
    //     },
    //     [value]
    // )

    const getAllRequests = () => {
        fetch(`http://localhost:8088/serviceRequests`)
            .then(response => response.json())
            .then((data) => {
                setRequests(data)
            })
    }

    let i = 1

    function refreshPage() {
        window.location.reload(false)
      }

    return <>
                <section className="subpage--section">                
                    <article className='subpage--article'>
                        {/* <h1 className="subpage--header">My Profile</h1> */}

                            <section className="profileCard">
                        <div className="profileImage">

                            <img src={employee?.user?.image} alt={employee?.user?.firstName} className="employeeImg" width="200px"></img>
                            <Link class="siteLinks" to="/profile/edit"><div class="position-absolute color-bg-default rounded-2 color-fg-default px-2 py-1 left-0 bottom-0 ml-2 mb-2 border">
                                    <svg aria-hidden="true" height="16" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M11.013 1.427a1.75 1.75 0 012.474 0l1.086 1.086a1.75 1.75 0 010 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 01-.927-.928l.929-3.25a1.75 1.75 0 01.445-.758l8.61-8.61zm1.414 1.06a.25.25 0 00-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 000-.354l-1.086-1.086zM11.189 6.25L9.75 4.81l-6.286 6.287a.25.25 0 00-.064.108l-.558 1.953 1.953-.558a.249.249 0 00.108-.064l6.286-6.286z"></path>
                                    </svg>
                                    Edit Profile
                            </div>
                            </Link>
                        </div>
                        <article className="subpage--profile">
                                    <div><span style={{ fontWeight: 'bold' }}>Name: {employee?.user?.firstName} {employee?.user?.lastName}</span></div>
                                    <div>{employee?.title}</div> <br></br>
                                    <div>Specializes in {specialty?.name}</div><br></br>
                                    <div>Pay Rate: ${employee?.hourlyRate}/hour</div> 
                                    <br></br>
                                    <div>Email: {employee?.user?.email}</div><br></br>
    <div>
        {/*     */}
    </div>
                                        {/* <button
                                            onClick={() =>
                                                navigate("/profile/edit")}>Edit
                                        </button> */}
                                            <br></br> 
                                            
                                </article>
                              </section> 
                            {/* <h2 className="subpage--subheader">Requests</h2>
                                <section><React.Fragment>
                                    <ToggleSwitch value={value} setValue={setValue}
                                    label="All Requests" label2="My Requests"/>
                                </React.Fragment></section>
                                <article className="requests">
                                    {
                                        filteredRequests.map(
                                            (request) => <Request 
                                                currentUser={currentUser}
                                                requestObject={request}
                                                employees={employees}
                                                getAllRequests={getAllRequests}
                                                value={value} 
                                                requestNumber={i++}
                                                />
                                                )
                                    }</article> */}

                            {/* <h2 className="subpage--subheader">My Reviews</h2>
                                    <br></br> 
                                    <br></br> 
                                <article className="reviews">
                                    {
                                        employeeReviews.map((review) => <div>
                                            `${review?.text.substring(0, charMax)}...``
                                        </div>)
                                    }    
                                </article> */}
                    </article>    
                </section>
            </>
    
}