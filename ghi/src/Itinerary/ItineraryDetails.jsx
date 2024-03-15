import React from 'react';
import { useItineraryByIdQuery, useDeleteItineraryMutation } from '../app/ItinerarySlice';
import { useParams, Link } from 'react-router-dom';

function DeleteButton({ itineraryId }) {
    const [deleteItinerary] = useDeleteItineraryMutation();

    const handleDelete = async () => {
        try {
            await deleteItinerary(itineraryId);
            // After deletion, you can redirect the user to another page or perform any other actions as needed
        } catch (error) {
            console.error('Error deleting itinerary:', error);
        }
    };

    return (
        <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
            Delete
        </button>
    );
}

function ItineraryDetails() {
    const { itinerary_id } = useParams();

    const { data: itinerary, error, isLoading } = useItineraryByIdQuery(itinerary_id);

    if (isLoading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-10">Error: {error.message}</div>;
    }

    if (!itinerary) {
        return <div className="text-center mt-10">Itinerary not found</div>;
    }

    return (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Itinerary Details</h2>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <p className="font-semibold mb-2">Name: {itinerary.name}</p>
                <p className="font-semibold mb-2">Destination: {itinerary.destination}</p>
                <p className="font-semibold mb-2">From Date: {itinerary.from_date}</p>
                <p className="font-semibold mb-2">To Date: {itinerary.to_date}</p>
                <p className="font-semibold mb-2">Number of Travelers: {itinerary.num_travelers}</p>
                <div className="flex">
                    <Link to={`/api/itinerary/edit/${itinerary.id}`}>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2">
                            Edit
                        </button>
                    </Link>
                    <DeleteButton itineraryId={itinerary.id} />
                </div>
            </div>
        </div>
    );
}

export default ItineraryDetails;
