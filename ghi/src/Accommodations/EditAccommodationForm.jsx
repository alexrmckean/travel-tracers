import React, { useState, useEffect } from 'react';
import { useAccommodationsByIdQuery, useUpdateAccommodationsMutation } from '../app/AccommodationSlice';
import { useNavigate } from 'react-router';

function EditAccommodationForm({ accommodationId }) {
    const navigate = useNavigate();
    const [hotel, setHotel] = useState('');
    const [flightNumber, setFlightNumber] = useState('');
    const [flightNumber2, setFlightNumber2] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [notes, setNotes] = useState('');

    const { data: initialData, isLoading, isError } = useAccommodationsByIdQuery(accommodationId);

    useEffect(() => {
        if (initialData) {
            setHotel(initialData.hotel);
            setFlightNumber(initialData.flight_number);
            setFlightNumber2(initialData.flight_number_2);
            setFromDate(initialData.from_date);
            setToDate(initialData.to_date);
            setNotes(initialData.notes);
        }
    }, [initialData]);

    const [updateAccommodation] = useUpdateAccommodationsMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateAccommodation({
                accommodation_id: accommodationId,
                hotel,
                flight_number: flightNumber,
                flight_number_2: flightNumber2,
                from_date: fromDate,
                to_date: toDate,
                notes,
            });

            navigate('/api/accommodations');
        } catch (error) {
            console.error('Error editing accommodation:', error);
        }
    }

    if (isLoading) return <div className="text-center mt-8">Loading...</div>;
    if (isError) return <div className="text-center mt-8">Error fetching data...</div>;

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Edit Accommodation</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="hotel" className="block text-gray-600 font-semibold mb-2">Hotel:</label>
                    <input
                        type="text"
                        id="hotel"
                        value={hotel}
                        onChange={e => setHotel(e.target.value)}
                        className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="flightNumber" className="block text-gray-600 font-semibold mb-2">Flight Number:</label>
                    <input
                        type="text"
                        id="flightNumber"
                        value={flightNumber}
                        onChange={e => setFlightNumber(e.target.value)}
                        className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="flightNumber2" className="block text-gray-600 font-semibold mb-2">Flight Number 2:</label>
                    <input
                        type="text"
                        id="flightNumber2"
                        value={flightNumber2}
                        onChange={e => setFlightNumber2(e.target.value)}
                        className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="fromDate" className="block text-gray-600 font-semibold mb-2">From Date:</label>
                    <input
                        type="date"
                        id="fromDate"
                        value={fromDate}
                        onChange={e => setFromDate(e.target.value)}
                        className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="toDate" className="block text-gray-600 font-semibold mb-2">To Date:</label>
                    <input
                        type="date"
                        id="toDate"
                        value={toDate}
                        onChange={e => setToDate(e.target.value)}
                        className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="notes" className="block text-gray-600 font-semibold mb-2">Additional Notes:</label>
                    <input
                        type="text"
                        id="notes"
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                        className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Update Accommodation
                </button>
            </form>
        </div>
    );
}

export default EditAccommodationForm;
