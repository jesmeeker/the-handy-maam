import { useEffect, useState } from "react"
import { RequestButton } from "../requests/RequestButton"
import { Request } from "../requests/Request"
import { Navigate, useNavigate } from "react-router-dom"

export const CustomerProfile = ({ UserId, currentUser }) => {
    const [customer, setCustomer] = useState({})
    const [customerRequests, setCustomerRequests] = useState([])
    const [customerReviews, setCustomerReviews] = useState([])
    const [employees, setEmployees] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:8088/customers?userId=${UserId}&_expand=user`)
        .then(response => response.json())
        .then((data) => {
            setCustomer(data[0])
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
        fetch(`http://localhost:8088/serviceRequests?customerId=${customer.id}&_embed=employeeRequests`)
        .then(response => response.json())
        .then((data) => {
            setCustomerRequests(data)
        }) 
    },
    [customer]
    )

    useEffect(() => {
        fetch(`http://localhost:8088/reviews?customerId=${customer.id}`)
        .then(response => response.json())
        .then((data) => {
            setCustomerReviews(data)
        }) 
    },
    [customer]
    )

    const getAllRequests = () => {
        fetch(`http://localhost:8088/serviceRequests?customerId=${customer.id}_embed=employeeRequests`)
            .then(response => response.json())
            .then((ticketArray) => {
                setCustomerRequests(ticketArray)
            })
    }

    // useEffect(
    //     () => {
    //         getAllRequests()

    //         fetch(`http://localhost:8088/employees?_expand=user`)
    //         .then(response => response.json())
    //         .then((employeeArray) => {
    //             setEmployees(employeeArray)
    //         })
    //     },
    //     [customer]
    // )

    // const requestOptions = (complete) => {
    //     if (complete) {
    //         return <button>See Details</button>
    //     } else {
    //         return <button>Edit Request</button>
    //     }
    // }

    let i = 1
    return <>
                < RequestButton /><br></br>
                    <section className="subpage--section">
                        <h1 className="subpage--header">My Profile</h1>
                            
                            <h1 className="subpage--header">My info</h1>
                                <button
                                    onClick={() =>
                                        navigate("/profile/edit")}>Edit</button>
                                {/* this button will go to EditProfileForm */}
                                <br></br> 
                                        <div>{customer?.user?.firstName} {customer?.user?.lastName}</div>
                                        <div>{customer?.streetAddress}</div> 
                                        <div>{customer?.city} , {customer?.stateCode} {customer?.zipCode}</div> 
                                        <br></br>
                                        <div>{customer?.user?.email}</div>
                                        <div>{customer?.phoneNumber}</div>
                             <h1 className="subpage--header">My Requests</h1>
                             <br></br> 
                             <article className="requests">
                                {
                                    customerRequests.map(
                                        (request) => <Request 
                                            requestNumber={i++}
                                            currentUser={currentUser}
                                            requestObject={request}
                                            employees={employees}
                                            getAllRequests={getAllRequests} />
                                            )
                                }
                            </article>
                             <h1 className="subpage--header">My Reviews</h1>
                             <br></br> 
                             <br></br> 
                                {
                                    customerReviews.map((review) => <div>
                                        {review?.text}
                                    </div>)
                                }
                                

                            
                    </section>
            </>
    
}