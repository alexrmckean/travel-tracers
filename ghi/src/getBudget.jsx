import { useBudgetsQuery } from './app/budgetApi'

function Budget() {
    const { data: budgets = [] } = useBudgetsQuery()

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
        </div>
    )
}

export default Budget;
