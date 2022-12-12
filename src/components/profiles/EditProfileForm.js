import { useEffect, useState } from "react"
import { Link, useFetcher, useRevalidator } from "react-router-dom"


export const EditProfileForm = () => {
    // TODO: Provide initial state for profile
    const [states, setStates] = useState([])
    const [user, updateUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        zipCodeId: 0,
        image: ""
    })

    const [customer, updateCustomer] = useState({
        streetAddress: "",
        city: "",
        phoneNumber: "",
        stateCode: "",
        userId: ""
    })

    const [feedback, setFeedback] = useState("")

    useEffect(
        () => {
            fetch(`http://localhost:8088/states`)
            .then(res => res.json())
            .then((statesArray) => {
                setStates(statesArray)
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
    useEffect(() => {
        fetch(`http://localhost:8088/users?id=${localUser.id}`)
        .then(response => response.json())
        .then((data) => {
            const userObject = data[0]
            updateUser(userObject)
        }) 
        fetch(`http://localhost:8088/customers?userId=${localUser.id}`)
        .then(response => response.json())
        .then((data) => {
            const userObject = data[0]
            updateCustomer(userObject)
        }) 
    },
    []
    )

    const handleSubmit = (event) => {
        event.preventDefault()
        fetch(`http://localhost:8088/users/${localUser.id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(user)
       })
            .then(() => {
                fetch(`http://localhost:8088/customers/${customer.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify(customer)
                })
            })
                .then(() => {
                    setFeedback("Customer profile successfully saved")
                })
    }
 
    const updateUserCopy = (evt) => {
            const copy = {...user}
            copy[evt.target.id] = evt.target.value
            updateUser(copy)
        }
    
    const updateCustomerCopy = (evt) => {
            const copy = {...customer}
            copy[evt.target.id] = evt.target.value
            updateCustomer(copy)
        }

    return (
        <>
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleSubmit}>
                <h1 className="h3 mb-3 font-weight-normal">Update your info</h1>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input onChange={updateUserCopy}
                           type="text" id="firstName" className="form-control"
                           placeholder="First name" 
                           value={user.firstName}
                           required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input onChange={updateUserCopy}
                           type="text" id="lastName" className="form-control"
                           placeholder="Last name" 
                           value={user.lastName}
                           required />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateUserCopy}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" 
                        value={user.email}
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="streetAddress"> Street Address</label>
                    <input onChange={updateCustomerCopy}
                        type="text" id="streetAddress" className="form-control"
                        placeholder="Street Address" 
                        value={customer.streetAddress}
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="city"> City</label>
                    <input onChange={updateCustomerCopy}
                        type="text" id="city" className="form-control"
                        placeholder="City" 
                        value={customer.city}
                        required />
                </fieldset>
                <label htmlFor="state">State</label><br></br>
                <select onChange={updateCustomerCopy}>
                    <option value={customer.stateCode} type="select" id="stateId" className="form-control" required>{customer.stateCode}</option>
                        {
                            states.map((state) => <option key={`state--${state.id}`} value={state.id}>{state.code}</option>)
                        }       
                </select>
                <fieldset>
                    <label htmlFor="zipCodeId"> Zip Code</label>
                    <input onChange={updateUserCopy}
                        type="text" id="zipCodeId" maxLength={5} className="form-control"
                        placeholder="Zip Code" 
                        value={user.zipCodeId}required />
                </fieldset>
                <fieldset>
                    <label htmlFor="phoneNumber"> Phone Number</label>
                    <input onChange={updateCustomerCopy} 
                        type="text" id="phoneNumber" maxLength={14} className="form-control"
                        placeholder="Phone Number" 
                        value={customer.phoneNumber}
                        required />
                </fieldset>
                <fieldset>
                    <button type="submit"
                    onClick={(clickEvent) => handleSubmit(clickEvent)}
                    className="btn btn-primary">Update Profile </button>
                </fieldset>
            </form>
        </main>
                    </>
    )
}