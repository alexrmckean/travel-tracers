import React from 'react';
import { useAccommodationsByIdQuery } from '../app/AccommodationSlice';
import { useParams, Link } from 'react-router-dom';

function AccommodationDetails() {
    const { accommodation_id } = useParams();

    const { data: accommodation, error, isLoading } = useAccommodationsByIdQuery(accommodation_id);

    if (isLoading) {
        return <div className="text-center mt-8">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-8">Error: {error.message}</div>;
    }

    if (!accommodation) {
        return <div className="text-center mt-8">Accommodation not found</div>;
    }

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Accommodation Details</h2>
            <div className="mb-4">
                <p className="text-gray-600"><span className="font-semibold">Hotel:</span> {accommodation.hotel}</p>
                <p className="text-gray-600"><span className="font-semibold">Flight Number:</span> {accommodation.flight_number}</p>
                <p className="text-gray-600"><span className="font-semibold">Flight Number 2:</span> {accommodation.flight_number_2}</p>
                <p className="text-gray-600"><span className="font-semibold">From Date:</span> {accommodation.from_date}</p>
                <p className="text-gray-600"><span className="font-semibold">To Date:</span> {accommodation.to_date}</p>
                <p className="text-gray-600"><span className="font-semibold">Notes:</span> {accommodation.notes}</p>
            </div>
            <div className="flex justify-center">
                <Link to={`/api/accommodations/edit/${accommodation.id}`}>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Edit
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default AccommodationDetails;
