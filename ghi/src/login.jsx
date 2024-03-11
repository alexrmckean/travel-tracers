import React, { useState } from 'react';
import { useLoginMutation } from './app/accommodationApi';


const Login = () => {
  const [login, loginStatus] = useLoginMutation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSumbit = (e) => {
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
      <h2>Login</h2>
      <form onSubmit={handleSumbit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="Login__username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="Login__password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
