import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './loginpage';
import MainApp from './MainApp';
import SignupPage from './SignupPage';

const App = () => {
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
