import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useUpdateBudgetMutation } from '../app/BudgetSlice';

function EditBudgetForm({ budgetId, initialData}) {
    const dispatch = useDispatch();
    const [description, setDescription] = useState(initialData?.description || '');
    const [amount, setAmount] = useState(initialData?.amount || '');
    const [date, setDate] = useState(initialData?.date || '');
    const [paymentMethod, setPaymentMethod] = useState(initialData?.payment_method || '');

     useEffect(() => {
        if (!initialData) {
            // Fetch initial data from API using budgetId
        }
    }, [initialData, budgetId]);

    const [createBudget] = useUpdateBudgetMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createBudget({
                budget_id: budgetId,
                description,
                amount,
                date,
                payment_method: paymentMethod,
            });
        } catch (error) {
            console.error('Error editing budget:', error);
        }
    }

    return (
        <div>
            <h2>Edit a Budget</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='description'>Description:</label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='amount'>Amount:</label>
                    <input
                        type="text"
                        id="amount"
                        value={amount}
                        onChange={e => setAmount(e.target.value)} required
                    />
                </div>
                <div>
                    <label htmlFor='date'>Date:</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={e => setDate(e.target.value)} required
                    />
                </div>
                <div>
                    <label htmlFor='paymentMethod'>Payment Method:</label>
                    <input
                        type="text"
                        id="paymentMethod"
                        value={paymentMethod}
                        onChange={e => setPaymentMethod(e.target.value)} required
                    />
                </div>
                <button type="submit">Update Budget</button>
            </form>
        </div>
    );
}

export default EditBudgetForm;
