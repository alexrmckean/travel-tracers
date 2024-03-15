import React, { useState } from 'react';
import { useCreateItineraryMutation } from '../app/ItinerarySlice';
import { useNavigate } from 'react-router-dom';

function ItineraryForm() {
    const [name, setName] = useState('');
    const [destination, setDestination] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [numTravelers, setNumTravelers] = useState('');
    const [createItinerary] = useCreateItineraryMutation();
    const navigate = useNavigate();

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
            navigate('/api/itinerary');
        } catch (error) {
            console.error('Error creating itinerary:', error);
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Create an Itinerary</h2>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label htmlFor='name' className="block text-gray-700 font-bold mb-2">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor='destination' className="block text-gray-700 font-bold mb-2">Destination:</label>
                    <input
                        type="text"
                        id="destination"
                        value={destination}
                        onChange={e => setDestination(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor='fromDate' className="block text-gray-700 font-bold mb-2">From Date:</label>
                    <input
                        type="Date"
                        id="fromDate"
                        value={fromDate}
                        onChange={e => setFromDate(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor='toDate' className="block text-gray-700 font-bold mb-2">To Date:</label>
                    <input
                        type="Date"
                        id="toDate"
                        value={toDate}
                        onChange={e => setToDate(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor='numTravelers' className="block text-gray-700 font-bold mb-2">Number of Travelers:</label>
                    <input
                        type="text"
                        id="numTravelers"
                        value={numTravelers}
                        onChange={e => setNumTravelers(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Create Itinerary</button>
            </form>
        </div>
    );
}

export default ItineraryForm;
