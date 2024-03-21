import React, { useState, useEffect } from 'react';
import { useItineraryQuery, useDeleteItineraryMutation } from '../app/ItinerarySlice';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useGetTokenQuery } from '../app/AuthSlice';

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

function formatDate(dateString, timeZone = 'UTC') {
    const date = new Date(dateString);
    const options = { timeZone, weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}


function Itinerary() {
    const { data: itinerary = [], isLoading, isError } = useItineraryQuery();
    const [weeklyCalendar, setWeeklyCalendar] = useState([]);
    const navigate = useNavigate();
    const { data: token } = useGetTokenQuery();
    const { data: itineraryauth = [], error: itineraryError, isLoading: itineraryLoading } = useItineraryQuery({}, {
        skip: !token, // Skip fetching budgets until token is available
        refetchOnMountOrArgChange: false // Prevent automatic refetching
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token === undefined) {
            return; // Wait until token is defined
        }

        if (!token) {
            navigate('/api/login');
        } else {
            setLoading(false);
        }
    }, [token, navigate]);


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
            <header className="py-2">
                <div className="container pl-6">
                    <h1 className="text-4xl">My Itinerary</h1>
                    <p className="text-gray-500 mt-2">Plan your dream trip!</p>
                    <div className="text-left mt-5">
                        <Link to="/api/itinerary/create/">
                            <button className="bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                                Add Trip
                            </button>
                        </Link>
                    </div>
                </div>
            </header>
            <div className="grid grid-cols-7 p-5">
                {weeklyCalendar.map((day, index) => (
                    <div key={index} className="opacity=50 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        {/* Access the date string inside the array */}
                        <h2 className="bg-gray-800 text-white rounded-sm text-center text-md p-2" style={{ fontSize: '.9rem' }}>{formatDate(day[0])}</h2>
                        {itinerary
                            .filter(item => {
                                const fromDate = moment(item.from_date).utcOffset('+00:00');
                                const toDate = moment(item.to_date).utcOffset('+00:00');
                                const currentDay = moment(day[0]).utcOffset('+00:00');
                                return currentDay >= fromDate && currentDay <= toDate;
                            })
                            .map((item) => (
                                <div key={item.id} className="bg-gray-50 text-white rounded-sm max-w-md">
                                    <dl className="max-w-md divide-y divide-gray-200 text-gray-900 dark:text-white dark:divide-gray-700 p-2">
                                        <img className="rounded-t-sm" src="https://image.cnbcfm.com/api/v1/image/106268734-1574876711571gettyimages-1059614218.jpeg?v=1576856860&w=630&h=354&ffmt=webp&vtcrop=y" alt="" />
                                        <div className="flex flex-col pb-3">
                                            <dt className="mb-1 md:text-sm dark:text-gray-400 font-semibold">Trip Name:</dt>
                                            <dd className="text-sm text-gray-500">{item.name}</dd>
                                        </div>
                                        <div className="flex flex-col pb-3">
                                            <dt className="mb-1 md:text-sm dark:text-gray-400 font-semibold">Destination:</dt>
                                            <dd className="text-sm text-gray-500"> {item.destination}</dd>
                                        </div>
                                        <div className="flex flex-col py-3">
                                            <dt className="mb-1 md:text-sm dark:text-gray-400 font-semibold">Duration:</dt>
                                            <dd className="text-sm text-gray-500">{formatDate(item.from_date)} - {formatDate(item.to_date)}</dd>
                                        </div>
                                        <div className="flex flex-col pt-3">
                                            <dt className="mb-1 md:text-sm dark:text-gray-400 font-semibold">Travelers:</dt>
                                            <dd className="text-sm text-gray-500">{item.num_travelers}</dd>
                                        </div>
                                        <div className="flex flex-col pt-3">
                                            <dt className="mb-1 text-gray-500 md:text-md dark:text-gray-400"></dt>
                                            <dd className="text-sm font-semibold"> <Link to={`/api/itinerary/${item.id}`} className="underline hover:text-green-400">Trip Details</Link></dd>
                                        </div>
                                    </dl>
                                </div>
                            ))}
                    </div>
                ))}
            </div>
        </>
    );
}

export default Itinerary;
