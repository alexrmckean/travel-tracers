import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useCreateBudgetMutation } from '../app/BudgetSlice';

function BudgetForm() {
    const dispatch = useDispatch();
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [createBudget] = useCreateBudgetMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createBudget({
                description,
                amount,
                date,
                payment_method: paymentMethod,
            });
        } catch (error) {
            console.error('Error creating budget:', error);
        }
    }

    return (
        <div>
            <h2>Create a Budget</h2>
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
                <button type="submit">Create Budget</button>
            </form>
        </div>
    );
}

export default BudgetForm;
