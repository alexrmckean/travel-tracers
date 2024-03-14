import React, { useState } from 'react'
import { useDispatch } from 'react-redux' // Kept as per your request
import { useNavigate } from 'react-router-dom' // Import useNavigate for redirection
import { useCreatePackingListMutation } from '../app/PackingSlice'

function PackingListForm() {
    const dispatch = useDispatch() // Kept as per your request, ensure it's used or consider removing it if unnecessary
    const navigate = useNavigate() // Hook for redirection
    const [item, setItem] = useState('')
    const [quantity, setQuantity] = useState('')
    const [category, setCategory] = useState('')
    const [priority, setPriority] = useState('')
    const [status, setStatus] = useState(false) // Initial state for status is false (unchecked)
    const [notes, setNotes] = useState('')
    const [deadline, setDeadline] = useState('')
    const [createPackingList] = useCreatePackingListMutation()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // Execute the mutation
            const result = await createPackingList({
                item,
                quantity,
                category,
                priority,
                status,
                notes,
                deadline,
            }).unwrap() // Using unwrap() to ensure proper error handling

            // Assuming result is successful, redirect to '/api/packing_list'
            navigate('/api/packing_list')
        } catch (error) {
            console.error('Error creating Packing List:', error)
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
                        type="checkbox"
                        id="status"
                        checked={status} // Ensures the checkbox reflects the component state
                        onChange={(e) => setStatus(e.target.checked)} // Correctly updates status
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
                </div>
                <div>
                    <label htmlFor="deadline">Deadline</label>
                    <input
                        type="date"
                        id="deadline"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                    />
                </div>
                <button type="submit">Create List</button>
            </form>
        </div>
    )
}

export default PackingListForm
