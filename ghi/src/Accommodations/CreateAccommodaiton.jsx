// AccommodationForm.js

import React, { useState } from 'react';
import { useCreateAccommodationsMutation } from '../app/AccommodationSlice';
import { useNavigate } from 'react-router';

function AccommodationForm() {
    const navigate = useNavigate();
    const [hotel, setHotel] = useState('');
    const [flightNumber, setFlightNumber] = useState('');
    const [flightNumber2, setFlightNumber2] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [notes, setNotes] = useState('');
    const [createAccommodations] = useCreateAccommodationsMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createAccommodations({
                hotel,
                flight_number: flightNumber,
                flight_number_2: flightNumber2,
                from_date: fromDate,
                to_date: toDate,
                notes,
            });
            navigate('/api/accommodations');
        } catch (error) {
            console.error('Error creating accommodation:', error);
        }
    }

    return (
        <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-semibold text-center mb-4">Create an Accommodation</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor='hotel' className="block text-sm font-medium text-gray-700">Hotel:</label>
                    <input
                        type="text"
                        id="hotel"
                        value={hotel}
                        onChange={e => setHotel(e.target.value)}
                        className="mt-1 p-2.5 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor='flightNumber' className="block text-sm font-medium text-gray-700">Flight Number:</label>
                    <input
                        type="text"
                        id="flightNumber"
                        value={flightNumber}
                        onChange={e => setFlightNumber(e.target.value)}
                        className="mt-1 p-2.5 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor='flightNumber2' className="block text-sm font-medium text-gray-700">Flight Number 2:</label>
                    <input
                        type="text"
                        id="flightNumber2"
                        value={flightNumber2}
                        onChange={e => setFlightNumber2(e.target.value)}
                        className="mt-1 p-2.5 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor='fromDate' className="block text-sm font-medium text-gray-700">From:</label>
                    <input
                        type="date"
                        id="fromDate"
                        value={fromDate}
                        onChange={e => setFromDate(e.target.value)}
                        className="mt-1 p-2.5 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor='toDate' className="block text-sm font-medium text-gray-700">To:</label>
                    <input
                        type="date"
                        id="toDate"
                        value={toDate}
                        onChange={e => setToDate(e.target.value)}
                        className="mt-1 p-2.5 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor='notes' className="block text-sm font-medium text-gray-700">Additional Notes:</label>
                    <input
                        type="text"
                        id="notes"
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                        className="mt-1 p-2.5 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <button type="submit" className="w-full py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Create Accommodation</button>
            </form>
        </div>
    );
}

export default AccommodationForm;
