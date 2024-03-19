import React from 'react';
import { useItineraryByIdQuery, useDeleteItineraryMutation } from '../app/ItinerarySlice';
import { useParams, Link, useNavigate } from 'react-router-dom';

function DeleteButton({ itineraryId }) {
    const navigate = useNavigate();
    const [deleteItinerary] = useDeleteItineraryMutation();

    const handleDelete = async () => {
        try {
            await deleteItinerary(itineraryId);
            navigate('/api/itinerary');
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
            <h2 className="text-center text-2xl font-semibold mb-4">Trip Details</h2>
            <div className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
                <dl class="max-w-md divide-y divide-gray-200 text-gray-900 dark:text-white dark:divide-gray-700 p-2">
                    <div class="flex flex-col py-3">
                        <dt class="mb-1 font-semibold md:text-md dark:text-gray-400">Trip Name:</dt>
                        <dd class="text-sm text-gray-500 font-semibold">{itinerary.name}</dd>
                    </div>
                    <div class="flex flex-col py-3">
                        <dt class="mb-1 font-semibold md:text-md dark:text-gray-400">Destination:</dt>
                        <dd class="text-sm text-gray-500 font-semibold"> {itinerary.destination}</dd>
                    </div>
                    <div class="flex flex-col py-3">
                        <dt class="mb-1 font-semibold md:text-md dark:text-gray-400">Duration:</dt>
                        <dd class="text-sm text-gray-500 font-semibold">{itinerary.from_date} - {itinerary.to_date}</dd>
                    </div>
                    <div class="flex flex-col pt-3">
                        <dt class="mb-1 font-semibold md:text-md dark:text-gray-400">Travelers:</dt>
                        <dd class="text-sm text-gray-500 font-semibold pb-4">{itinerary.num_travelers}</dd>
                    </div>
                    <div className="pt-3">
                        <Link to={`/api/itinerary/edit/${itinerary.id}`}>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded mr-2">
                            Edit
                            </button>
                        </Link>
                        <DeleteButton itineraryId={itinerary.id}/>
                    </div>
                </dl>
            </div>
        </div>
    );
}

export default ItineraryDetails;
