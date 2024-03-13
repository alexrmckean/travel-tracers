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
        <div>
            <h1>My Budgets</h1>
            <ul>
                {budgets.map((budget) => (
                    <div key={budget.id}>
                        <p>
                            Description: {budget.description}
                            <div>Amount: {budget.amount}</div>
                            <div>Date: {budget.date}</div>
                            <div>Payment Method: {budget.payment_method}</div>
                            <div>
                                <DeleteButton budgetId={budget.id} />
                                <Link to={`/api/budgets/edit/${budget.id}`}>
                                    <button>Edit</button>
                                     </Link>
                            </div>
                        </p>
                    </div>
                ))}
            </ul>
            <Link to="/api/budgets/create/">
                <button type="button">Create a budget</button>
            </Link>
        </div>
    );
}

export default Budget;
