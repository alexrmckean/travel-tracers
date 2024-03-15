import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useItineraryByIdQuery, useUpdateItineraryMutation } from '../app/ItinerarySlice';

function EditItineraryForm({ itineraryId }) {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [destination, setDestination] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [numTravelers, setNumTravelers] = useState('');

    const { data: initialData, isLoading, isError } = useItineraryByIdQuery(itineraryId);

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
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Edit an Itinerary</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor='name' className="block">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                </div>
                <div>
                    <label htmlFor='destination' className="block">Destination:</label>
                    <input
                        type="text"
                        id="destination"
                        value={destination}
                        onChange={e => setDestination(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label htmlFor='fromDate' className="block">From Date:</label>
                    <input
                        type="date"
                        id="fromDate"
                        value={fromDate}
                        onChange={e => setFromDate(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label htmlFor='toDate' className="block">To Date:</label>
                    <input
                        type="date"
                        id="toDate"
                        value={toDate}
                        onChange={e => setToDate(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label htmlFor='numTravelers' className="block">Number of Travelers:</label>
                    <input
                        type="text"
                        id="numTravelers"
                        value={numTravelers}
                        onChange={e => setNumTravelers(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    Update Itinerary
                </button>
            </form>
        </div>
    );
}

export default EditItineraryForm;
