import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Header1.css';

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [editProfileOpen, setEditProfileOpen] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const profileMenuRef = useRef(null);

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

    return (
        <div className="header">
            <div className="menu-icon" onClick={toggleMenu}>&#9776;</div>
            <h1>Room Sharing</h1>
            <div className="profile-icon" onClick={toggleProfileMenu}>
                {profileImage ? (
                    <img src={profileImage} alt="Profile" className="profile-image" />
                ) : (
                    <span>&#128100;</span>
                )}
            </div>
            {showMenu && (
                <div className="context-menu">
                    <ul>
                        <li><Link to="/" onClick={() => setShowMenu(false)}>📊 Dashboard</Link></li>
                        <li><Link to="/add-items" onClick={() => setShowMenu(false)}>🛒 Add Items</Link></li>
                        <li><Link to="/add-members" onClick={() => setShowMenu(false)}>🙋‍♂️ Add Members</Link></li>
                        <li><Link to="/settings" onClick={() => setShowMenu(false)}>⚙️ Settings</Link></li>
                    </ul>
                </div>
            )}
            {profileMenuOpen && (
                <div className="profile-menu" ref={profileMenuRef}>
                    <div className="profile-upload">
                        <label htmlFor="profile-upload-input" className="upload-label">
                            {profileImage ? (
                                <img src={profileImage} alt="Profile" className="profile-image" />
                            ) : (
                                <div >
                                <img
                                  
                                  alt="📤 Upload Image"
                                />
                              </div>
                            )}
                        </label>
                        <input
                            id="profile-upload-input"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={{ display: 'none' }}
                        />
                    </div>
                    <button className="edit-profile" onClick={openEditProfile}>🙎🏻‍♂️ Edit Profile</button>
                    <button className="logout">Log Out</button>
                </div>
            )}
            {editProfileOpen && (
                <div className="edit-profile-popup">
                    <div className="edit-profile-content">
                        <button className="close-btn" onClick={closeEditProfile}>&times;</button>
                        <h2>Edit Profile</h2>
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
