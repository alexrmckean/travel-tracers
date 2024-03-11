import { usePackingListQuery } from './app/packingListApi'

function Packing() {
    const { data: packingList = [] } = usePackingListQuery()

    return (
        <div>
            <h1>My Packing List</h1>
            <ul>
                {packingList.map((packingList) => (
                    <div key={packingList.id}>
                        <p>
                            Item: {packingList.item}
                            <div></div>
                            Quantity: {packingList.quantity}
                            <div></div>
                            Category: {packingList.category}
                            <div></div>
                            Priority: {packingList.priority}
                            <div></div>
                            Status: {packingList.status}
                            <div></div>
                            Notes: {packingList.notes}
                            <div></div>
                            Deadline: {packingList.deadline}
                        </p>
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default Packing
