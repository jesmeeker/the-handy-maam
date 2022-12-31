import React, { useEffect, useState, useNavigate} from "react"
import ToggleSwitch from "../Switches/ToggleSwitch"
import { Request } from "./Request"

export const RequestPage = () => {

    const [employee, setEmployee] = useState({})
    const [value, setValue] = useState(true)
    const [requests, setRequests] = useState([])
    const [employeeRequests, setEmployeeRequests] = useState([])
    const [filteredRequests , setFilteredRequests] = useState([])
    const [employees, setEmployees] = useState([])

    // const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:8088/employees?userId=${localUser.id}&_expand=user&_expand=specialty`)
        .then(response => response.json())
        .then((data) => {
            setEmployee(data[0])
        }) 
        fetch(`http://localhost:8088/employees?_expand=user`)
        .then(response => response.json())
        .then((data) => {
            setEmployees(data)
        }) 
    },
    []
    )

    useEffect(() => {
        fetch(`http://localhost:8088/serviceRequests?_embed=employeeRequests`)
        .then(response => response.json())
        .then((data) => {
            setRequests(data)
            setFilteredRequests(data)
        }) 
    },
    []
    )

    useEffect(() => {
        fetch(`http://localhost:8088/employeeRequests?employeeId=${employee.id}&_expand=serviceRequest`)
        .then(response => response.json())
        .then((data) => {
            setEmployeeRequests(data)
        }) 
    },
    [employee]
    )

    useEffect(
        () => {
            // getAllRequests()

            if (value === true) {
                setFilteredRequests(requests)
            }
            else {
                setFilteredRequests(employeeRequests)
            }
        },
    [value]
    )

    const getAllRequests = () => {
        fetch(`http://localhost:8088/serviceRequests`)
            .then(response => response.json())
            .then((data) => {
                setRequests(data)
            })
    }

    let charMax = 30
    let i = 1

    function refreshPage() {
        window.location.reload(false)
      }

    const localHandyMaamUser = localStorage.getItem("handymaam_user")
    const localUser = JSON.parse(localHandyMaamUser)

return <>
        <h2 className="subpage--subheader">Requests</h2>
            <section><React.Fragment>
                <ToggleSwitch value={value} setValue={setValue}
                    label="All Requests" label2="My Requests"/>
            </React.Fragment></section>
                                            {/* PUT A TOGGLE HERE  FOR MY/ALL REQUESTS*/}
        <article className="requests">
            {
                filteredRequests.map(
                    (request) => <Request 
                        currentUser={localUser}
                        requestObject={request}
                        employees={employees}
                        getAllRequests={getAllRequests}
                        value={value} 
                        requestNumber={i++}
                        />
                        )
            }
        </article>
    </>
}