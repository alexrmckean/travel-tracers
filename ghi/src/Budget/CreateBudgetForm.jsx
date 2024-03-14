import React, { useState } from 'react';
import { useCreateBudgetMutation } from '../app/BudgetSlice';
import { useNavigate } from 'react-router-dom';

function BudgetForm() {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [createBudget] = useCreateBudgetMutation();
    const navigate = useNavigate(); // Import useNavigate hook

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createBudget({
                description,
                amount,
                date,
                payment_method: paymentMethod,
            });
            // Navigate to the budget list page after successful creation
            navigate('/api/budgets');
        } catch (error) {
            console.error('Error creating budget:', error);
        }
    }

    return (
        <div>
            <h1 class="text-center text-2xl font-semibold whitespace-nowrap dark:text-white pb-8 pt-8 pl-4">Create A New Budget Item</h1>
            <form onSubmit={handleSubmit} class="max-w-sm mx-auto">
            <div class="mb-5">
                <label htmlFor='date' class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date:</label>
                <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} required class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="MM/DD/YYYY"/>
            </div>
            <div class="mb-5">
                <label htmlFor='description' class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description:</label>
                <input type="text" id="description" value={description} onChange={e => setDescription(e.target.value)} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Food, Activity, Shopping, etc."/>
            </div>
            <div class="mb-5">
                <label htmlFor='paymentMethod' class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Payment Method:</label>
                <input type="text" id="paymentMethod" value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} required class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Cash, Credit Card, etc."/>
            </div>
            <div class="mb-5">
                <label htmlFor='amount' class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount:</label>
                <input type="text" id="amount" value={amount} onChange={e => setAmount(e.target.value)} required class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="10.00" />
            </div>
            <button type="submit" class="text-white bg-green-400 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create</button>
            </form>
        </div>
    );
}

export default BudgetForm;
