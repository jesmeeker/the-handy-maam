import { useEffect, useState } from "react"
import { Link, useFetcher, useNavigate, useParams, useLocation } from "react-router-dom"



export const EditRequestForm = () => {
    const { requestId }= useParams()

    const [request, updateRequest] = useState({
        customerId: 0,
        description: "",
        specialtyId: 0,
        isComplete: false,
        dateCompleted: ""
    })
    
    const [customer, setCustomer] = useState()
    const [requestSpecialty, setSpecialty] = useState({})
    const [specialties, setSpecialties] = useState([])
    const [feedback, setFeedback] = useState("")
    const navigate = useNavigate()
    const location = useLocation()
    let user = ""

    if (location.state !== null) {user = location.state.user}
    
    useEffect(
        () => {
            fetch(`http://localhost:8088/serviceRequests/?id=${requestId}`)
            .then(res => res.json())
            .then((data) => {
                updateRequest(data[0])
            })
        },
        []
        )
        
        useEffect(
            () => {
                fetch(`http://localhost:8088/serviceRequests/?id=${requestId}&_expand=specialty`)
                .then(res => res.json())
                .then((data) => {
                    setSpecialty(data[0])
                })
            },
            []
        )

        useEffect(
            () => {
                fetch(`http://localhost:8088/customers?userId=${user.id}&_expand=user`)
                .then(res => res.json())
                .then((data) => {
                    setCustomer(data)
                })
            },
            []
        )

        useEffect(
            () => {
                fetch(`http://localhost:8088/specialties`)
                .then(res => res.json())
                .then((data) => {
                    setSpecialties(data)
                })
            },
            []
        )
    

    useEffect(() => {
    if (feedback !== "") {
        // Clear feedback to make entire element disappear after 3 seconds
        setTimeout(() => setFeedback(""), 3000);
    }
    }, [feedback])

    const localHandyMaamUser = localStorage.getItem("handymaam_user")
    const localUser = JSON.parse(localHandyMaamUser)

    // TODO: Get employee profile info from API and update state
    // useEffect(() => {
    //     fetch(`http://localhost:8088/users?id=${localUser.id}`)
    //     .then(response => response.json())
    //     .then((data) => {
    //         const userObject = data[0]
    //         updateUser(userObject)
    //     }) 
    //     fetch(`http://localhost:8088/customers?userId=${localUser.id}`)
    //     .then(response => response.json())
    //     .then((data) => {
    //         const userObject = data[0]
    //         updateCustomer(userObject)
    //     }) 
    // },
    // []
    // )

    // const handleSubmit = (event) => {
    //     event.preventDefault()
    //     fetch(`http://localhost:8088/users/${localUser.id}`, {
    //         method: "PUT",
    //         headers: {
    //             "Content-type": "application/json"
    //         },
    //         body: JSON.stringify(user)
    //    })
    //         .then(() => {
    //             fetch(`http://localhost:8088/customers/${customer.id}`, {
    //                     method: "PUT",
    //                     headers: {
    //                         "Content-type": "application/json"
    //                     },
    //                     body: JSON.stringify(customer)
    //             })
    //         })
    //             .then(() => {
    //                 setFeedback("Customer profile successfully saved")
    //             })
    // }
 
    // const updateUserCopy = (evt) => {
    //         const copy = {...user}
    //         copy[evt.target.id] = evt.target.value
    //         updateUser(copy)
    //     }
    
    // const updateCustomerCopy = (evt) => {
    //         const copy = {...customer}
    //         copy[evt.target.id] = evt.target.value
    //         updateCustomer(copy)
    //     }

    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
        }
        }, [feedback])


    const handleSaveButtonClick = (event) => {
        event.preventDefault() 
        
        // TODO: Create the object to be saved to the API

        // TODO: Perform the fetch() to POST the object to the API
    

    return fetch(`http://localhost:8088/serviceRequests/${requestId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    })
    .then(() => {
        setFeedback("Ticket information successfully updated")
    })
        .then(() => {
            setTimeout(() => navigate("/profile"), 1000);
        })
    }

    return <><div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
            {feedback}
        </div>
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Service Request</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={request?.description}
                        onChange={
                            (evt) => {
                                const copy = {...request}
                                copy.description = evt.target.value
                                updateRequest(copy)
                            }
                        }>{request.description}</textarea>
                </div>
            </fieldset>
            <br></br>
            <label htmlFor="specialty">Specialty</label><br></br>
                <select onChange={
                            (evt) => {
                                const copy = {...request}
                                copy.specialtyId = evt.target.value
                                updateRequest(copy)
                            }
                        }>
                    <option value={request.specialtyId} type="select" id="specialtyId" className="form-control" required>-{requestSpecialty?.specialty?.name}-</option>
                        {
                            specialties.map((specialty) => <option key={`specialty--${specialty.id}`} value={specialty.id}>{specialty.name}</option>)
                        }       
                </select>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit Edits
            </button>
        </form>
        </>
    
}