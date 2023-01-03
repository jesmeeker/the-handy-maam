import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"


export const EducationVideos = ( {educationObject , categoryId}) => {
    const [categories, setCategories] = useState()
    const [chosenCategoryId, setChosenCategoryId] = useState("")

    return <>
        <section className="employeeCard">
               
            <a target="_blank" href={educationObject.url}><img src={educationObject?.thumbnailImage} alt={educationObject.title} className="educationThumbnail" width="200px"></img></a><br></br>
            
            {/* <Link to={{ pathname:`https://${educationObject.url}`}} target="blank">
                <img src={educationObject?.thumbnailImage} alt={educationObject.title} className="employeeImg" width="200px"></img>`
            </Link> */}
            <Link to={{pathname: `${educationObject.url}`}} target
            ='_blank' className="educationLink">{educationObject?.title}</Link>
            <section>{educationObject.description}</section>
        </section>
    </>
}