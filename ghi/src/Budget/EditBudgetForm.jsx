import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUpdateBudgetMutation, useBudgetByIdQuery } from '../app/BudgetSlice';

function EditBudgetForm({ budgetId }) {
    const navigate = useNavigate();
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');

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
            navigate('/api/budgets');
        } catch (error) {
            console.error('Error editing budget:', error);
        }
    }

    if (isLoading) return <div className="text-center mt-8">Loading...</div>;
    if (isError) return <div className="text-center mt-8">Error fetching data...</div>;

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md" >
            <h2 className="text-2xl font-semibold mb-4">Edit a Budget</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor='description' className="block text-gray-600 font-semibold mb-2">Description:</label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor='amount' className="block text-gray-600 font-semibold mb-2">Amount:</label>
                    <input
                        type="text"
                        id="amount"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor='date' className="block text-gray-600 font-semibold mb-2">Date:</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor='paymentMethod' className="block text-gray-600 font-semibold mb-2">Payment Method:</label>
                    <input
                        type="text"
                        id="paymentMethod"
                        value={paymentMethod}
                        onChange={e => setPaymentMethod(e.target.value)}
                        className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">Update Budget</button>
            </form>
        </div>
    );
}

export default EditBudgetForm;
