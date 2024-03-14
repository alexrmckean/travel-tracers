import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useUpdatePackingListMutation } from '../app/PackingSlice'
import { useNavigate } from 'react-router-dom'

function EditPackingListForm({ packingListId, initialData }) {
    const dispatch = useDispatch() // Note: dispatch is declared but not used. Consider removing if unnecessary.
    const [item, setItem] = useState(initialData?.item || '')
    const [quantity, setQuantity] = useState(initialData?.quantity || '')
    const [category, setCategory] = useState(initialData?.category || '')
    const [priority, setPriority] = useState(initialData?.priority || '')
    const [status, setStatus] = useState(initialData?.status || false) // Adjusted for checkbox handling
    const [notes, setNotes] = useState(initialData?.notes || '')
    const [deadline, setDeadline] = useState(initialData?.deadline || '')
    const navigate = useNavigate()

    const [updatePackingList] = useUpdatePackingListMutation()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const result = await updatePackingList({
                packingList_id: packingListId,
                item,
                quantity,
                category,
                priority,
                status,
                notes,
                deadline,
            })
            console.log(
                item,
                quantity,
                category,
                priority,
                status,
                notes,
                deadline
            )
            if (result?.data) {
                navigate('/api/packing_list');
            }
        } catch (error) {
            console.error('Error editing Packing List:', error)
        }
    }

    const handleStatusChange = (e) => {
        setStatus(e.target.checked) // Correctly updates status based on checkbox
    }

    return (
        <div>
            <h2>Edit Packing List</h2>
            <form onSubmit={handleSubmit}>
                {/* Item Input */}
                <div>
                    <label htmlFor="item">Item</label>
                    <input
                        type="text"
                        id="item"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                    />
                </div>

                {/* Quantity Input */}
                <div>
                    <label htmlFor="quantity">Quantity</label>
                    <input
                        type="text"
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </div>

                {/* Category Input */}
                <div>
                    <label htmlFor="category">Category</label>
                    <input
                        type="text"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>

                {/* Priority Input */}
                <div>
                    <label htmlFor="priority">Priority</label>
                    <input
                        type="text"
                        id="priority"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    />
                </div>

                {/* Status Checkbox */}
                <div>
                    <label htmlFor="status">Status</label>
                    <input
                        type="checkbox"
                        name="checkbox-field"
                        id="status"
                        checked={status}
                        onChange={handleStatusChange}
                    />
                </div>

                {/* Notes Input */}
                <div>
                    <label htmlFor="notes">Notes</label>
                    <input
                        type="text"
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>

                {/* Deadline Input */}
                <div>
                    <label htmlFor="deadline">Deadline</label>
                    <input
                        type="date"
                        id="deadline"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                    />
                </div>

                <button type="submit">Update List</button>
            </form>
        </div>
    )
}

export default EditPackingListForm
