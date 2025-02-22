import React, { useState } from 'react';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from "../firebase/firebaseInit.tsx";
import {useNavigate} from "react-router-dom";
function LoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loggedIn, setLoggedIn] = useState(false); // Track login status

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation (you should add more robust checks)
        if (!email || !password) {
            setError('Username and password are required.');
            return;
        }

        // Simulate authentication (replace with your actual login logic)
        signInWithEmailAndPassword(auth, email, password).then((userCredentials)=>{
            const user = userCredentials.user
            navigate("/")
        })
            .catch(e=>console.error(e))
    };

    if (loggedIn) {
        // Redirect or display a welcome message, etc.
        return <div>Welcome, {email}! You are logged in.</div>;
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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