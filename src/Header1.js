import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header1.css';

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    const toggleProfileMenu = () => {
        setShowProfileMenu(!showProfileMenu);
    }

    return (
        <div className="header">
            <div className="menu-icon" onClick={toggleMenu}>&#9776;</div>
            <h1>Room Sharing</h1>
            <div className="profile-icon" onClick={toggleProfileMenu}>&#128100;</div>
            {showMenu && (
                <div className="context-menu">
                    <ul>
                        <li><Link to="/" onClick={() => setShowMenu(false)}>Dashboard</Link></li>
                        <li><Link to="/add-items" onClick={() => setShowMenu(false)}>Add Items</Link></li>
                        <li><Link to="/add-members" onClick={() => setShowMenu(false)}>Add Members</Link></li>
                        <li><Link to="/settings" onClick={() => setShowMenu(false)}>Settings</Link></li>
                    </ul>
                </div>
            )}
            {showProfileMenu && (
                <div className="profile-menu">
                    <div className="profile-image">
                        <img src="https://via.placeholder.com/150" alt="Profile" />
                    </div>
                    <button className="edit-profile">Edit Profile</button>
                    <button className="logout">Log Out</button>
                </div>
            )}
        </div>
    );
}

export default Header;
