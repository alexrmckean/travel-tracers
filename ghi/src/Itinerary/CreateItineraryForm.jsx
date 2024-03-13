import React, { useState } from 'react';
import { useCreateItineraryMutation } from '../app/ItinerarySlice';


function ItineraryForm() {
    const [name, setName] = useState('');
    const [destination, setDestination] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [numTravelers, setNumTravelers] = useState('');
    const [createItinerary] = useCreateItineraryMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createItinerary({
                name,
                destination,
                from_date: fromDate,
                to_date: toDate,
                num_travelers: numTravelers,
            });
        } catch (error) {
            console.error('Error creating itinerary:', error);
        }
    }

    return (
        <div>
            <h2>Create an Itinerary</h2>
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
                    <label htmlFor='fromDate'>fromDate:</label>
                    <input
                        type="Date"
                        id="fromDate"
                        value={fromDate}
                        onChange={e => setFromDate(e.target.value)} required
                    />
                </div>
                <div>
                    <label htmlFor='toDate'>toDate:</label>
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
                <button type="submit">Create Itinerary</button>
            </form>
        </div>
    );
}

export default ItineraryForm;
