import { useEffect, useState } from "react"
import { RequestButton } from "../requests/RequestButton"
import fivestar from "../../assets/graphics/five_star_rating.png"
import fourstar from "../../assets/graphics/four_star_rating.png"
import threestar from "../../assets/graphics/three_star_rating.png"
import twostar from "../../assets/graphics/two_star_rating.png"
import onestar from "../../assets/graphics/one_star_rating.png"


export const Reviews = () => {
    const [reviews, setReviews] = useState([])
    const [customers, setCustomers] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/reviews?_expand=serviceRequest`)
            .then(res => res.json())
            .then((data) => {
                setReviews(data)
            })
            fetch(`http://localhost:8088/customers?_expand=user`)
            .then(res => res.json())
            .then((data) => {
                setCustomers(data)
            })
        },
        []
    )

        
return <>
    < RequestButton/><br></br>
    <section className="subpage--section">
        <h1 className="subpage--header">Reviews</h1>
            <section className="reviews subpage--article">
                {
                    reviews.map((review) => {
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


                        return <>
                            <section className="reviewCard">
                                         <img src={image} alt={image} className="reviewStars" width="200" height="40"/>
                                 <div className="reviewText">{review.text}</div><br></br>
                                 <section> 
                                     <br></br>   
                                     {
                                         customers.map((customer) => {
                                             if (customer.id === review.customerId) {
                                                let customerImage = customer?.user?.image
                                                 return <>
                                                  <section className="reviewTag"><img src={customerImage} alt={customer?.user?.firstName} className="customerReviewImg" />
                                                    <div>{customer?.user?.firstName} {customer?.user?.lastName}<br></br></div>
                                                </section>
                                                 </>
                                                 }
                                             }
                                         )
                         }
                                    
                                 </section>
                        </section>
                        </>
                    })}</section>
                    </section>
                    </>
                    }