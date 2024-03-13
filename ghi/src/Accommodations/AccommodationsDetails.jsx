import React from 'react';
import { useAccommodationsByIdQuery } from '../app/AccommodationSlice';
import { useParams } from 'react-router-dom';

function AccommodationDetails() {
    const { accommodation_id } = useParams();


    const { data: accommodation, error, isLoading } = useAccommodationsByIdQuery(accommodation_id);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!accommodation) {
        return <div>Accommodation not found</div>;
    }

    return (
        <div>
            <h2>Accommodation Details</h2>
            <p>Hotel: {accommodation.hotel}</p>
            <p>Flight Number: {accommodation.flight_number}</p>
            <p>Flight Number 2: {accommodation.flight_number_2}</p>
            <p>From Date: {accommodation.from_date}</p>
            <p>To Date: {accommodation.to_date}</p>
            <p>Notes: {accommodation.notes}</p>
        </div>
    );
}

export default AccommodationDetails;
