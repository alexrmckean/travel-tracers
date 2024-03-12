import { useItineraryQuery } from './app/itineraryApi'



function Itinerary() {
    // const { data: itinerary = [] } = useItineraryQuery()

    // return (
    //     <div>
    //         <h1>My Itinerary</h1>
    //         <ul>
    //             {itinerary.map((itinerary) => (
    //                 <div key={itinerary.id}>
    //                     <p>
    //                         Name: {itinerary.name}
    //                         <div></div>
    //                         Destination: {itinerary.destination}
    //                         <div></div>
    //                         From: {itinerary.from_date}
    //                         <div></div>
    //                         To: {itinerary.to_date}
    //                         <div></div>
    //                         Number of Travelers: {itinerary.num_travelers}
    //                         <div></div>
    //                     </p>
    //                 </div>
    //             ))}
    //         </ul>
    //     </div>
    // )

    const { data: itinerary = [] } = useItineraryQuery()

    return (
    <>
        <div className="my-5 container">
            <h1>My Initerary</h1>
        </div>
        <table className="table table-striped">
            <thead className="thead-dark">
                <tr>
                    <th>Name</th>
                    <th>Destination</th>
                    <th>To Date</th>
                    <th>From Date</th>
                    <th>Number of Travelers</th>
                </tr>
            </thead>
            <tbody>
                {itinerary.map(itinerary => {
                    return(
                        <tr key={itinerary.id}>
                            <td>{itinerary.name}</td>
                            <td>{itinerary.destination}</td>
                            <td>{itinerary.to_date}</td>
                            <td>{itinerary.from_date}</td>
                            <td>{itinerary.num_travelers}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </>
    );

}
export default Itinerary;
