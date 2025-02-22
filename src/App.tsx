import React, {useState} from 'react'
import './App.css'
import Login from "./pages/Login.tsx";
import {BrowserRouter, Link, Navigate, Route, Routes} from 'react-router-dom';
import Feed from "./pages/Feed.tsx";
import FloatingButton from "./components/FloatingButton.tsx";
import Register from "./pages/Register.tsx";
import {auth} from "./firebase/firebaseInit.tsx";
import {signOut} from "firebase/auth";
import {useAuthListener} from "./firebase/FIrebaseAuthStatus.tsx";
import {useAuthState} from "react-firebase-hooks/auth";
import LandingPage from './pages/LandingPage.tsx';
import Upload from "./pages/Upload.tsx";

// Example HomePage component
const HomePage = () => {
    return <h1>See fruit</h1>;
};

// Example Dashboard component


// Protected Route Component (Important!)
function ProtectedRoute({children}) {
    // a custom hook to keep track of user's auth status
    const {loggedIn, checkingStatus} = useAuthListener();
    const [user, loading] = useAuthState(auth);

    if (loading) return <p>Loading...</p>; // Show a loading state

    return user ? children : <Navigate to="/login"/>;
};


function App() {


    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("Signed out successfully")
        }).catch((error) => {
            // An error happened.
        });
    }


    return (

        <>
            <FloatingButton text={"H"} onPress={() => console.log("it works")}/>

            <BrowserRouter>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/register">Register</Link>
                            </li>
                            <li>
                                <Link to="/feed">Feed</Link>
                            </li>
                            <li>
                                <Link to={'/'} onClick={handleLogout}>Logout</Link>
                            </li>
                            <li>
                                <Link to={'/upload'}>Upload</Link>
                            </li>
                        </ul>
                    </nav>

                    <Routes>
                        <Route path="/" element={<LandingPage/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path={"/register"} element={<Register/>}/>
                        <Route path={'/feed'} element={
                            <ProtectedRoute>
                                <Feed/>
                            </ProtectedRoute>
                        }
                        />
                        {/* Handle invalid routes (404) */}
                        <Route path="*" element={<Navigate to="/" replace/>}/> {/* Redirect to home */}
                        <Route path="/upload" element={<Upload/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </>

    )
}

export default App
