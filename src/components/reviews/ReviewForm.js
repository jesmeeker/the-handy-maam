import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"

export const ReviewForm = () => {
    const location =  useLocation()
    let {requestId} = useParams()
    const [customer, setCustomer] = useState({})

    let userId = ""

    if (location.state !== null) {userId = parseInt(location?.state?.userId)
}

    

    useEffect(() => {
            fetch(`http://localhost:8088/customers?userId=${userId}&_expand=user`)
                .then(response => response.json())
                .then((data) => {
                    setCustomer(data[0])
        })},[] 
    )

    const [review, updateReview] = useState({
        // customerId: customer.id,
        // employeeId: requestObject?.employeeRequests?.employeeId,
        // rating: 0,
        // text: ""
    })
    // const handleRegister = (e) => {
    //     e.preventDefault()

    //     return fetch(`http://localhost:8088/users?email=${user.email}`)
    //         .then(res => res.json())
    //         .then(response => {
    //             if (response.length > 0) {
    //                 // Duplicate email. No good.
    //                 window.alert("Account with that email address already exists")
    //             }
    //             else {
    //                 // Good email, create user.
    //                 registerNewUser()
    //             }
    //         })
            
    // }

    // const updateUser = (evt) => {
    //     const copy = {...user}
    //     copy[evt.target.id] = evt.target.value
    //     setUser(copy)
    // }

    // const updateCustomer = (evt) => {
    //     const copy = {...customer}
    //     copy[evt.target.id] = evt.target.value
    //     setCustomer(copy)
    // }

    // const updateCustomerUserId = () => {
    //     const copy
    // }
    return (
        <>
            
        {/* <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register</h1>
                <div>Already a user?</div><Link to="/login" state={{ from: `${from}/register` }}>Sign in</Link>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input onChange={updateUser}
                           type="text" id="firstName" className="form-control"
                           placeholder="First name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input onChange={updateUser}
                           type="text" id="lastName" className="form-control"
                           placeholder="Last name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateUser}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="streetAddress"> Street Address</label>
                    <input onChange={updateCustomer}
                        type="text" id="streetAddress" className="form-control"
                        placeholder="Street Address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="city"> City</label>
                    <input onChange={updateCustomer}
                        type="text" id="city" className="form-control"
                        placeholder="City" required />
                </fieldset>
                <label htmlFor="state">State</label><br></br>
                <select onChange={updateCustomer}>
                    <option value={0} type="select" id="stateId" className="form-control" required>choose your state</option>
                        {
                            states.map((state) => <option key={`state--${state.id}`} value={state.id}>{state.code}</option>)
                        }       
                </select>
                <fieldset>
                    <label htmlFor="zipCodeId"> Zip Code</label>
                    <input onChange={updateUser}
                        type="text" id="zipCodeId" maxLength={5} className="form-control"
                        placeholder="Zip Code" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="phoneNumber"> Phone Number</label>
                    <input onChange={updateCustomer} 
                        type="text" id="phoneNumber" maxLength={14} className="form-control"
                        placeholder="Phone Number" required />
                </fieldset>
                <fieldset>
                    <button type="submit"
                    onClick={(clickEvent) => handleRegister(clickEvent)}
                    className="btn btn-primary">Register </button>
                </fieldset>
            </form>
        </main> */}

                    </>
    )
}