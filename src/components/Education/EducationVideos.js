import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"


export const EducationVideos = ( {educationObject , categoryId}) => {
    const [categories, setCategories] = useState()
    const [chosenCategoryId, setChosenCategoryId] = useState("")

    return <>
        <section className="employeeCard">
            <Link to={`/education/${educationObject.id}`}>
                `<img src={educationObject?.thumbnailImage} alt={educationObject.title} className="employeeImg" width="200px"></img>`
            </Link>
            <Link to={`/education/${educationObject.id}`} className="educationLink">{educationObject?.title}</Link>
            <section>{educationObject.description}</section>
        </section>
    </>
}