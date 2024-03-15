import React, { useState, useEffect } from 'react';
import { useItineraryQuery, useDeleteItineraryMutation } from '../app/ItinerarySlice';
import { Link } from 'react-router-dom';

function DeleteButton({ itineraryId }) {
    const [deleteItinerary] = useDeleteItineraryMutation();

    const handleDelete = async () => {
        try {
            await deleteItinerary(itineraryId);
        } catch (error) {
            console.error('Error deleting itinerary:', error);
        }
    };

    return (
        <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
            Delete
        </button>
    );
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}


function Itinerary() {
    const { data: itinerary = [], isLoading, isError } = useItineraryQuery();
    const [weeklyCalendar, setWeeklyCalendar] = useState([]);

    useEffect(() => {
        // Fetch weekly calendar data
        fetch('http://localhost:8000/api/itinerary/weekly_calendar')
            .then(response => response.json())
            .then(data => setWeeklyCalendar(data))
            .catch(error => console.error('Error fetching weekly calendar:', error));
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching data...</div>;

    return (
        <>
            <div className="my-5 container">
                <h1 className="text-2xl font-bold mb-4">My Itinerary</h1>
            </div>
            <div className="grid grid-cols-7 gap-4">
                {weeklyCalendar.map((day, index) => (
                    <div key={index} className="border border-gray-200 p-4 rounded">
                        {/* Access the date string inside the array */}
                        <h2 className="text-lg font-semibold mb-2" style={{ fontSize: '1.1rem' }}>{formatDate(day[0])}</h2>
                        {itinerary
                            .filter(item => {
                                const fromDate = new Date(item.from_date);
                                const toDate = new Date(item.to_date);
                                const currentDay = new Date(day[0]);
                                return currentDay >= fromDate && currentDay <= toDate;
                            })
                            .map((item) => (
                                <div key={item.id} className="bg-gray-100 p-4 rounded my-2">
                                    <Link
                                        to={`/api/itinerary/${item.id}`}
                                        className="font-semibold mb-1 hover:text-blue-500"
                                    >
                                        {item.name}
                                    </Link>
                                    <p className="mb-1">Destination: {item.destination}</p>
                                    <p className="mb-1">From: {formatDate(item.from_date)}</p>
                                    <p className="mb-1">To: {formatDate(item.to_date)}</p>
                                    <p className="mb-1">Travelers: {item.num_travelers}</p>
                                </div>
                            ))}
                    </div>
                ))}
            </div>
            <div className="max-w-md mx-auto mt-10">
                <Link to="/api/itinerary/create/">
                    <button className="bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                        Create Itinerary
                    </button>
                </Link>
            </div>
        </>
    );
}

export default Itinerary;
