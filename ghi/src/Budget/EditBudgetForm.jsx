import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUpdateBudgetMutation, useBudgetByIdQuery } from '../app/BudgetSlice';

function EditBudgetForm({ budgetId }) {
    const navigate = useNavigate();
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');

    // Fetch initial data from API using budgetId
    const { data: initialData, isLoading, isError } = useBudgetByIdQuery(budgetId);

    useEffect(() => {
        if (initialData) {
            setDescription(initialData.description);
            setAmount(initialData.amount);
            setDate(initialData.date);
            setPaymentMethod(initialData.payment_method);
        }
    }, [initialData]);

    const [updateBudget] = useUpdateBudgetMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateBudget({
                budget_id: budgetId,
                description,
                amount,
                date,
                payment_method: paymentMethod,
            });
            // Navigate to the budget list page after successful update
            navigate('/api/budgets');
        } catch (error) {
            console.error('Error editing budget:', error);
        }
    }

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching data...</div>;

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
