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
            <h1 class="text-center text-2xl font-semibold whitespace-nowrap dark:text-white pb-8 pt-8 pl-4">Create an Account</h1>
            <form onSubmit={handleSubmit} class="max-w-sm mx-auto">
            <div class="mb-5">
                <label htmlFor='full_name' class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name:</label>
                <input type="text" id="full_name" value={full_name} onChange={e => setFullName(e.target.value)} required class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="First Last"/>
            </div>
            <div class="mb-5">
                <label htmlFor='email' class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username:</label>
                <input type="text" id="email" value={email} onChange={e => setEmail(e.target.value)} required class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@email.com" />
            </div>
            <div class="mb-5">
                <label htmlFor='password' class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password:</label>
                <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
            </div>
            <div class="mb-5">
                <label htmlFor='passwordConfirmation' class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password:</label>
                <input type="password" id="passwordConfirmation" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} required class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  />
            </div>
            <button type="submit" class="text-white bg-green-400 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;
