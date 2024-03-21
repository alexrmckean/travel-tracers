import React, { useState, useEffect } from 'react';
import { useCreateAccommodationsMutation } from '../app/AccommodationSlice';
import { useNavigate } from 'react-router';
import { useGetTokenQuery } from '../app/AuthSlice';

function AccommodationForm() {
    const navigate = useNavigate();
    const [hotel, setHotel] = useState('');
    const [flightNumber, setFlightNumber] = useState('');
    const [flightNumber2, setFlightNumber2] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [notes, setNotes] = useState('');
    const [createAccommodations] = useCreateAccommodationsMutation();
    const { data: token } = useGetTokenQuery();

    useEffect(() => {
        if (token === undefined) {
            return;
        }

        if (!token) {
            navigate('/api/login');
        }
    }, [token, navigate]);

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
        <div>
            <h2 className="text-center text-2xl font-semibold whitespace-nowrap dark:text-white pb-8 pt-8 pl-4">Create an Accommodation</h2>
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
                <div className="mb-5">
                    <label htmlFor='hotel' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hotel:</label>
                    <input
                        type="text"
                        id="hotel"
                        value={hotel}
                        onChange={e => setHotel(e.target.value)}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="i.e. Hilton, The Plaza, etc. "
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor='flightNumber' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Flight Number:</label>
                    <input
                        type="text"
                        id="flightNumber"
                        value={flightNumber}
                        onChange={e => setFlightNumber(e.target.value)}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="i.e. B3453, C3356, etc."
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor='flightNumber2' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Flight Number 2:</label>
                    <input
                        type="text"
                        id="flightNumber2"
                        value={flightNumber2}
                        onChange={e => setFlightNumber2(e.target.value)}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="i.e. B3453, C3356, etc.(optional)"
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor='fromDate' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">From:</label>
                    <input
                        type="date"
                        id="fromDate"
                        value={fromDate}
                        onChange={e => setFromDate(e.target.value)}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="MM/DD/YYYY"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor='toDate' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">To:</label>
                    <input
                        type="date"
                        id="toDate"
                        value={toDate}
                        onChange={e => setToDate(e.target.value)}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="MM/DD/YYYY"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor='notes' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Additional Notes:</label>
                    <input
                        type="text"
                        id="notes"
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="Notes..."
                    />
                </div>
                <button type="submit" className="text-white bg-green-400 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create</button>
            </form>
        </div>
    );
}

export default AccommodationForm;
