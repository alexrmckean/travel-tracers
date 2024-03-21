import React, { useState, useEffect } from 'react';
import { usePackingListByIdQuery, useUpdatePackingListMutation } from '../app/PackingSlice';
import { useNavigate } from 'react-router-dom';

function EditPackingListForm({ packingListId }) {
    const [item, setItem] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');
    const [priority, setPriority] = useState('');
    const [status, setStatus] = useState(false);
    const [notes, setNotes] = useState('');
    const [deadline, setDeadline] = useState('');
    const navigate = useNavigate();

    const { data: initialData, isLoading, isError } = usePackingListByIdQuery(packingListId);

    useEffect(() => {
        if (initialData) {
            setItem(initialData.item);
            setQuantity(initialData.quantity);
            setCategory(initialData.category);
            setPriority(initialData.priority);
            setStatus(!!initialData.checklist_status);
            setNotes(initialData.notes);
            setDeadline(initialData.deadline);
        }
    }, [initialData]);

    const [updatePackingList] = useUpdatePackingListMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await updatePackingList({
                packingList_id: packingListId,
                item,
                quantity,
                category,
                priority,
                checklist_status: status,
                notes,
                deadline,
            });
            console.log(
                item,
                quantity,
                category,
                priority,
                status,
                notes,
                deadline
            );
            if (result?.data) {
                navigate('/api/packing_list');
            }
        } catch (error) {
            console.error('Error editing Packing List:', error);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching data...</div>;

    const handleStatusChange = (e) => {
        setStatus(e.target.checked); // Correctly updates status based on checkbox
    };

    return (
        <div>
            <h2 className="text-center text-2xl font-semibold whitespace-nowrap dark:text-white pb-8 pt-8 pl-4">Edit Packing List</h2>
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
                <div>
                    <label htmlFor="item" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item</label>
                    <input type="text" id="item" value={item} onChange={(e) => setItem(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
                </div>

                <div>
                    <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                    <input type="text" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
                </div>

                <div>
                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                    <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
                </div>

                <div>
                    <label htmlFor="priority" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Priority</label>
                    <input type="text" id="priority" value={priority} onChange={(e) => setPriority(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
                </div>

                <div className="mb-4">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                    <input type="checkbox" id="status" checked={status} onChange={(e) => setStatus(e.target.checked)}
                    className="mt-1 p-2 border rounded-md bg-gray-50 border-gray-300"/>
                </div>

                <div>
                    <label htmlFor="notes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Notes</label>
                    <input type="text" id="notes" value={notes} onChange={(e) => setNotes(e.target.value)}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
                </div>

                <div>
                    <label htmlFor="deadline" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deadline</label>
                    <input type="date" id="deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
                </div>

                <button
                    type="submit"className="text-white bg-green-400 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update List</button>
            </form>
        </div>
    );
}

export default EditPackingListForm;
