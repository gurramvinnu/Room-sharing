import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Shimmer from './Shimmer'; // Import the Shimmer component
import './Header1.css';

const Header = () => {
    const phone=localStorage.getItem("phone");
    const [showMenu, setShowMenu] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [editProfileOpen, setEditProfileOpen] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const profileMenuRef = useRef(null);
    const menuRef = useRef(null);
    const [roomId, setRoomId] = useState('');
    const [loading, setLoading] = useState(true); // State to track loading
    const [form, setForm] = useState({
        _id: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        joinDate: '',
        room_id: ''
    });
    const [showPopup, setShowPopup] = useState(false);

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

    const editProfileRef = useRef(null);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setShowMenu(false);
        }
        if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
            setProfileMenuOpen(false);
        }
        if (editProfileRef.current && !editProfileRef.current.contains(event.target)) {
            setEditProfileOpen(false);
        }
    };
    

    

    const openEditProfile = () => {
        editPopup(phone)
        setEditProfileOpen(true);
    };

    const closeEditProfile = () => {
        setEditProfileOpen(false);
    };

    const offProfile = () => {
        localStorage.clear();
        window.location.href = '/login';
    };

    const editPopup = async (phone) => {
        const newShowPopup = !showPopup;
        setShowPopup(newShowPopup);
        if (phone) {
            try {
                const response = await fetch('https://back-end-room-sharing.onrender.com/api/getmembersdetails', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ phone: phone })
                });
                if (response.ok) {
                    const data = await response.json();
                    setForm({
                        _id: data.items._id,
                        firstName: data.items.first_name,
                        lastName: data.items.last_name,
                        phoneNumber: data.items.phone,
                        joinDate: data.items.joinDate,
                        room_id: data.items.room_id
                    });
                } else {
                    console.log('Failed to fetch items');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const handleUpdateItem = async () => {
        const updateData = {
            _id: form._id,
            first_name: form.firstName,
            last_name: form.lastName,
            phone: form.phoneNumber,
            joinDate: form.joinDate,
            room_id: localStorage.getItem('room_id')
        };

        try {
            const response = await fetch('https://back-end-room-sharing.onrender.com/api/updatemember', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            });

            if (response.ok) {
                
                setShowPopup(!showPopup);
                handleReset();
                const data = await response.json();
                setForm({
                    _id: data.items._id,
                    firstName: data.items.first_name,
                    lastName: data.items.last_name,
                    phoneNumber: data.items.phone,
                    joinDate: data.items.joinDate,
                    room_id: data.items.room_id
                });
            } else {
                console.log('Failed to update item');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleReset = () => {
        setForm({
            _id: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            joinDate: '',
            room_id: ''
        });
    };

    if (loading) {
        return <Shimmer />;
    }

    return (
        <div className="header">
            <div className="menu-icon" onClick={toggleMenu}>&#9776;</div>
            <div className="title-container">
        <h1>Room Sharing</h1>
        <div className="headerroom">
            <h3>Room_id: {roomId}</h3>
        </div>
    </div>
            <div className="profile-icon" onClick={toggleProfileMenu}>
                {profileImage ? (
                    <img src={profileImage} alt="Profile" className="profile-image" />
                ) : (
                    <span>🤵</span>
                )}
            </div>
            {showMenu && (
                <div className="context-menu" ref={menuRef}>
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
                <div className="edit-profile-popup" ref={editProfileRef}>
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
                        <form onSubmit={(e) => { e.preventDefault(); handleUpdateItem(); }}>
                            <div className="form-group">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={form.firstName}
                                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={form.lastName}
                                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    value={form.phoneNumber}
                                    onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Room ID</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={form.room_id}
                                    onChange={(e) => setForm({ ...form, room_id: e.target.value })}
                                    disabled
                                />
                            </div>
                            <div className="form-buttons">
                                <button type="button" className="reset-btn" onClick={closeEditProfile}>close</button>
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
