import { useEffect, useState } from "react"

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
                                        employeeReviews.map((review) => <div className="review__text">
                                            `${review?.text.substring(0, charMax)}...``
                                        </div>)
                                    }    
                                </article>
    </>
}