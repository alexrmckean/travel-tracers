import { useAccommodationsQuery } from '../app/AccommodationSlice'

function Accommodations() {
    const { data: accommodations = [] } = useAccommodationsQuery()

    return (
        <div>
            <h1>My Accommodations</h1>
            <ul>
                {accommodations.map((accommodation) => (
                    <div key={accommodation.id}>
                        <p>
                            Hotel: {accommodation.hotel}
                            <div></div>
                            Flight Number: {accommodation.flight_number}
                            <div></div>
                            From Date: {accommodation.from_date}
                            <div></div>
                            Notes: {accommodation.notes}
                        </p>
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default Accommodations;
