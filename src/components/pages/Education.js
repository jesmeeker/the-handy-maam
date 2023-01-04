import { useEffect, useState } from "react"
import { EducationVideos } from "../Education/EducationVideos"
import { RequestButton } from "../requests/RequestButton"

export const Education = () => {

    const [educationVids , setEducation] = useState([])
    const [categories, setCategories] = useState([])
    const [chosenCategoryId, setChosenCategoryId] = useState(0)
    const [filteredVids, setFilteredVids] = useState([])

    // const getAllVideos = () => {
    //     fetch(`http://localhost:8088/educationVideos`)
    //         .then(response => response.json())
    //         .then((educationArray) => {
    //             setEducation(educationArray)
    //         })
    // }

    useEffect(
        () => {
         fetch(`http://localhost:8088/educationVideos`)
            .then(response => response.json())
            .then((data) => {
                setEducation(data)
        })
    }, 
    []
    )


    useEffect(() => {
        // getAllVideos()

         fetch(`http://localhost:8088/categories`)
        .then(response => response.json())
                .then((categoryArray) => {
                    setCategories(categoryArray)
                })
        },
        []
    )

    useEffect(
        () => {

            // getAllVideos()

            if (chosenCategoryId === 0) {
                setFilteredVids(educationVids)
            }
            else {
                const filteredCopy = educationVids.filter(vid => vid.categoryId === parseInt(chosenCategoryId))
                setFilteredVids(filteredCopy)
            }
        },
        [educationVids, chosenCategoryId]
    )

       

    return <>
        < RequestButton /><br></br>
        
        <section className="subpage--section">
        <article className='subpage--article'>
                <h2>Sometimes to get the job done, all you need a little help.</h2>
            <article className='subpage--inset'>
                <div>We're not only dedicated to helping women find safe service specialists to help around the house, but we're passionate about empowering them to also learn the tools necessary to handle some of the little tasks on their own to save time and keep some of their hard-earned money in their own pockets. You might be surprised at how much you can do on your own if you just had the right resources to guide you.</div>
        </article><br></br>
        <label htmlFor="categories">Filter by Topic</label><br></br>
                <select onChange={(evt) => {setChosenCategoryId(parseInt(evt.target.value))}}>
                    <option value={0} type="select" id="categoryId" className="form-control" required>topics</option>
                        {
                            categories.map((category) => <option key={`category--${category.id}`} value={category.id}>{category.name}</option>)
                        }       
                </select>
                 <section className="employees">
                 <article className="subPage--employeeList"></article>
                 {
                    filteredVids.map(
                        (education) => <EducationVideos key={`educationVideo--${education.id}`}  
                        educationObject={education}
                        categoryId={chosenCategoryId}  /> 
                        )
                }
                 </section>
                 </article>
            </section>
    </>
} 

