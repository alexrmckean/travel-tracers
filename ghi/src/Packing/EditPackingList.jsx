import React, { useState, useEffect } from 'react';
import {useDispatch } from 'react-redux';
import { useUpdatePackingListMutation } from '../app/PackingSlice';

function EditPackingListForm({ packingListId, initialData }) {
    const dispatch = useDispatch();
    const [item, setItem] = useState(initialData?.item || '');
    const [quantity, setQuantity] = useState(initialData?.quantity || '');
    const [category, setCategory] = useState(initialData?.category || '');
    const [priority, setPriority] = useState(initialData?.priority || '');
    const [status, setStatus] = useState(initialData?.status || '')
    const [notes, setNotes] = useState(initialData?.notes || '')
    const [deadline, setDeadline] = useState(initialData?.deadline || '')

    useEffect(() => {
        if (!initialData) {

        }
    }, [initialData, packingListId]);

    const [createPackingList] = useUpdatePackingListMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createPackingList({
                packing_list_id: packingListId,
                item,
                category,
                priority,
                status,
                notes,
                deadline,
            });
        } catch (error) {
            console.error('Error editing Packing List:', error);
        }
    }

    return (
        <div>
            <h2>Edit Packing List</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="item">Item</label>
                    <input
                        type="text"
                        id="item"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="quantity">Quantity</label>
                    <input
                        type="text"
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="category">Category</label>
                    <input
                        type="text"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="priority">Priority</label>
                    <input
                        type="text"
                        id="priority"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="status">Status</label>
                    <input
                        type="text"
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="notes">Notes</label>
                    <input
                        type="notes"
                        id="notes"
                        value={item}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="deadline">Deadline</label>
                    <input
                        type="text"
                        id="deadline"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                    />
                </div>
                <button type="submit">Update Packing List</button>
            </form>
        </div>
    )
}

export default EditPackingListForm
