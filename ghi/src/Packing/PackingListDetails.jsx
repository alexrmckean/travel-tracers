import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { usePackingListByIdQuery } from '../app/PackingSlice';

function PackingListDetails() {
    const { packingList_id } = useParams();

    const {
        data: packingList,
        error,
        isLoading,
    } = usePackingListByIdQuery(packingList_id);

    if (isLoading) {
        return <div className="text-center mt-8">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-8">Error: {error.message}</div>;
    }

    if (!packingList) {
        return <div className="text-center mt-8">Packing List not found</div>;
    }

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Packing List Details</h2>
            <div className="space-y-2">
                <p><span className="font-semibold">Item:</span> {packingList.item}</p>
                <p><span className="font-semibold">Quantity:</span> {packingList.quantity}</p>
                <p><span className="font-semibold">Category:</span> {packingList.category}</p>
                <p><span className="font-semibold">Priority:</span> {packingList.priority}</p>
                <p><span className="font-semibold">Status:</span> {packingList.checklist_status ? 'Checked' : 'Unchecked'}</p>
                <p><span className="font-semibold">Notes:</span> {packingList.notes}</p>
                <p><span className="font-semibold">Deadline:</span> {packingList.deadline}</p>
            </div>
            <Link to={`/api/packing_list/edit/${packingList_id}`}>
                <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Edit
                </button>
            </Link>
        </div>
    );
}

export default PackingListDetails;
