import { Link, Navigate, useNavigate } from "react-router-dom"

export const Request = ({ requestObject , currentUser , employees , getAllRequests , requestNumber, value }) => {
    let assignedEmployee = null
    let navigate = useNavigate()

    if (requestObject?.employeeRequests?.length > 0) {
        const requestEmployeeRelationship = requestObject.employeeRequests[0]
        assignedEmployee = employees.find(employee => employee.id === requestEmployeeRelationship.employeeId)
    }

    const userEmployee = employees.find(employee => employee.userId === currentUser.id)

    function refreshPage() {
        window.location.reload(false)
    }
    
    const canClose = () => {
        if (currentUser.staff){
        if (userEmployee?.id === assignedEmployee?.id && requestObject.dateCompleted === "") {
            return <button className="ticket__finish"
                    onClick={closeTicket}
                    >Close</button>
        } else {
            return ""
                }        
        }
    }
    
    const deleteButton = () => {
        if (!currentUser.staff && !requestObject.isComplete) {
            return <button onClick={() => {
                fetch(`http://localhost:8088/serviceRequests/${requestObject.id}`, {
                    method: "DELETE",
                })
                    .then(() => {
                        getAllRequests()
                    })
                    .then(refreshPage)
            }} className="ticket__delete">Cancel Request</button> 
        } 
        else if (currentUser.staff && !requestObject.isComplete && requestObject?.employeeRequests.length === 0) {
            return <button onClick={() => {
                fetch(`http://localhost:8088/serviceRequests/${requestObject.id}`, {
                    method: "DELETE",
            })
                .then(() => {
                    getAllRequests()
                })
                .then(refreshPage)
            }} className="ticket__delete">Deny</button>
        }
        else {
            return ""
            // <button onClick={() => {
            // }} className="ticket__delete">Details</button>""
        }
    }

    const editButton = () => {
        if (!currentUser.staff && !requestObject.isComplete) {
            return <button><Link to={`/request/${requestObject.id}/edit`} state={{ user: {currentUser}}}>Edit
                    </Link>
                    </button>
            }
            else {
                return ""
            }   
        }

    
    const closeTicket = () => {
        const copy = {
                customerId: requestObject.customerId,
                description: requestObject.description,
                specialtyId: requestObject.specialtyId,
                dateCompleted: new Date(),
                isComplete: true,
                invoiceId: requestObject.invoiceId
            }
    
            fetch(`http://localhost:8088/serviceRequests/${requestObject.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(copy)
    
            })
                .then(response => response.json)
                .then(getAllRequests)
                .then(refreshPage)
        }
    
    const submitReviewButton = () => {
        return <button><Link to={`/request/${requestObject.id}/submitreview`} state={`{ userId: ${currentUser.id}}`}>Submit Review
                    </Link>
                    </button>
    }
    const claimButton = () => {
        if (currentUser.staff && requestObject?.employeeRequests?.length === 0) {
            return <button
                            onClick={() => {
                                fetch(`http://localhost:8088/employeeRequests`, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        employeeId: userEmployee.id,
                                        serviceRequestId: requestObject.id
                                    })
                                })
                                    .then(response => response.json())
                                    .then(() => {
                                        getAllRequests()
                                    })
                                    .then(refreshPage)
                            }}
                            >Claim Request</button>
        } else if (requestObject?.employeeRequests?.length > 0 && requestObject.isComplete === false){
            return `STATUS: IN PROCESS. Assigned to ${assignedEmployee !== null ? assignedEmployee?.user?.firstName : ""}`
        } else {
            // return `STATUS: COMPLETE. Completed by ${assignedEmployee !== null ? assignedEmployee?.user?.firstName : ""}`
            return ""
        }
    }

    let id = 0 

    if (assignedEmployee !== null) {id = assignedEmployee.id}     

    const display = () => {
        if (currentUser.staff) {
            if (value === true) {
            return <>
                    <section key={`key--${requestObject.id}`} className="ticket">
                        <header>
                            <Link to={`/request/${requestObject.id}`} state={`{ employeeId: ${id} }`}>Request {requestNumber}
                        </Link>
                        </header>
                            <section>{requestObject?.description}</section>
                        <footer>
                            {
                                claimButton()
                            }
                            {
                                editButton()
                            }
                            {
                                canClose()
                            }
                            {
                                deleteButton()
                            }
                        </footer>
                    </section>
        </>
        } else {
            return <>
                <section key={`key--${requestObject?.serviceRequest?.id}`} className="tickets">
                    <header>Request {requestNumber}</header>
                    <Link to={`/request/${requestObject.id}`} state={`{ employeeId: ${id} }`}>Request {requestNumber}
                        </Link>
                        <section>{requestObject?.serviceRequest?.description}</section>
                         <footer>
                            {
                                editButton()
                            }
                            {/* {
                                canClose()
                            } */}
                            {
                                deleteButton()
                            }
                            </footer>
                </section>
            </>
        }
    }
        else {
            return <>
                    <section key={`key--${requestObject.id}`} className="request">
                        <header>
                            <Link to={`/request/${requestObject.id}`} state={`{ employeeId: ${id} }`}>Request {requestNumber}
                        </Link>
                        </header>
                            <section>{requestObject?.description}</section>
                        <footer>
                            {
                                claimButton()
                            }
                            {
                                editButton()
                            }
                            {
                                canClose()
                            }
                            {
                                deleteButton()
                            }
                            { requestObject?.reviews.length 
                                ?   ""
                                :   submitReviewButton()
                            }
                        </footer>
                    </section>
        </>
        }
    }

    return  <>
                {
                    display()
                } 
            </>
}

