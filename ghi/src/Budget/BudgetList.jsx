import React from 'react';
import { useBudgetsQuery, useDeleteBudgetMutation } from '../app/BudgetSlice';
import { Link } from 'react-router-dom';

function DeleteButton({ budgetId }) {
    const [deleteBudget] = useDeleteBudgetMutation();

    const handleDelete = async () => {
        try {
            await deleteBudget(budgetId);
        } catch (error) {
            console.error('Error deleting budget:', error);
        }
    };

    return <button onClick={handleDelete}>Delete</button>;
}

function Budget() {
    const { data: budgets = [] } = useBudgetsQuery();

    return (
        <>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <h1 class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white pb-8 pt-8 pl-4">My Budget</h1>
            </div>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Payment Method
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Amount
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Edit
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {budgets.map((budget) => (
                            <tr key={budget.id} class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <td class="px-6 py-4">
                                    {budget.date}
                                </td>
                                <td class="px-6 py-4">
                                    {budget.description}
                                </td>
                                <td class="px-6 py-4">
                                    {budget.payment_method}
                                </td>
                                <td class="px-6 py-4">
                                    {budget.amount}
                                </td>
                                <td class="px-6 py-4">
                                    <Link to={`/api/budgets/edit/${budget.id}`}>
                                        <button class="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</button>
                                    </Link>
                                </td>
                                <td class="px-6 py-4">
                                    <button class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                        < DeleteButton budgetId={budget.id} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg pt-4 pb-4 pl-4">
                    <Link to="/api/budgets/create/">
                    <button type="button" class="text-white bg-green-400 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Create Budget Item</button>
                    </Link>
                </div>
            </div>
        </>

    );


}

export default Budget;
