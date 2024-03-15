import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreatePackingListMutation } from '../app/PackingSlice';

function PackingListForm() {
    const navigate = useNavigate();
    const [item, setItem] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');
    const [priority, setPriority] = useState('');
    const [status, setStatus] = useState(false);
    const [notes, setNotes] = useState('');
    const [deadline, setDeadline] = useState('');
    const [createPackingList] = useCreatePackingListMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await createPackingList({
                item,
                quantity,
                category,
                priority,
                checklist_status:status,
                notes,
                deadline,
            }).unwrap();

            navigate('/api/packing_list');
        } catch (error) {
            console.error('Error creating Packing List:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-md border">
            <h2 className="text-2xl font-bold mb-4">Create Packing List</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="item" className="block text-sm font-medium text-gray-700">Item</label>
                    <input
                        type="text"
                        id="item"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                    <input
                        type="text"
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                    <input
                        type="text"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
                    <input
                        type="text"
                        id="priority"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                    <input
                        type="checkbox"
                        id="status"
                        checked={status}
                        onChange={(e) => setStatus(e.target.checked)}
                        className="mt-1 p-2 border rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
                    <input
                        type="text"
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>
                <div className="mb-4">
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
                    className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
                >
                    Create List
                </button>
            </form>
        </div>
    );
}

export default PackingListForm;
