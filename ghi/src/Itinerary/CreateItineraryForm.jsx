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
        <div>
            <h2 className="text-center text-2xl font-semibold whitespace-nowrap dark:text-white pb-8 pt-8 pl-4">Create an Itinerary</h2>
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
                <div className="mb-4">
                    <label htmlFor='name' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name:</label>
                    <input type="text" id="name" value={name} onChange={e => setName(e.target.value)}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
                </div>
                <div className="mb-4">
                    <label htmlFor='destination' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Destination:</label>
                    <input type="text" id="destination" value={destination} onChange={e => setDestination(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required/>
                </div>
                <div className="mb-4">
                    <label htmlFor='fromDate' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">From Date:</label>
                    <input type="Date" id="fromDate" value={fromDate} onChange={e => setFromDate(e.target.value)}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required/>
                </div>
                <div className="mb-4">
                    <label htmlFor='toDate' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">To Date:</label>
                    <input type="Date" id="toDate" value={toDate} onChange={e => setToDate(e.target.value)}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required/>
                </div>
                <div className="mb-4">
                    <label htmlFor='numTravelers' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number of Travelers:</label>
                    <input type="text" id="numTravelers" value={numTravelers} onChange={e => setNumTravelers(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>
                <button type="submit" className="text-white bg-green-400 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Itinerary</button>
            </form>
        </div>
    );
}

export default ItineraryForm;
