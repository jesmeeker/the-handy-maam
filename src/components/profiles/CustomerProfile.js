import { useEffect, useState } from "react"
import { RequestButton } from "../requests/RequestButton"
import { Request } from "../requests/Request"
import { Link, Navigate, useNavigate } from "react-router-dom"
import fivestar from "../../assets/graphics/five_star_rating.png"
import fourstar from "../../assets/graphics/four_star_rating.png"
import threestar from "../../assets/graphics/three_star_rating.png"
import twostar from "../../assets/graphics/two_star_rating.png"
import onestar from "../../assets/graphics/one_star_rating.png"

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
        fetch(`http://localhost:8088/serviceRequests?customerId=${customer.id}&_embed=employeeRequests&_embed=reviews&_expand=specialty`)
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
        fetch(`http://localhost:8088/serviceRequests?customerId=${customer.id}&_embed=employeeRequests&_embed=reviews&_embed=specialties`)
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
                        {/* <h1 className="subpage--header">My Profile</h1> */}
                        <h2 className="subpage--subheader">My Info</h2>
                        <section className="profileCard">
                            <div className="profileImage">
                            <img src={customer?.user?.image} alt={customer?.user?.firstName} className="employeeImg" />
                            <Link className="siteLinks" to="/profile/edit"><div className="position-absolute color-bg-default rounded-2 color-fg-default px-2 py-1 left-0 bottom-0 ml-2 mb-2 border">
                                    <svg aria-hidden="true" height="16" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M11.013 1.427a1.75 1.75 0 012.474 0l1.086 1.086a1.75 1.75 0 010 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 01-.927-.928l.929-3.25a1.75 1.75 0 01.445-.758l8.61-8.61zm1.414 1.06a.25.25 0 00-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 000-.354l-1.086-1.086zM11.189 6.25L9.75 4.81l-6.286 6.287a.25.25 0 00-.064.108l-.558 1.953 1.953-.558a.249.249 0 00.108-.064l6.286-6.286z"></path>
                                    </svg>
                                    Edit Profile
                            </div>
                            </Link>
                            </div>
                                <article className="subpage--profile">
                                    <div><span style={{ fontWeight: 'bold' }}>{customer?.user?.firstName} {customer?.user?.lastName}</span></div><br></br>
                                    <div>{customer?.streetAddress}</div> 
                                    <div>{customer?.city} , {customer?.stateCode} {customer?.user?.zipCode}</div> 
                                    <br></br>
                                    <div>{customer?.user?.email}</div>
                                    <div>{customer?.phoneNumber}</div><br></br>
                                        
                                            <br></br> 
                                </article>
                        </section>
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
                                        customerReviews.map((review) => {
                                            let image = 0

                                            if (review.rating === "5") {
                                                image = fivestar
                                            } else if (review.rating === "4") {
                                                image = fourstar
                                            } else if (review.rating === "3") {
                                                image = threestar
                                            } else if (review.rating === "2") {
                                                image = twostar
                                            } else if (review.rating === "1") {
                                                image = onestar
                                            } else { image = null}
                                            
                                            return <div>
                                            <article className="requestCard"><header className="reviewHeader">{review?.title}</header><img src={image} alt={image} className="reviewStars" width="100" height="20"/> <br></br>
                                            <div>
                                                "{review?.text}"
                                                </div>
                                            <button className="requestButtons"><Link className="requestbuttonlink" to={`/review/${review.id}/edit`}>Edit
                    </Link>
                    </button></article>
                                        </div>})

                                    }    
                                </article>
                    </article>    
                </section>
            </>
    
}