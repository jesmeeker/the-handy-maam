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
        [chosenCategoryId]
    )

       

    return <>
        < RequestButton /><br></br>
        <label htmlFor="categories">Filter by Topic</label><br></br>
                <select onChange={(evt) => {setChosenCategoryId(parseInt(evt.target.value))}}>
                    <option value={0} type="select" id="categoryId" className="form-control" required>topics</option>
                        {
                            categories.map((category) => <option key={`category--${category.id}`} value={category.id}>{category.name}</option>)
                        }       
                </select>
        <section className="subpage--section">
            <article className='subpage'>
                <h2>Sometimes to get the job done,<br></br> you just need a little help understanding the solution.</h2>
                <div>We're not only dedicated to helping woman find safe service specialists to help around the house, but we're passionate about empowering them to also learn the tools necessary to handle some of the little tasks on their own to save time and keep some of their hard-earned money in their own pockets.</div>
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


// export const GearList = () => {
//   const [gear, setGear] = useState([]);
//   const [upgradeable, setUpgradeable] = useState(false)
//   const [dropdownItem, setDropdownItem] = useState([])
//   const[filteredGear, setFilteredGear] = useState([])
//   const [gearTypeId, setGearTypeId] = useState(“”)

//   const localGearUser = localStorage.getItem(“gear_user”)
//   const gearUserObject = JSON.parse(localGearUser)
//   const navigate = useNavigate()

//   useEffect(
//     () => {
//       fetch(`http://localhost:8088/userOwnedGear?userId=${gearUserObject.id}`)
//       .then(res => res.json())
//       .then(
//         (gearData) => {
//           setGear(gearData)
//         }
//       );
//   }, []);
//   useEffect(
//     () => {
//       if (upgradeable) {
//         const upgradeableGear = gear.filter(gearItem => gearItem.toUpgrade === true)
//         setFilteredGear(upgradeableGear)
//       } else {
//         fetch(`http://localhost:8088/userOwnedGear?userId=${gearUserObject.id}`)
//         .then(res => res.json())
//         .then(
//           (gearData) => {
//             setFilteredGear(gearData)
//           }
//         )
//       }
//     },
//     [upgradeable]
//   )
//   useEffect(
//     () => {
//         fetch(`http://localhost:8088/gearTypes?userInstrumentsId=${gearUserObject.instrumentOptionsId}&_expand=userInstruments&_embed=userOwnedGear`)
//         .then(res => res.json())
//         .then((data) => {
//             setDropdownItem(data)
//         })
//     },
//     []
//   )
//   useEffect(
//     () => {
//       const filteredCopy = gear.filter(item => item.gearTypeId === gearTypeId)
//       setFilteredGear(filteredCopy)
//     },
//     [gearTypeId]
//   )
//   return (
//     <>
//     <fieldset>
//                 <div className=“form-group”>
//                     <select onChange={(evt) => {
//                       setGearTypeId(parseInt(evt.target.value))
//                      } }>
//                         <option value={0}>{`Filter by Type`}</option>
//                         {
//                             dropdownItem.map((item) =>
//                                 <option key={`gearType--${item.id}`} value={item.id}>{item.name}</option>
//                             )
//                         }
//                     </select>
//                 </div>
//             </fieldset>
//       <button onClick={() => navigate(“/gearList/add”)}>Add Gear</button>
//       <button
//         onClick={
//           () => {
//           setUpgradeable(true)
//           }
//         }>Upgradeable</button>
//         <button
//         onClick={
//           () => {
//           setUpgradeable(false)
//           setFilteredGear(gear)
//           }
//         }>All Gear</button>
//       <article className=“gearDetails”>
//         {
//           filteredGear.map(g => <GearComp key={g.id}
//             id={g.id}
//             name={g.name}
//             gearTypeId={g.gearTypeId}
//             datePurchased={g.datePurchased}
//             pricePaid={g.pricePaid}
//             description={g.description}
//            /> )
//           }
//   </article>
//     </>
//   );
// };