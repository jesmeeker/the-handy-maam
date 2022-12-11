import { useEffect, useState } from "react"
import { RequestButton } from "../requests/RequestButton"

export const Reviews = () => {
    const [reviews, setReviews] = useState()

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

return (<>
    < RequestButton/><br></br>
    <section>
        {reviews.map((review) => <section>{review.text}</section>)}
    </section>
    </>)
}