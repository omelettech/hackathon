import React, { useState } from 'react';
import {  createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import {auth} from "../firebase/firebaseInit.tsx";
/*import './Register.css';*/ // Import your CSS file

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');


    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
        } catch (error) {
            setError(error.message);
        }
    };


    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            setSuccess('User registered successfully!');
            setError('');
        } catch (error) {
            setError(error.message);
            setSuccess('');
        }
    };

    return (
        <div className="register-container">
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>

            <button onClick={handleGoogleSignIn}>Sign in with Google</button>

            {/*{error && <p className="error">{error}</p>}*/}
            {error && <p style={{ color: 'red' }}>{error}</p>} {/*this one is red so it better*/}
            {success && <p className="success">{success}</p>}
        </div>

    );
};

export default Register;