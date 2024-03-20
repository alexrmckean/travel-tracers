import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    usePackingListQuery,
    useUpdatePackingListMutation,
    useDeletePackingListMutation,
    usePackingListByIdQuery,
} from '../app/PackingSlice'
import { useGetTokenQuery } from '../app/AuthSlice'

function DeleteButton({ packingListId }) {
    const [deletePackingList] = useDeletePackingListMutation()

    const handleDelete = async () => {
        try {
            await deletePackingList(packingListId)
        } catch (error) {
            console.error('Error deleting Packing List:', error)
        }
    }

    return (
        <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700
    text-white font-bold py-2 px-4 rounded mr-2"
        >
            Delete
        </button>
    )
}

function UpdateCheckbox({ packingListId }) {
    const [status, setStatus] = useState(false)
    const [item, setItem] = useState('')
    const [quantity, setQuantity] = useState('')
    const [category, setCategory] = useState('')
    const [priority, setPriority] = useState('')
    const [notes, setNotes] = useState('')
    const [deadline, setDeadline] = useState('')

    const {
        data: initialData,
        isLoading,
        isError,
    } = usePackingListByIdQuery(packingListId)

    useEffect(() => {
        if (initialData) {
            setStatus(!!initialData.checklist_status)
            setItem(initialData.item)
            setQuantity(initialData.quantity)
            setCategory(initialData.category)
            setPriority(initialData.priority)
            setNotes(initialData.notes)
            setDeadline(initialData.deadline)
        }
    }, [initialData])

    const [updatePackingList] = useUpdatePackingListMutation()

    const handleCheckboxChange = async (e) => {
        const newStatus = e.target.checked
        setStatus(newStatus)
        try {
            console.log('Data being sent in PUT request:', {
                packingList_id: packingListId,
                checklist_status: newStatus,
                item,
                quantity,
                category,
                priority,
                notes,
                deadline,
            })
            await updatePackingList({
                packingList_id: packingListId,
                checklist_status: newStatus,
                item,
                quantity,
                category,
                priority,
                notes,
                deadline,
            })
            console.log('Update successful for packingItemId:', packingListId)
        } catch (error) {
            console.error('Error updating Packing List status:', error)
        }
    }

    return (
        <input
            type="checkbox"
            checked={status}
            onChange={handleCheckboxChange}
            className="mt-1 p-2 border rounded-md"
        />
    )
}

function Packing() {
    const navigate = useNavigate()
    const { data: token } = useGetTokenQuery()
    const {
        data: packingList = [],
        isLoading,
        isError,
    } = usePackingListQuery(
        {},
        {
            skip: !token, // Skip fetching packing list until token is available
            refetchOnMountOrArgChange: false, // Prevent automatic refetching
        }
    )
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (token === undefined) {
            return // Wait until token is defined
        }

        if (!token) {
            navigate('/api/login')
        } else {
            setLoading(false)
        }
    }, [token, navigate])

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error fetching data...</div>

    const sortedPackingList = packingList
        .slice()
        .sort((a, b) => a.priority - b.priority)

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-semibold mb-4">My Packing List</h1>
            <table className="table-auto w-full">
                <thead>
                    <tr className="bg-gray-100 dark:bg-gray-800">
                        <th className="px-4 py-2">Item</th>
                        <th className="px-4 py-2">Quantity</th>
                        <th className="px-4 py-2">Category</th>
                        <th className="px-4 py-2">Priority</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Notes</th>
                        <th className="px-4 py-2">Deadline</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedPackingList.map((packingItem) => (
                        <tr key={packingItem.id}>
                            <td className="border px-4 py-2">
                                {packingItem.item}
                            </td>
                            <td className="border px-4 py-2">
                                {packingItem.quantity}
                            </td>
                            <td className="border px-4 py-2">
                                {packingItem.category}
                            </td>
                            <td className="border px-4 py-2">
                                {packingItem.priority}
                            </td>
                            <td className="border px-4 py-2">
                                <UpdateCheckbox
                                    packingListId={packingItem.id}
                                />
                            </td>
                            <td className="border px-4 py-2">
                                {packingItem.notes}
                            </td>
                            <td className="border px-4 py-2">
                                {packingItem.deadline}
                            </td>
                            <td className="border px-4 py-2">
                                <Link
                                    to={`/api/packing_list/edit/${packingItem.id}`}
                                >
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                                        Edit
                                    </button>
                                </Link>
                                <DeleteButton packingListId={packingItem.id} />
                                <Link
                                    to={`/api/packing_list/${packingItem.id}`}
                                >
                                    <button className="text-white bg-gray-400 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                                        Details
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/api/packing_list/create/" className="block mt-4">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Create Packing List
                </button>
            </Link>
        </div>
    )
}

export default Packing
