import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const EditReviewForm = () => {
    const localHandyMaamUser = localStorage.getItem("handymaam_user")
    const localUser = JSON.parse(localHandyMaamUser)

    const navigate = useNavigate()

    // const location =  useLocation()
    let {reviewId} = useParams()

    // const [customer, setCustomer] = useState()
    // const [request, setRequest] = useState()
    const [review, setReview] = useState({
        rating: 0,
        text: "",
        title: ""
    })

    useEffect(
        () => {
            fetch(`http://localhost:8088/reviews/?id=${reviewId}`)
            .then(res => res.json())
            .then((data) => {
                setReview(data[0])
            })
        },
        []
        )

    // useEffect(() => {
    //         fetch(`http://localhost:8088/customers?userId=${localUser.id}&_expand=user`)
    //             .then(response => response.json())
    //             .then((data) => {
    //                 setCustomer(data[0])
    //             })
            
    //         fetch(`http://localhost:8088/serviceRequests?id=${requestId}&_embed=employeeRequests`)
    //             .then(response => response.json())
    //             .then((data) => {
    //                 setRequest(data[0])
    //             })
    //     },
    //     [] 
    // )

    // const [review, setReview] = useState({
    //     customerId: 0,
    //     employeeId: 0,
    //     rating: 0,
    //     text: ""
    // })

    

    const handleSaveButtonClick = (event) => {
        event.preventDefault() 
        

        // TODO: Create the object to be saved to the API

       



        // TODO: Perform the fetch() to POST the object to the API
    
    return fetch(`http://localhost:8088/reviews/${reviewId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(review)
    })
        .then(() => {
            navigate("/profile")
        })
    }

    
    return (
        <>
            
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleSaveButtonClick}>
                <h1 className="h3 mb-3 font-weight-normal">Rate and Review your Handy Ma'am</h1>
                <label htmlFor="rating">Rating</label><br></br>
                <select onChange={
                            (evt) => {
                                const copy = {...review}
                                copy.rating = evt.target.value
                                setReview(copy)
                            }
                        }>
                    <option value={review?.rating} type="select" id="rating" className="form-control" required>--{review?.rating}--</option>
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
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <textarea
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={review?.title}
                        onChange={
                            (evt) => {
                                const copy = {...review}
                                copy.title = evt.target.value
                                setReview(copy)
                            }
                        }>{review.title}</textarea>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="review">Review:</label>
                    <textarea
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={review?.text}
                        onChange={
                            (evt) => {
                                const copy = {...review}
                                copy.rext = evt.target.value
                                setReview(copy)
                            }
                        }>{review.text}</textarea>
                </div>
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