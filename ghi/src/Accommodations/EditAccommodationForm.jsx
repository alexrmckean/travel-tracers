import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useUpdateAccommodationsMutation } from '../app/AccommodationSlice';
import { Link } from 'react-router-dom';


function EditAccommodationForm({ accommodationId, initialData}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [hotel, setHotel] = useState(initialData?.hotel || '');
    const [flightNumber, setFlightNumber] = useState(initialData?.flight_number || '');
    const [flightNumber2, setFlightNumber2] = useState(initialData?.flight_number_2 || '');
    const [fromDate, setFromDate] = useState(initialData?.from_date || '');
    const [toDate, setToDate] = useState(initialData?.to_date || '');
    const [notes, setNotes] = useState(initialData?.notes || '');

     useEffect(() => {
        if (!initialData) {
            // Fetch initial data from API using accommodationId
        }
    }, [initialData, accommodationId]);

    const [createAccommodation] = useUpdateAccommodationsMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createAccommodation({
                accommodation_id: accommodationId,
                hotel,
                flight_number: flightNumber,
                flight_number_2: flightNumber2,
                from_date: fromDate,
                to_date: toDate,
                notes,
            });
        } catch (error) {
            console.error('Error editing accommodation:', error);
        }
    }

    return (
        <div>
            <h2>Edit an Accommodation</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='hotel'>Hotel:</label>
                    <input
                        type="text"
                        id="hotel"
                        value={hotel}
                        onChange={e => setHotel(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='flightNumber'>Flight Number:</label>
                    <input
                        type="text"
                        id="flightNumber"
                        value={flightNumber}
                        onChange={e => setFlightNumber(e.target.value)} required
                    />
                </div>
                <div>
                    <label htmlFor='flightNumber2'>Flight Number 2:</label>
                    <input
                        type="text"
                        id="flightNumber2"
                        value={flightNumber2}
                        onChange={e => setFlightNumber2(e.target.value)} required
                    />
                </div>
                <div>
                    <label htmlFor='fromDate'>From:</label>
                    <input
                        type="date"
                        id="fromDate"
                        value={fromDate}
                        onChange={e => setFromDate(e.target.value)} required
                    />
                </div>
                <div>
                    <label htmlFor='toDate'>To:</label>
                    <input
                        type="date"
                        id="toDate"
                        value={toDate}
                        onChange={e => setToDate(e.target.value)} required
                    />
                </div>
                <div>
                    <label htmlFor='notes'>Additional Notes:</label>
                    <input
                        type="text"
                        id="notes"
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                    />
                </div>
                    <button type="submit">Update Accommodation</button>
            </form>
        </div>
    );
}

export default EditAccommodationForm;
