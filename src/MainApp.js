import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import AddItems from './Additems';
import AddMembers from './AddMembers';
import Settings from './Settings';
import Header from './Header1';

const MainApp = () => {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/add-items" element={<AddItems />} />
                <Route path="/add-members" element={<AddMembers />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
        </div>
    );
};

export default MainApp;
