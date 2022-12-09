import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"


export const EducationVideos = ( {educationObject , categoryId}) => {
    const [categories, setCategories] = useState()
    const [chosenCategoryId, setChosenCategoryId] = useState("")

    // useEffect(() => {
    //     return fetch(`http://localhost:8088/categories`)
    //     .then(response => response.json())
    //             .then((data) => {
    //                 setCategories(data)
    //             })
    //     },
    //     []
    // )

    return <>
    {/* <label htmlFor="specialty">Filter by Topic</label><br></br>
                <select onChange={
                            (evt) => {
                                setChosenCategoryId(parseInt(evt.target.value))
                            }
                        }>
                    <option value={0} type="select" id="categoryId" className="form-control" required>topics</option>
                        {
                            categories.map((category) => <option key={`specialty--${category.id}`} value={category.id}>{category.name}</option>)
                        }       
                </select> */}
    
    <section className="employeeCard">
    <Link to={`/education/${educationObject.id}`}>
        `<img src={educationObject?.thumbnailImage} alt={educationObject.title} className="employeeImg" width="200px"></img>`
    </Link>
    <Link to={`/education/${educationObject.id}`} className="educationLink">{educationObject?.title}</Link>
    <section>{educationObject.description}</section>
   {/* <section><Link className="employeeLink" to={`/employees/${employeeObject.id}`}>{employeeObject?.user.firstName} {employeeObject?.user.lastName}</Link></section>
    <section style={{ fontWeight: 'bold' }}>{employeeObject?.title}</section><br></br>
    <section>{employeeObject?.bio}</section> */}
</section>
</>
}