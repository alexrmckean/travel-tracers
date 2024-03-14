import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useItineraryByIdQuery, useUpdateItineraryMutation } from '../app/ItinerarySlice';

function EditItineraryForm({ itineraryId}) {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [destination, setDestination] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [numTravelers, setNumTravelers] = useState('');

    const {data: initialData, isLoading, isError } = useItineraryByIdQuery(itineraryId);

     useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setDestination(initialData.destination);
            setFromDate(initialData.from_date);
            setToDate(initialData.to_date);
            setNumTravelers(initialData.num_travelers);
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

            navigate('/api/itinerary');

        } catch (error) {
            console.error('Error editing itinerary:', error);
        }
    }

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching data...</div>;

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
