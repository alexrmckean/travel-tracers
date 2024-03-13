import { useAccommodationsQuery, useDeleteAccommodationsMutation } from '../app/AccommodationSlice'
import { Link } from 'react-router-dom';


function DeleteButton({ accommodationId }) {
    const [deleteAccommodation] = useDeleteAccommodationsMutation();

    const handleDelete = async () => {
        try {
            await deleteAccommodation(accommodationId);

        } catch (error) {
            console.error('Error deleting accommodation:', error);
        }
    };

    return <button onClick={handleDelete}>Delete</button>;
}


function Accommodations() {
    const { data: accommodations = [] } = useAccommodationsQuery()

    return (
        <div>
            <h1>My Accommodations</h1>
            <ul>
                {accommodations.map((accommodation) => (
                    <div key={accommodation.id}>
                        <p>
                            <div>Hotel: {accommodation.hotel}</div>
                            <div>Flight Number: {accommodation.flight_number}</div>
                            <div>From Date: {accommodation.from_date}</div>
                            <div>Notes: {accommodation.notes}</div>
                            <div>
                                <DeleteButton accommodationId={accommodation.id} />
                                <Link to={`/api/accommodations/edit/${accommodation.id}`}>
                                    <button>Edit</button>
                                </Link>
                                <Link to={`/api/accommodations/${accommodation.id}`}>
                                    <button>Details!</button>
                                </Link>
                            </div>
                        </p>
                    </div>
                ))}
            </ul>
            <Link to="/api/accommodations/create/">
                <button type="button">Create an accommodation</button>
            </Link>
        </div>
    )
}

export default Accommodations;
