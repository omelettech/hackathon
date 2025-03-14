import React from 'react'
import './App.css'
import Login from "./pages/Login.tsx";
import {BrowserRouter, Link, Navigate, Route, Routes} from 'react-router-dom';
import Feed from "./pages/Feed.tsx";
import Register from "./pages/Register.tsx";
import {auth} from "./firebase/firebaseInit.tsx";
import {signOut} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import LandingPage from './pages/LandingPage.tsx';
import Upload from "./pages/Upload.tsx";
import Checkout from "./pages/Checkout.tsx";

// Example HomePage component
const HomePage = () => {
    return <h1>See fruit</h1>;
};

// Example Dashboard component


// Protected Route Component (Important!)
function ProtectedRoute({children}) {
    // a custom hook to keep track of user's auth status
    const [user, loading] = useAuthState(auth);

    if (loading) return <p>Loading...</p>; // Show a loading state

    return user ? children : <Navigate to="/login"/>;
};


function App() {

    const [user] = useAuthState(auth)
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

            <BrowserRouter>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/feed">Feed</Link>
                            </li>
                            <li>
                                <Link to="/upload">Upload</Link>
                            </li>
                            <li>
                                <Link to={'/'} onClick={handleLogout}>Logout</Link>
                            </li>


                        </ul>
                    </nav>

                    <Routes>
                        <Route path="/" element={<LandingPage/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path={"/register"} element={<Register/>}/>
                        <Route path={"/upload"} element={<Upload/>}/>
                        <Route path={"/checkout"} element={<Checkout/>}/>
                        <Route path={'/feed'} element={<Feed/>}
                        />
                        {/* Handle invalid routes (404) */}
                        <Route path="*" element={<Navigate to="/" replace/>}/> {/* Redirect to home */}
                    </Routes>
                </div>
            </BrowserRouter>
        </>

    )
}

export default App
