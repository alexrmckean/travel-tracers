import React from 'react';
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

    return <button onClick={handleDelete}>Delete</button>;
}

function Itinerary() {
    const { data: itinerary = [] } = useItineraryQuery();

    return (
        <>
            <div className="my-5 container">
                <h1>My Itinerary</h1>
            </div>
            <Link to="/api/itinerary/create/">
                <button>Create Itinerary</button>
            </Link>
            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Destination</th>
                        <th>To Date</th>
                        <th>From Date</th>
                        <th>Number of Travelers</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {itinerary.map((itinerary) => (
                        <tr key={itinerary.id}>
                            <td>{itinerary.name}</td>
                            <td>{itinerary.destination}</td>
                            <td>{itinerary.from_date}</td>
                            <td>{itinerary.to_date}</td>
                            <td>{itinerary.num_travelers}</td>
                            <td>
                                <Link to={`/api/itinerary/edit/${itinerary.id}`}>
                                    <button>Edit</button>
                                </Link>
                                <DeleteButton itineraryId={itinerary.id} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Itinerary;
