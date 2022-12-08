import { useEffect, useState } from "react"

export const Success = ( {somekindofprop }) => {
    const [customer, updateCustomer] = useState()
    const [request, setRequest] = useState()
    const [zipCode, setZipCode] = useState()

    const localHandyMaamUser = localStorage.getItem("handymaam_user")
    const localUser = JSON.parse(localHandyMaamUser)
    
    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user&_embed=user&userId=${localUser.id}`)
            .then(response => response.json())
            .then((data) => {
                const singleCustomer = data[0]
                updateCustomer(singleCustomer)
            })
    },
    []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/serviceRequests?customerId=${customer?.id}`)
            .then(res => res.json())
            .then((data) => {
                let i = data.length
                let j = i-1
                const singleRequest = data[j]
                setRequest(singleRequest)
            })
        },
        [customer]
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/zipCodes?id=${customer?.user.zipCodeId}`)
            .then(res => res.json())
            .then((data) => {
                const singleZipCode = data[0]
                setZipCode(singleZipCode)
            })
        },
        [customer]
    )

    return <>
   
        <h1 className="subpage__header">Thank you, {customer?.user.firstName}, for choosing The Handy Ma'am!</h1>
            <section>
                <h2>Here is a summary of your request:</h2>
                 <div><span style={{ fontWeight: 'bold' }}>Description of problem: </span></div>
                 <div> {request?.description}</div><br></br>
                 <div><span style={{ fontWeight: 'bold' }}>Service Address: </span><br></br>{customer?.streetAddress}</div>
                 <div>{customer?.city}, {customer?.stateCode}, {zipCode?.zipCode}</div><br></br>
                <div>A confirmation of this request will be sent to <span style={{ fontWeight: 'bold' }}>{customer?.user.email}</span></div><br></br>
                <div>We will be reaching out to schedule your service date soon.<br>
                </br>We will call you at <span style={{ fontWeight: 'bold' }}>{customer?.phoneNumber}</span>.</div><br></br>

            </section>
    </>
}