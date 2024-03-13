import React from 'react';
import { useItineraryByIdQuery } from '../app/ItinerarySlice';
import { useParams } from 'react-router-dom';

function ItineraryDetails() {
    const { itinerary_id } = useParams();

    const { data: itinerary, error, isLoading } = useItineraryByIdQuery(itinerary_id);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!itinerary) {
        return <div>Itinerary not found</div>;
    }

    return (
        <div>
            <h2>Itinerary Details</h2>
            <p>Name: {itinerary.name}</p>
            <p>Destination: {itinerary.destination}</p>
            <p>From Date: {itinerary.from_date}</p>
            <p>To Date: {itinerary.to_date}</p>
            <p>Number of Travelers: {itinerary.num_travelers}</p>
        </div>
    );
}

export default ItineraryDetails;
