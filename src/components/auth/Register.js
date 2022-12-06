import { useEffect, useState } from "react"
import { isCompositeComponent } from "react-dom/test-utils"
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Register = (props) => {
    const [user, setUser] = useState({
        email: "",
        firstName: "",
        lastName: "",
        zipCodeId: 0,
        isStaff: false,
        imgage: "",
    })

    const [customer, setCustomer] = useState({
        streetAddress: "",
        city: "",
        stateId: 0,
        phoneNumber: ""
    })

    const [states, setStates] = useState([])

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

    let navigate = useNavigate()

    

    const registerNewUser = () => {
        fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then((createdUser) => {
            if (createdUser.hasOwnProperty("id")) {
                localStorage.setItem("handymaam_user", JSON.stringify({
                    id: createdUser.id,
                    staff: createdUser.isStaff}));
                        
                    fetch("http://localhost:8088/customers", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                            userId: createdUser.id
                    })
                })
                        .then((res) => res.json())
                        // .then(() => {
                        //     setTimeout(() => 5000)
                            
                        // })
                        .then((createdCustomer) => {
                            if (createdCustomer.hasOwnProperty("id")) {
                                fetch(`http://localhost:8088/customers/${createdCustomer.id}`, {
                                    method: "PATCH",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        streetAddress: customer.streetAddress,
                                        city: customer.city,
                                        stateId: customer.stateId,
                                        phoneNumber: customer.phoneNumber
                                    })
                                })
                                    .then(res => res.json())    
                                    .then(() => {
                                        navigate("/profile")
                                    })  
                            }
                            
                        })
                        
                    }}
                ) 
                
    }
    
    // const registerNewCustomer = () => {

    //     const localHandyMaamUser = localStorage.getItem("handymaam_user")
    //     const locaUserObject = JSON.parse(localHandyMaamUser)

    //     fetch(`http://localhost:8088/customers?userId=${locaUserObject.id}`, {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(customer)
    //     })
    //         .then(res => res.json())    
    //         .then(() => {
    //             navigate("/profile")
    //         })  
    // }

    const handleRegister = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${user.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
            
    }

    const updateUser = (evt) => {
        const copy = {...user}
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    const updateCustomer = (evt) => {
        const copy = {...customer}
        copy[evt.target.id] = evt.target.value
        setCustomer(copy)
    }

    // const updateCustomerUserId = () => {
    //     const copy
    // }
    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register</h1>
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
                <label htmlFor="city"> State</label><br></br>
                <select onChange={updateCustomer}>
                    <option value={0} type="select" id="stateId" className="form-control" required></option>
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
        </main>
    )
}

