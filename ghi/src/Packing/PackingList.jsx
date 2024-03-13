import {
    usePackingListQuery,
    useCreatePackingListMutation,
    useUpdatePackingListMutation,
    useDeletePackingListMutation,
} from '../app/PackingSlice'
import { Link } from 'react-router-dom';

function DeleteButton({ packingListId }) {
    const [deletePackingList] = useDeletePackingListMutation();

    const handleDelete = async () => {
        try {
            await deletePackingList(packingListId);
        } catch (error) {
            console.error('Error deleting Packing List:', error);
        }
    };
    return <button onClick={handleDelete}>Delete</button>;
}

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
                            <div>
                                <DeleteButton packingListId={packingList.id} />
                                <Link
                                    to={`/api/packing_list/${packingList.id}`}
                                >
                                    <button>Edit</button>
                                </Link>
                            </div>
                        </p>
                    </div>
                ))}
            </ul>
            <Link to="/api/packing_list/create/">
                <button type="button">Create Packing List</button>
            </Link>
        </div>
    )
}

export default Packing
