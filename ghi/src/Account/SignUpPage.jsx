import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAccount } from '../app/AccountSlice';

const SignUp = () => {
    const dispatch = useDispatch();
    const [full_name, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');


const handleSubmit = (e) => {
    e.preventDefault();
    console.log('login');
    console.log({ full_name, email, password });
    if (password !== passwordConfirmation) {
        alert ('Passwords do not match');
    return;
    }
    dispatch (createAccount ({
        full_name,
        email,
        password,
    }));
}

    return (
        <div>
            <h2>Create an Account</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='full_name'>Full Name:</label>
                    <input
                    type="text"
                    id="full_name"
                    value={full_name}
                    onChange={e => setFullName(e.target.value)} required
                    />
                </div>
                <div>
                    <label htmlFor='email'>Username:</label>
                    <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)} required
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password:</label>
                    <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)} required
                    />
                </div>
                <div>
                    <label htmlFor='passwordConfirmation'>Confirm Password:</label>
                    <input
                    type="password"
                    id="passwordConfirmation"
                    value={passwordConfirmation}
                    onChange={e => setPasswordConfirmation(e.target.value)} required
                    />
                </div>
                <button type="submit">Create Account</button>
            </form>
        </div>
    );
}

export default SignUp;
