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
        <div className="max-w-md mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Edit Packing List</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="item" className="block text-sm font-medium text-gray-700">Item</label>
                    <input
                        type="text"
                        id="item"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>

                <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                    <input
                        type="text"
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>

                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                    <input
                        type="text"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>

                <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
                    <input
                        type="text"
                        id="priority"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="status"
                        checked={status}
                        onChange={handleStatusChange}
                        className="mr-2 border rounded-md"
                    />
                    <label htmlFor="status" className="text-sm font-medium text-gray-700">Status</label>
                </div>

                <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
                    <input
                        type="text"
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>

                <div>
                    <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">Deadline</label>
                    <input
                        type="date"
                        id="deadline"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                >
                    Update List
                </button>
            </form>
        </div>
    );
}

export default EditPackingListForm;
