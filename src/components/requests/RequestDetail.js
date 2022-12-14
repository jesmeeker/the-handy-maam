import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"

export const RequestDetail = () => {
    const location = useLocation()
    // let employeeId = NaN
    const { id } = useParams()

    // if (location.state.employeeId !== null) {employeeId = location.state.employeeId}
    // if (location.state.employeeId !== null) {employeeId = location.state.employeeId}
    // console.log(employeeId)

    const [request, updateRequest] = useState({})
    const [employeeRequest, updateEmployeeRequest] = useState({})
    const [employee, updateEmployee] = useState({})
    const [customer, updateCustomer] = useState({})
    // let employeeObject = ""

    useEffect(
        () => {
            fetch(`http://localhost:8088/serviceRequests/?id=${id}&_expand=customer&_expand=specialty&_expand=invoice&_embed=employeeRequests`)
                .then(response => response.json())
                .then((data) => {
                    const singleRequest = data[0]
                    const employeeData = singleRequest.employeeRequests[0]
                    updateRequest(singleRequest)
                    updateEmployeeRequest(employeeData)

                })
        },
        []
    )
    // console.log("employeeObject")
    // console.log(employeeObject)

    useEffect(
        () => {
            fetch(`http://localhost:8088/employees/?id=${employeeRequest.employeeId}&_expand=user`)
                .then(response => response.json())
                .then((data) => {
                    const singleRequest = data[0]
                    updateEmployee(singleRequest)
                })
        },
        [employeeRequest]
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers/?id=${request.customerId}&_expand=user`)
                .then(response => response.json())
                .then((data) => {
                    const singleRequest = data[0]
                    updateCustomer(singleRequest)
                })
        },
        [employeeRequest]
    )

    return <section className="request">
        <h2>Request Information</h2>
    <header className="request--header">Description: {request?.description}</header>
    <div>Invoice No. {request?.invoice?.invoiceNumber}</div>
    <div>Assigned Employee: {employee?.user?.firstName} {employee?.user?.lastName}</div>
    <div></div>
    <h2>Customer Information</h2>
    <div>Name: {customer?.user?.firstName}  {customer?.user?.lastName}</div>
    <div>Customer Service Address: {customer?.streetAddress} {customer?.city}, {customer?.stateCode} {customer?.user?.zipCodeId}</div>
    <div>Customer Phone No. {request?.customer?.phoneNumber}</div>
    
    </section>
}  
