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
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
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
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <h1 className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white pb-8 pt-8 pl-4">My Packing List</h1>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead>
                    <tr className="bg-gray-100 dark:bg-gray-800">
                        <th scope="col" className="px-6 py-3">Item</th>
                        <th scope="col" className="px-6 py-3">Quantity</th>
                        <th scope="col" className="px-6 py-3">Category</th>
                        <th scope="col" className="px-6 py-3">Priority</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                        <th scope="col" className="px-6 py-3">Notes</th>
                        <th scope="col" className="px-6 py-3">Deadline</th>
                        <th scope="col" className="px-6 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedPackingList.map((packingItem) => (
                        <tr key={packingItem.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <td className="px-6 py-4">
                                {packingItem.item}
                            </td>
                            <td className="px-6 py-4">
                                {packingItem.quantity}
                            </td>
                            <td className="px-6 py-4">
                                {packingItem.category}
                            </td>
                            <td className="px-6 py-4">
                                {packingItem.priority}
                            </td>
                            <td className="px-6 py-4">
                                <UpdateCheckbox
                                    packingListId={packingItem.id}
                                />
                            </td>
                            <td className="px-6 py-4">
                                {packingItem.notes}
                            </td>
                            <td className="px-6 py-4">
                                {packingItem.deadline}
                            </td>
                            <td className="px-6 py-4">
                            <div className="flex space-x-4">
                                    <Link to={`/api/packing_list/edit/${packingItem.id}`}>
                                        <button className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit
                                        </button>
                                    </Link>
                                    <DeleteButton packingListId={packingItem.id} />
                                    <Link
                                        to={`/api/packing_list/${packingItem.id}`}
                                    >
                                        <button className="text-white bg-gray-400  hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                                            Details
                                        </button>
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg pt-4 pb-4 pl-4">
                <Link to="/api/packing_list/create/" className="block mt-4">
                    <button className="text-white bg-green-400 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        Create Packing List
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Packing
