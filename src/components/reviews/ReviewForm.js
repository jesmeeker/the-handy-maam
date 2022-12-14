import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"

export const ReviewForm = () => {
    const localHandyMaamUser = localStorage.getItem("handymaam_user")
    const localUser = JSON.parse(localHandyMaamUser)
    const navigate = useNavigate()

    // const location =  useLocation()
    let {requestId} = useParams()

    const [customer, setCustomer] = useState()
    const [request, setRequest] = useState()
    const [review, setReview] = useState({
        rating: 0,
        text: "",
    })

    useEffect(() => {
            fetch(`http://localhost:8088/customers?userId=${localUser.id}&_expand=user`)
                .then(response => response.json())
                .then((data) => {
                    setCustomer(data[0])
                })
            
            fetch(`http://localhost:8088/serviceRequests?id=${requestId}&_embed=employeeRequests`)
                .then(response => response.json())
                .then((data) => {
                    setRequest(data[0])
                })
        },
        [] 
    )

    // const [review, setReview] = useState({
    //     customerId: 0,
    //     employeeId: 0,
    //     rating: 0,
    //     text: ""
    // })

    

    const handleSaveButtonClick = (event) => {
        event.preventDefault() 
        

        // TODO: Create the object to be saved to the API

        const reviewToSendToAPI = {
            customerId: customer.id,
            employeeId: request?.employeeRequests[0].employeeId,
            rating: review?.rating,
            text: review?.text,
            serviceRequestId: request?.id
        }



        // TODO: Perform the fetch() to POST the object to the API
    
    return fetch(`http://localhost:8088/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reviewToSendToAPI)
    })
        .then(response => response.json())
        .then(() => {
            navigate("/profile")
        })
    }

    const updateReview = (evt) => {
        const copy = {...review}
        copy[evt.target.id] = evt.target.value
        setReview(copy)
    }

    
    return (
        <>
            
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleSaveButtonClick}>
                <h1 className="h3 mb-3 font-weight-normal">Rate and Review your Handy Ma'am</h1>
                <label htmlFor="text"> Rating </label>
                <select onChange={updateReview} id="rating">
                    <option value={0} type="select" id="rating" className="form-control" required>0</option>
                    <option value={1} type="select" id="rating" className="form-control" required>1</option>
                    <option value={2} type="select" id="rating" className="form-control" required>2</option>
                    <option value={3} type="select" id="rating" className="form-control" required>3</option>
                    <option value={4} type="select" id="rating" className="form-control" required>4</option>
                    <option value={5} type="select" id="rating" className="form-control" required>5</option>
                </select>
                {/* <fieldset>
                    <label htmlFor="rating"> Rating</label>
                    <input onChange={updateReview}
                           type="text" id="rating" className="form-control"
                           placeholder="rating" required autoFocus />
                </fieldset> */}
                <fieldset>
                    <label htmlFor="text"> Review </label>
                    <input onChange={updateReview}
                           type="text" id="text" className="form-control"
                           placeholder="Review" required />
                </fieldset>
                <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit Review
            </button>
                </form>
        </main>
        </>
    )
}