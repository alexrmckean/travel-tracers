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
        <div>
            <h2 className="text-center text-2xl font-semibold whitespace-nowrap dark:text-white pb-8 pt-8 pl-4">Edit a Budget</h2>
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
                <div className="mb-4">
                    <label htmlFor='description' className="block text-gray-600 font-semibold mb-2">Description:</label>
                    <input type="text" id="description" value={description} onChange={e => setDescription(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
                </div>
                <div className="mb-4">
                    <label htmlFor='amount' className="block text-gray-600 font-semibold mb-2">Amount:</label>
                    <input type="text" id="amount" value={amount} onChange={e => setAmount(e.target.value)}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required/>
                </div>
                <div className="mb-4">
                    <label htmlFor='date' className="block text-gray-600 font-semibold mb-2">Date:</label>
                    <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required/>
                </div>
                <div className="mb-4">
                    <label htmlFor='paymentMethod' className="block text-gray-600 font-semibold mb-2">Payment Method:</label>
                    <input type="text" id="paymentMethod" value={paymentMethod}onChange={e => setPaymentMethod(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required/>
                </div>
                <button type="submit" className="text-white bg-green-400 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update Budget</button>
            </form>
        </div>
    );
}

export default EditBudgetForm;
