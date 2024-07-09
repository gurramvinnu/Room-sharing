import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Header1';

import Dashboard from './Dashboard';
import AddItems from './Additems';
import AddMembers from './AddMembers';
import Settings from './Settings';

const App = () => {
    return (
        <Router>
            <div className="app">
                <Header />
                <div className="card-container">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/add-items" element={<AddItems />} />
                        <Route path="/add-members" element={<AddMembers />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
