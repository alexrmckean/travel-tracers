import { useAccommodationsQuery, useDeleteAccommodationsMutation } from '../app/AccommodationSlice';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useGetTokenQuery } from '../app/AuthSlice';
import { useEffect, useState } from 'react';

function DeleteButton({ accommodationId }) {
    const [deleteAccommodation] = useDeleteAccommodationsMutation();

    const handleDelete = async () => {
        try {
            await deleteAccommodation(accommodationId);
        } catch (error) {
            console.error('Error deleting accommodation:', error);
        }
    };

    return (
        <button onClick={handleDelete} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
            Delete
        </button>
    );
}

function Accommodations() {
    const navigate = useNavigate();
    const { data: token } = useGetTokenQuery();
    const { data: accommodations = [], error: accommodationsError, isLoading: accommodationsLoading } = useAccommodationsQuery({}, {
        skip: !token,
        refetchOnMountOrArgChange: false
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token === undefined) {
            return; 
        }

        if (!token) {
            navigate('/api/login');
        } else {
            setLoading(false);
        }
    }, [token, navigate]);


    return (
        <div>
            <h1 className="text-2xl font-semibold whitespace-nowrap dark:text-white pb-8 pt-8 pl-4">My Accommodations</h1>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Hotel
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Flight Number
                            </th>
                            <th scope="col" className="px-6 py-3">
                                From Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Notes
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {accommodations.map((accommodation) => (
                            <tr key={accommodation.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <td className="px-6 py-4">
                                    {accommodation.hotel}
                                </td>
                                <td className="px-6 py-4">
                                    {accommodation.flight_number}
                                </td>
                                <td className="px-6 py-4">
                                    {accommodation.from_date}
                                </td>
                                <td className="px-6 py-4">
                                    {accommodation.notes}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex space-x-4">
                                        <Link to={`/api/accommodations/edit/${accommodation.id}`}>
                                            <button className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                Edit
                                            </button>
                                        </Link>
                                        <DeleteButton accommodationId={accommodation.id} />
                                        <Link to={`/api/accommodations/${accommodation.id}`}>
                                            <button className="text-white bg-gray-400 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                                                Details
                                            </button>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg pt-4 pb-4 pl-4">
                <Link to="/api/accommodations/create/">
                    <button type="button" className="text-white bg-green-400 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        Create Accommodation
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Accommodations;
