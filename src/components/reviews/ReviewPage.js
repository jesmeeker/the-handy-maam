import { useEffect, useState } from "react"
import fivestar from "../../assets/graphics/five_star_rating.png"
import fourstar from "../../assets/graphics/four_star_rating.png"
import threestar from "../../assets/graphics/three_star_rating.png"
import twostar from "../../assets/graphics/two_star_rating.png"
import onestar from "../../assets/graphics/one_star_rating.png"

export const ReviewPage = () => {
    const localHandyMaamUser = localStorage.getItem("handymaam_user")
    const localUser = JSON.parse(localHandyMaamUser)

    const [employee, setEmployee] = useState({})
    const [employeeReviews, setEmployeeReviews] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8088/employees?userId=${localUser.id}&_expand=user&_expand=specialty`)
        .then(response => response.json())
        .then((data) => {
            setEmployee(data[0])
        }) 
    },
    []
    )

    useEffect(() => {
        fetch(`http://localhost:8088/reviews?employeeId=${employee.id}`)
        .then(response => response.json())
        .then((data) => {
            setEmployeeReviews(data)
        }) 
    },
    [employee]
    )

    let charMax = 100


    return <>
     <h2 className="subpage--subheader">My Reviews</h2>
                                    <br></br> 
                                    <br></br> 
                                <article className="reviews">
                                    {
                                        employeeReviews.map((review) => {
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
                                            
                                            return <article className="requestCard"><header className="reviewHeader">{review?.title}</header><img src={image} alt={image} className="reviewStars" width="100" height="20"/> <br></br>
                                        <div>
                                            "{review?.text}"
                                            </div>
                                        </article>
})
                                    }    
                                </article>
    </>
}