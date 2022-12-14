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

    let charMax = 30
    let i = 1

    return <>
                < RequestButton /><br></br>
                <section className="subpage--section">                
                    <article className='subpage--article'>
                        <h1 className="subpage--header">My Profile</h1>
                            <h2 className="subpage--subheader">My Info</h2>
                                <article className="subpage--profile">
                                    <div>{customer?.user?.firstName} {customer?.user?.lastName}</div>
                                    <div>{customer?.streetAddress}</div> 
                                    <div>{customer?.city} , {customer?.stateCode} {customer?.zipCode}</div> 
                                    <br></br>
                                    <div>{customer?.user?.email}</div>
                                    <div>{customer?.phoneNumber}</div>
                                        <button
                                            onClick={() =>
                                                navigate("/profile/edit")}>Edit
                                        </button>
                                            <br></br> 
                                </article>
                            <h2 className="subpage--subheader">My Requests</h2>
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
                            <h2 className="subpage--subheader">My Reviews</h2>
                                    <br></br> 
                                    <br></br> 
                                <article className="reviews">
                                    {
                                        customerReviews.map((review) => <div>
                                            `${review?.text.substring(0, charMax)}...``
                                        </div>)
                                    }    
                                </article>
                    </article>    
                </section>
            </>
    
}