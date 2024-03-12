import { useBudgetsQuery } from './app/budgetApi'
import { Link } from 'react-router-dom';

function Budget() {
    const { data: budgets = [] } = useBudgetsQuery()

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div>
            <h1>My Budgets</h1>
            <ul>
                {budgets.map((budget) => (
                    <div key={budget.id}>
                        <p>
                            Description: {budget.description}
                            <div></div>
                            Amount: {budget.amount}
                            <div></div>
                            Date: {budget.date}
                            <div></div>
                            Payment Method: {budget.payment_method}
                            <div></div>
                        </p>
                    </div>
                ))}
            </ul>
            <Link to="/api/budgets/create/">
                <button type='button'>Create a budget</button>
            </Link>
        </div>
    )
}

export default Budget;
