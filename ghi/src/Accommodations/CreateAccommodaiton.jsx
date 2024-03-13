import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useCreateAccommodationsMutation } from '../app/AccommodationSlice';

function AccommodationForm() {
    const dispatch = useDispatch();
    const [hotel, setHotel] = useState('');
    const [flightNumber, setFlightNumber] = useState('');
    const [flightNumber2, setFlightNumber2] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [notes, setNotes] = useState('');
    const [createAccommodations] = useCreateAccommodationsMutation();

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
        } catch (error) {
            console.error('Error creating accommodation:', error);
        }
    }

    return (
        <div>
            <h2>Create an Accommodation</h2>
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
                <button type="submit">Create Accommodation</button>
            </form>
        </div>
    );
}

export default AccommodationForm;
