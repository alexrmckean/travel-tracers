import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useUpdateItineraryMutation } from '../app/ItinerarySlice';

function EditItineraryForm({ itineraryId, initialData}) {
    const [name, setName] = useState(initialData?.name || '');
    const [destination, setDestination] = useState(initialData?.destination || '');
    const [fromDate, setFromDate] = useState(initialData?.fromDate || '');
    const [toDate, setToDate] = useState(initialData?.toDate || '');
    const [numTravelers, setNumTravelers] = useState(initialData?.num_travelers || '');

     useEffect(() => {
        if (!initialData) {

        }
    }, [initialData, itineraryId]);

    const [updateItinerary] = useUpdateItineraryMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateItinerary({
                itinerary_id: itineraryId,
                name,
                destination,
                from_date: fromDate,
                to_date: toDate,
                num_travelers: numTravelers,
            });
        } catch (error) {
            console.error('Error editing itinerary:', error);
        }
    }

    return (
        <div>
            <h2>Edit an Itinerary</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='name'>name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='destination'>destination:</label>
                    <input
                        type="text"
                        id="destination"
                        value={destination}
                        onChange={e => setDestination(e.target.value)} required
                    />
                </div>
                <div>
                    <label htmlFor='fromDate'>From Date:</label>
                    <input
                        type="Date"
                        id="fromDate"
                        value={fromDate}
                        onChange={e => setFromDate(e.target.value)} required
                    />
                </div>
                <div>
                    <label htmlFor='toDate'>To Date:</label>
                    <input
                        type="Date"
                        id="toDate"
                        value={toDate}
                        onChange={e => setToDate(e.target.value)} required
                    />
                </div>
                <div>
                    <label htmlFor='numTravelers'>Number of Travelers:</label>
                    <input
                        type="text"
                        id="numTravelers"
                        value={numTravelers}
                        onChange={e => setNumTravelers(e.target.value)} required
                    />
                </div>
                <button type="submit">Update Itinerary</button>
            </form>
        </div>
    );
}

export default EditItineraryForm;
