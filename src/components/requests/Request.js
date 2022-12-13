import { Link, Navigate, useNavigate } from "react-router-dom"

export const Request = ({ requestObject , currentUser , employees , getAllRequests , requestNumber}) => {

    let assignedEmployee = null
    let navigate = useNavigate()

    if (requestObject.employeeRequests.length > 0) {
        const requestEmployeeRelationship = requestObject.employeeRequests[0]
        assignedEmployee = employees.find(employee => employee.id === requestEmployeeRelationship.employeeId)
    }

    const userEmployeeId = employees.find(employee => employee.userId === currentUser.id)

    // const canClose = () => {
    //     if (currentUser.staff){
    //     if (userEmployeeId?.id === assignedEmployee?.id && requestObject.dateCompleted === "") {
    //         return <button className="ticket__finish"
    //                 onClick={closeTicket}
    //                 >Close Request</button>
    //     } else {
    //         return ""
    //             }        
    //     }
    // }
    
    const deleteButton = () => {
        if (!currentUser.staff && !requestObject.isComplete) {
            return <button onClick={() => {
                fetch(`http://localhost:8088/serviceRequests/${requestObject.id}`, {
                    method: "DELETE",
                })
                    .then(() => {
                        getAllRequests()
                    })
            }} className="ticket__delete">Cancel Request</button> 
        } 
        else if (currentUser.staff && !requestObject.isComplete) {
            return <button onClick={() => {
                fetch(`http://localhost:8088/serviceRequests/${requestObject.id}`, {
                    method: "DELETE",
            })
                .then(() => {
                    getAllRequests()
                })
            }} className="ticket__delete">Deny Request</button>
        }
        else {
            return <button onClick={() => {
            }} className="ticket__delete">See Details</button>
        }
    }

    const editButton = () => {
        if (!currentUser.staff && !requestObject.isComplete) {
            return <Link to={`/request/${requestObject.id}/edit`} state={{ user: {currentUser}}}>Edit
                    </Link>
            }
            else {
                return ""
            }   
        }

    // const closeTicket = () => {
    //     const copy = {
    //         userId: requestObject.id,
    //         description: requestObject.description,
    //         emergency: requestObject.emergency,
    //         dateCompleted: new Date()
    //     }

    //     fetch(`http://localhost:8088/serviceTickets/${requestObject.id}`, {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(copy)

    //     })
    //         .then(response => response.json)
    //         .then(getAllRequests)
    // }

    // const buttonOrNoButton = () => {
    //     if (currentUser.staff) {
    //         return <button
    //                         onClick={() => {
    //                             fetch(`http://localhost:8088/employeeTickets`, {
    //                                 method: "POST",
    //                                 headers: {
    //                                     "Content-Type": "application/json"
    //                                 },
    //                                 body: JSON.stringify({
    //                                     employeeId: userEmployeeId.id,
    //                                     serviceTicketId: requestObject.id
    //                                 })
    //                             })
    //                                 .then(response => response.json())
    //                                 .then(() => {
    //                                     getAllRequests()
    //                                 })
    //                         }}
    //                         >Claim</button>
    //     } else {
    //         return ""
    //     }
    // }

    return <section key={`key--${requestObject.id}`} className="ticket">
            <header>Request {requestNumber}</header>
                <section>{requestObject.description}</section>
            <footer>
                {
                    requestObject?.employeeRequests.length
                        ? `IN PROCESS: assigned to ${assignedEmployee !== null ? assignedEmployee?.user?.firstName : ""}`
                        :  ""
                        // buttonOrNoButton()
                }
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
}