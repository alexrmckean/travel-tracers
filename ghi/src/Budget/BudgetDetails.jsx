import React from 'react';
import { useBudgetByIdQuery } from '../app/BudgetSlice';
import { useParams } from 'react-router-dom';

function BudgetDetails() {
    const { budget_id } = useParams();


    const { data: budget, error, isLoading } = useBudgetByIdQuery(budget_id);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!budget) {
        return <div>Budget not found</div>;
    }

    return (
        <div>
            <h2>Budget Details</h2>
            <p>Description: {budget.description}</p>
            <p>Amount: {budget.amount}</p>
            <p>Date: {budget.date}</p>
            <p>Payment Method: {budget.payment_method}</p>
        </div>
    );
}

export default BudgetDetails;
