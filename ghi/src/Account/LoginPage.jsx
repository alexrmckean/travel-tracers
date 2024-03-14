import React, { useState } from 'react';
import { useLoginMutation } from '../app/AccommodationSlice';


const Login = () => {
  const [login, loginStatus] = useLoginMutation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('login');
    console.log({ username, password });
    login({
      username,
      password
    });
  }


    return (
    <div>
      <h1 class="text-center text-2xl font-semibold whitespace-nowrap dark:text-white pb-8 pt-8 pl-4">Login</h1>
            <form onSubmit={handleSubmit} class="max-w-sm mx-auto">
            <div class="mb-5">
                <label htmlFor='username' class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username:</label>
                <input type="text" id="Login__username" value={username} onChange={e => setUsername(e.target.value)}
            required class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@email.com"/>
            </div>
            <div class="mb-5">
                <label htmlFor='password' class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password:</label>
                <input type="password" id="Login_password" value={password} onChange={e => setPassword(e.target.value)} required class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
            </div>
            <button type="submit" class="text-white bg-green-400 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
            </form>
    </div>
  );
}

export default Login;
