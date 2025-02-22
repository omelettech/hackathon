import React, { useState } from 'react';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loggedIn, setLoggedIn] = useState(false); // Track login status

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation (you should add more robust checks)
        if (!username || !password) {
            setError('Username and password are required.');
            return;
        }

        // Simulate authentication (replace with your actual login logic)
        if (username === 'testuser' && password === 'password') {
            setLoggedIn(true);
            setError(''); // Clear any previous errors
            // Redirect or perform actions after successful login
            console.log('Login successful!');
        } else {
            setError('Invalid username or password.');
        }
    };

    if (loggedIn) {
        // Redirect or display a welcome message, etc.
        return <div>Welcome, {username}! You are logged in.</div>;
    }

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;