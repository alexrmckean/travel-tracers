import React, { useState } from 'react';
import { useItineraryByIdQuery, useDeleteItineraryMutation } from '../app/ItinerarySlice';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAccommodationsByIdQuery } from '../app/AccommodationSlice';

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
        <button onClick={handleDelete} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
            Delete
        </button>
    );
}

function ItineraryDetails() {
    const { itinerary_id, accommodation_id } = useParams();

    const [selectedTab, setSelectedTab] = useState('trip-details');
    const [selectedACTab, setSelectedACTab] = useState('accommodations');  // Default to 'trip-details'

    const { data: itinerary, error, isLoading } = useItineraryByIdQuery(itinerary_id);

    const { data: accommodations } = useAccommodationsByIdQuery(accommodation_id);


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

    console.log(accommodations)

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
                    <DeleteButton itineraryId={itinerary_id} />
                    <Link to={`/api/itinerary/edit/${itinerary.id}`}className='pl-4'>
                                        <button className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</button>
                                    </Link>
                </div>
            </div>
            {/* <div id="accommodations" className={`p-4 rounded-lg md:p-8 dark:bg-gray-800 ${selectedACTab === 'accommodations' ? '' : 'hidden'}`} role="tabpanel" aria-labelledby="accommodations-tab">
                <div className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" role="tabpanel" aria-labelledby="accommodations">
                    <dl className="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-6 dark:text-white sm:p-8">
                        <div className="flex flex-col items-center justify-center">
                            <dt className="mb-1 font-semibold md:text-md dark:text-gray-400">Hotel:</dt>
                            <dd className="text-sm text-gray-500 font-semibold">{accommodations.hotel}</dd>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <dt className="mb-1 font-semibold md:text-md dark:text-gray-400">Flight Number 1:</dt>
                            <dd className="text-sm text-gray-500 font-semibold"> {accommodations.flight_number}</dd>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <dt className="mb-1 font-semibold md:text-md dark:text-gray-400">Flight Number 2:</dt>
                            <dd className="text-sm text-gray-500 font-semibold">{accommodations.flight_number_2}</dd>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <dt className="mb-1 font-semibold md:text-md dark:text-gray-400">From Date:</dt>
                            <dd className="text-sm text-gray-500 font-semibold pb-4">{accommodations.from_date}</dd>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <dt className="mb-1 font-semibold md:text-md dark:text-gray-400">To Date:</dt>
                            <dd className="text-sm text-gray-500 font-semibold pb-4">{accommodations.to_date}</dd>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <dt className="mb-1 font-semibold md:text-md dark:text-gray-400">Notes:</dt>
                            <dd className="text-sm text-gray-500 font-semibold pb-4">{accommodations.notes}</dd>
                        </div>
                    </dl>
                </div>
            </div> */}
        </div>
    );
}

export default ItineraryDetails;
