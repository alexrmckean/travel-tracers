import React from 'react'
import {
    usePackingListQuery,
    useDeletePackingListMutation,
} from '../app/PackingSlice'
import { Link } from 'react-router-dom'
import '../App.css';

function DeleteButton({ packingListId }) {
    const [deletePackingList] = useDeletePackingListMutation()

    const handleDelete = async () => {
        try {
            await deletePackingList(packingListId)
        } catch (error) {
            console.error('Error deleting Packing List:', error)
        }
    }

    return <button onClick={handleDelete}>Delete</button>
}

function Packing() {
    const { data: packingList = [] } = usePackingListQuery();

    return (
        <>
            <div className="my-5 container">
                <h1>My Packing List</h1>
                <Link to="/api/packing_list/create/">
                    <button>Create Packing List</button>
                </Link>
            </div>
            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>Item</th>
                        <th>Category</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Notes</th>
                        <th>Deadline</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {packingList.map((packingList) => (
                        <tr key={packingList.id}>
                            <td>{packingList.item}</td>
                            <td>{packingList.category}</td>
                            <td>{packingList.priority}</td>

                            <td>
                                {packingList.status ? 'Checked' : 'Unchecked'}
                            </td>

                            <td>{packingList.notes}</td>
                            <td>{packingList.deadline}</td>
                            <td>
                                <Link
                                    to={`/api/packing_list/edit/${packingList.id}`}
                                >
                                    <button>Edit</button>
                                </Link>
                                <DeleteButton packingListId={packingList.id} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Packing
