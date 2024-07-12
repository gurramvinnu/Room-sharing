import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Shimmer from './Shimmer'; // Import the Shimmer component
import './Header1.css';

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [editProfileOpen, setEditProfileOpen] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const profileMenuRef = useRef(null);
    const [roomId, setRoomId] = useState('');
    const [loading, setLoading] = useState(true); // State to track loading

    useEffect(() => {
        const id = localStorage.getItem('room_id');
        setRoomId(id);
        setLoading(false); // Set loading to false after data is fetched
    }, []);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const toggleProfileMenu = () => {
        setProfileMenuOpen(!profileMenuOpen);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClickOutside = (event) => {
        if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
            setProfileMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const openEditProfile = () => {
        setEditProfileOpen(true);
    };

    const closeEditProfile = () => {
        setEditProfileOpen(false);
    };

    const offProfile = () => {
        window.location.href = '/login';
    };

    if (loading) {
        return <Shimmer />; // Show shimmer effect while loading
    }

    return (
        <div className="header">
            <div className="menu-icon" onClick={toggleMenu}>&#9776;</div>
            <h1>Room Sharing</h1>
            <div className="headerroom">
                <h3>Room_id :: {roomId}</h3>
            </div>
            <div className="profile-icon" onClick={toggleProfileMenu}>
                {profileImage ? (
                    <img src={profileImage} alt="Profile" className="profile-image" />
                ) : (
                    <span>🤵</span>
                )}
            </div>
            {showMenu && (
                <div className="context-menu">
                    <ul>
                        <li onClick={() => setShowMenu(false)}><Link to="/">📊 Dashboard</Link></li>
                        <li onClick={() => setShowMenu(false)}><Link to="/add-items">🛒 Add Items</Link></li>
                        <li onClick={() => setShowMenu(false)}><Link to="/add-members">🙋‍♂️ Add Members</Link></li>
                        <li onClick={() => setShowMenu(false)}><Link to="/settings">⚙️ Settings</Link></li>
                    </ul>
                </div>
            )}
            {profileMenuOpen && (
                <div className="profile-menu" ref={profileMenuRef}>
                    <button className="edit-profile" onClick={openEditProfile}>🙎🏻‍♂️ Edit Profile</button>
                    <button className="logout" onClick={offProfile}>Log Out</button>
                </div>
            )}
            {editProfileOpen && (
                <div className="edit-profile-popup">
                    <div className="edit-profile-content">
                        <button className="close-btn" onClick={closeEditProfile}>&times;</button>
                        <h2>Edit Profile</h2>
                        <div className="profile-upload">
                            <label htmlFor="profile-upload-input" className="upload-label">
                                {profileImage ? (
                                    <img src={profileImage} alt="Profile" className="profile-image" />
                                ) : (
                                    <div className="upload-placeholder">
                                        <span role="img" aria-label="Upload Icon">Upload Image</span>
                                    </div>
                                )}
                                <div className="upload-icon">
                                    <span role="img" aria-label="Upload Icon">📤</span>
                                </div>
                            </label>
                            <input
                                id="profile-upload-input"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                style={{ display: 'none' }}
                            />
                        </div>
                        <form>
                            <div className="form-group">
                                <label>First Name</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input type="tel" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Room ID</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="form-buttons">
                                <button type="button" className="reset-btn">Reset</button>
                                <button type="submit" className="update-btn">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
