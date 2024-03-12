import React, {useState} from 'react';
import { budgetApi } from './app/budgetApi';
import { useDispatch } from 'react-redux';

function BudgetForm() {
    const dispatch = useDispatch();
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [payment_method, setpayment_method] = useState('');
    

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(budgetApi ({
            description,
            amount,
            date,
            payment_method,
        }));
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
                    <label htmlFor='payment_method'>Payment Method:</label>
                    <input
                    type="payment_method"
                    id="payment_method"
                    value={payment_method}
                    onChange={e => setpayment_method(e.target.value)} required
                    />
                </div>
                <button type="submit">Create Budget</button>
            </form>
        </div>
    );
}
export default BudgetForm;
