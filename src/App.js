import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './loginpage';
import MainApp from './MainApp';
import SignupPage from './SignupPage';

const App = () => {
    useEffect(() => {
        const user = localStorage.getItem("room_id");
        if (user === null) {
            window.location.href = '/login';
        }
    }, []);
    
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/SignupPage" element={<SignupPage />} />
                <Route path="/*" element={<MainApp />} />
            </Routes>
        </Router>
    );
};

export default App;
