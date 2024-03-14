import React from 'react'
import { usePackingListByIdQuery } from '../app/PackingSlice'
import { useParams } from 'react-router-dom'

function PackingListDetails() {
    const { packingList_id } = useParams()

    const {
        data: packingList,
        error,
        isLoading,
    } = usePackingListByIdQuery(packingList_id)

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    if (!packingList) {
        return <div>Packing List not found</div>
    }

    return (
        <div>
            <h2>Packing List Details</h2>
            <p>Item: {packingList.item}</p>
            <p>Item: {packingList.quantity}</p>
            <p>Item: {packingList.category}</p>
            <p>Item: {packingList.priority}</p>
            <p>Item: {packingList.status}</p>
            <p>Item: {packingList.notes}</p>
            <p>Item: {packingList.deadline}</p>
        </div>
    )
}

export default PackingListDetails
