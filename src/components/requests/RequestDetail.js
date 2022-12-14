import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const RequestDetail = () => {
    const { id } = useParams()

    const [request, updateRequest] = useState({})

    useEffect(
        () => {
            fetch(`http://localhost:8088/serviceRequests?_expand=customer&_expand=specialty&_expand=invoice`)
                .then(response => response.json())
                .then((data) => {
                    const singleRequest = data[0]
                    updateRequest(singleRequest)
                })
        },
        [id]
    )

    return <section className="request">
    <header className="request--header">Description: {request?.description}</header>
    <div>Assined Employee: </div>
    <div>Customer Phone No. {request?.customer?.phoneNumber}</div>
    <div>

    Invoice No. {request?.invoice?.invoiceNumber}

    </div>
    
    </section>
}  
