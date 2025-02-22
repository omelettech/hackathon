import React, {useState} from 'react'
import './App.css'
import Login from "./pages/Login.tsx";
import {BrowserRouter, Link, Navigate, Route, Routes} from 'react-router-dom';
import Feed from "./pages/Feed.tsx";

// Example HomePage component
const HomePage = () => {
    return <h1>See fruit</h1>;
};

// Example Dashboard component


// Protected Route Component (Important!)
const ProtectedRoute = ({children}) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated'); // Check authentication status

    if (isAuthenticated) {
        return children; // User is logged in, allow access
    } else {
        return <Navigate to="/login" replace/>; // Redirect to login if not authenticated
    }
};

function App() {
    const [count, setCount] = useState(0)

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
                                <Link to="/login">Login</Link>
                            </li>

                        </ul>
                    </nav>

                    <Routes>
                        <Route path="/" element={<Feed/>}/>
                        <Route path="/login" element={<Login/>}/>
                        {/*<Route path="/dashboard" element={*/}
                        {/*    <ProtectedRoute> /!* Protect this route *!/*/}
                        {/*        <Dashboard />*/}
                        {/*    </ProtectedRoute>*/}
                        {/*} />*/}
                        {/* Handle invalid routes (404) */}
                        <Route path="*" element={<Navigate to="/" replace/>}/> {/* Redirect to home */}
                    </Routes>
                </div>
            </BrowserRouter>
        </>

    )
}

export default App
