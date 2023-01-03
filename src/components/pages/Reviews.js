import { useEffect, useState } from "react"
import { RequestButton } from "../requests/RequestButton"
import fivestar from "../../assets/graphics/five_star_rating.png"
import fourstar from "../../assets/graphics/four_star_rating.png"
import threestar from "../../assets/graphics/three_star_rating.png"
import twostar from "../../assets/graphics/two_star_rating.png"
import onestar from "../../assets/graphics/one_star_rating.png"


export const Reviews = () => {
    const [reviews, setReviews] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/reviews`)
            .then(res => res.json())
            .then((data) => {
                setReviews(data)
            })
        },
        []
    )

return <>
    < RequestButton/><br></br>
    <section className="subpage--section">
        <h1 className="subpage--header">Reviews</h1>
            <section className="reviews">
                {
                    reviews.map((review) => {
                        if (review.rating === "5") {
                            return <>
                                    <section className="reviewCard">
                                        <img src={fivestar} width="200"/>
                                <div className="reviewText">{review.text}</div><br></br>
                                <section>    
                                    Customer Name<br></br>
                                    Date of Service
                                </section>
                            </section>
                            </>
                            } 
                            else if (review.rating === "4") {
                                return <>
                                        <section className="reviewCard">
                                            <img src={fourstar} width="200"/>
                                    <div className="reviewText">{review.text}</div><br></br>
                                    <section>    
                                        Customer Name<br></br>
                                        Date of Service
                                    </section>
                                </section>
                                </>
                                } else if (review.rating === "3") {
                                    return <>
                                            <section className="reviewCard">
                                                <img src={threestar} width="200"/>
                                        <div className="reviewText">{review.text}</div><br></br>
                                        <section>    
                                            Customer Name<br></br>
                                            Date of Service
                                        </section>
                                    </section>
                                    </>
                                    }  else if (review.rating === "2") {
                                        return <>
                                                <section className="reviewCard">
                                                    <img src={twostar} width="200"/>
                                            <div className="reviewText">{review.text}</div><br></br>
                                            <section>    
                                                Customer Name<br></br>
                                                Date of Service
                                            </section>
                                        </section>
                                        </>
                                        } else if (review.rating === "1") {
                                            return <>
                                                    <section className="reviewCard">
                                                        <img src={onestar} width="200"/>
                                                <div className="reviewText">{review.text}</div><br></br>
                                                <section>    
                                                    Customer Name<br></br>
                                                    Date of Service
                                                </section>
                                            </section>
                                            </>
                                            } else {
                                                return <>
                                                <section className="reviewCard">
                                            <div className="reviewText">{review.text}</div><br></br>
                                            <section>    
                                                Customer Name<br></br>
                                                Date of Service
                                            </section>
                                        </section>
                                        </>
                                            }
                        })}
        
            {/* // <section className="reviewCard">
            //             <div className="reviewText">{review.text}</div><br></br>
            //             <section>    
            //                 Customer Name<br></br>
            //                 Date of Service
            //             </section>
            //         </section>})
            //         } */}
                    
            
            </section>
    </section>
    </>
}