import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export const RequestForm = ({state}) => {
    const [customer, setCustomer] = useState()

    const [request, updateRequest] = useState({
        customerId: 0,
        description: "",
        specialtyId: 0,
        isComplete: false,
        dateCompleted: "",
        invoiceId: 0
    })

    const [specialties, setSpecialties] = useState([])
    const location = useLocation()

   
    let from = null
    console.log(from)

    if (location.state !== null) {from = location.state}
    console.log(from)
    
    const navigate = useNavigate()

    const localHandyMaamUser = localStorage.getItem("handymaam_user")
    const localUser = JSON.parse(localHandyMaamUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/specialties`)
            .then(res => res.json())
            .then((specialtiesArray) => {
                setSpecialties(specialtiesArray)
            })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user&_embed=user&userId=${localUser.id}`)
            .then(res => res.json())
            .then((data) => {
                const singleCustomer = data[0]
                setCustomer(singleCustomer)
            })
        },
        []
    )



    const handleSaveButtonClick = (event) => {
        event.preventDefault() 
        
        // TODO: Create the object to be saved to the API

    const requestToSendToTheAPI = {
        customerId: customer.id,
        description: request.description,
        specialtyId: request.specialtyId,
        isComplete: false,
        dateCompleted: "",
        invoiceId: 0
    }


        // TODO: Perform the fetch() to POST the object to the API
    
    return fetch(`http://localhost:8088/serviceRequests`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestToSendToTheAPI)
    })
        .then(response => response.json())
        .then(() => {
            navigate("/success")
        })
    }

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Service Request</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief description of problem"
                        value={request.description}
                        onChange={
                            (evt) => {
                                const copy = {...request}
                                copy.description = evt.target.value
                                updateRequest(copy)
                            }
                        } />
                </div>
            </fieldset>
            <label htmlFor="specialty">Specialty</label><br></br>
                <select onChange={
                            (evt) => {
                                const copy = {...request}
                                copy.specialtyId = evt.target.value
                                updateRequest(copy)
                            }
                        }>
                    <option value={0} type="select" id="specialtyId" className="form-control" required>choose a specialty</option>
                        {
                            specialties.map((specialty) => <option key={`specialty--${specialty.id}`} value={specialty.id}>{specialty.name}</option>)
                        }       
                </select>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit Request
            </button>
        </form>
    )
}