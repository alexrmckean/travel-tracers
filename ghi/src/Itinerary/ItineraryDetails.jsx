import React, { useState } from 'react';
import { useItineraryByIdQuery, useDeleteItineraryMutation } from '../app/ItinerarySlice';
import { useParams, Link, useNavigate } from 'react-router-dom';

function DeleteButton({ itineraryId }) {
    const navigate = useNavigate();
    const [deleteItinerary] = useDeleteItineraryMutation();

    const handleDelete = async () => {
        try {
            await deleteItinerary(itineraryId);
            navigate('/api/itinerary');
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

function ItineraryDetails() {
    const { itinerary_id } = useParams();
    const [selectedTab, setSelectedTab] = useState('trip-details'); // Default to 'trip-details'

    const { data: itinerary, error, isLoading } = useItineraryByIdQuery(itinerary_id);

    const handleTabClick = (tabId) => {
        setSelectedTab(tabId);
    };

    if (isLoading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-10">Error: {error.message}</div>;
    }

    if (!itinerary) {
        return <div className="text-center mt-10">Itinerary not found</div>;
    }

    return (
        <div className="w-full border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <ul className="text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex dark:divide-gray-600 dark:text-gray-400 rtl:divide-x-reverse" id="fullWidthTab" role="tablist">
                <li className="w-full">
                    <button onClick={() => handleTabClick('trip-details')} id="trip-details" data-tabs-target="#trip-details" type="button" role="tab" aria-controls="trip-details" aria-selected={selectedTab === 'trip-details'} className={`inline-block w-full p-4 rounded-ss-lg bg-gray-50 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600 ${selectedTab === 'trip-details' ? 'bg-gray-200' : ''}`}>Trip Details</button>
                </li>
                <li className="w-full">
                    <button onClick={() => handleTabClick('accommodations')} id="accommodations" data-tabs-target="#accommodations" type="button" role="tab" aria-controls="accommodations" aria-selected={selectedTab === 'accommodations'} className={`inline-block w-full p-4 bg-gray-50 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600 ${selectedTab === 'accommodations' ? 'bg-gray-200' : ''}`}>Accommodations</button>
                </li>
            </ul>
            <div id="trip-details" className={`border-t border-gray-200 dark:border-gray-600 ${selectedTab === 'trip-details' ? '' : 'hidden'}`}>
                <div className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" role="tabpanel" aria-labelledby="trip-details">
                    <dl className="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-6 dark:text-white sm:p-8">
                        <div className="flex flex-col items-center justify-center">
                            <dt className="mb-1 font-semibold md:text-md dark:text-gray-400">Trip Name:</dt>
                            <dd className="text-sm text-gray-500 font-semibold">{itinerary.name}</dd>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <dt className="mb-1 font-semibold md:text-md dark:text-gray-400">Destination:</dt>
                            <dd className="text-sm text-gray-500 font-semibold"> {itinerary.destination}</dd>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <dt className="mb-1 font-semibold md:text-md dark:text-gray-400">Duration:</dt>
                            <dd className="text-sm text-gray-500 font-semibold">{itinerary.from_date} - {itinerary.to_date}</dd>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <dt className="mb-1 font-semibold md:text-md dark:text-gray-400">Travelers:</dt>
                            <dd className="text-sm text-gray-500 font-semibold pb-4">{itinerary.num_travelers}</dd>
                        </div>
                    </dl>
                </div>
            </div>
            <div id="accommodations" className={`p-4 rounded-lg md:p-8 dark:bg-gray-800 ${selectedTab === 'accommodations' ? '' : 'hidden'}`} role="tabpanel" aria-labelledby="accommodations-tab">
                <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">We invest in the world's potential</h2>
                <ul role="list" className="space-y-4 text-gray-500 dark:text-gray-400">
                    <li className="flex space-x-2 rtl:space-x-reverse items-center">
                    </li>
                    <li className="flex space-x-2 rtl:space-x-reverse items-center">
                    </li>
                    <li className="flex space-x-2 rtl:space-x-reverse items-center">
                    </li>
                    <li className="flex space-x-2 rtl:space-x-reverse items-center">
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default ItineraryDetails;
