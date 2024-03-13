import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useCreatePackingListMutation } from '../app/PackingSlice';

function PackingListForm() {
    const dispatch = useDispatch();
    const [item, setItem] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');
    const [priority, setPriority] = useState('');
    const [status, setStatus] = useState('');
    const [notes, setNotes] = useState('');
    const [deadline, setDeadline] = useState('');
    const [createPackingList] = useCreatePackingListMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createPackingList({
                item,
                quantity,
                category,
                priority,
                status,
                notes,
                deadline,
            });
        } catch (error) {
            console.error('Error creating Packing List', error);
        }
    }

    return (
        <div>
            <h2>Create Packing List</h2>
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
                        type="text"
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                    <div>
                        <label htmlFor="deadline">Deadline</label>
                        <input
                            type="date"
                            id="deadline"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                        />
                    </div>
                </div>
                <button type="submit">Create List</button>
            </form>
        </div>
    )
}

export default PackingListForm;
