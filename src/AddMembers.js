import React, { useState, useEffect, useRef } from 'react';
import './AddMembers.css';
import ShimmerRow from './ShimmerRow';

const AddMembers = () => {
    const room_id = localStorage.getItem("room_id");
    const [showPopup, setShowPopup] = useState(false);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        _id: "",
        firstName: '',
        lastName: '',
        phoneNumber: '',
        joinDate: new Date().toISOString().split('T')[0],
    });
    const profileMenuRef = useRef(null);

    const handleClickOutside = (event) => {
        if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
            setShowPopup(showPopup);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleReset = () => {
        setForm({
            _id: "",
            firstName: '',
            lastName: '',
            phoneNumber: '',
            joinDate: new Date().toISOString().split('T')[0],
        });
    };

    const handleAddMember = async () => {
        const userData = {
            first_name: form.firstName,
            last_name: form.lastName,
            phone: form.phoneNumber,
            joinDate: form.joinDate,
            room_id: localStorage.getItem('room_id')
        };
        try {
            const response = await fetch('https://back-end-room-sharing.onrender.com/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if (response.ok) {
                handleGetmember({room_id});
                setShowPopup(false);
                handleReset();
            } else {
                console.log('Failed to add user');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    
    useEffect(() => {
        const room_id = localStorage.getItem("room_id");
        handleGetmember({ room_id });
    }, []);

    const handleGetmember = async (room_idObj) => {
        setLoading(true);
        try {
            const response = await fetch('https://back-end-room-sharing.onrender.com/api/getmemberslist', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(room_idObj),
            });

            if (response.ok) {
                const data = await response.json();
                setMembers(data.items);
                setLoading(false);
            } else {
                console.log('Failed to fetch items');
                setLoading(false);
            }
        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
        }
    };

    const togglePopup = async () => {
        handleReset();
        const newShowPopup = !showPopup;
        setShowPopup(newShowPopup);
    }

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
                }
                else {
                    console.log('Failed to fetch items');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const handleDeleteMember = async (phone) => {
        try {
            const response = await fetch('https://back-end-room-sharing.onrender.com/api/deletemember', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phone }),
            });
            if (response) {
                handleGetmember({ room_id });

            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleupdateItem = async (id) => {
        const updateData = {
            _id:form._id,
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
                handleGetmember({ room_id });

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

    return (
        <div className="add-members">
            <button className="add-member-button" onClick={togglePopup}>
                + Add Member
            </button>

            <table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Join Date</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <>
                            <ShimmerRow />
                            <ShimmerRow />
                            <ShimmerRow />
                            <ShimmerRow />
                        </>
                    ): members.length === 0 ? (
                        <tr>
                            <td colSpan="9" style={{ textAlign: 'center' }}>No data available</td>
                        </tr>
                    )  
                    : (
                        members.slice(0, 10).map((member, index) => (
                            <tr key={member.id}>
                                <td>{index + 1}</td>
                                <td>{`${member.first_name} ${member.last_name}`}</td>
                                <td>{member.phone}</td>
                                <td>{formatDate(member.joinDate)}</td>
                                <td>
                                    <button onClick={() => editPopup(member.phone)}>✏️</button>
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteMember(member.phone)} >🗑️</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <div class="input-field">
                            <span className="close-icon" onClick={togglePopup}>&times;</span>
                            <h2>Add New Member</h2>
                            <form>
                                <label>
                                    First Name:
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={form.firstName}
                                        onChange={handleInputChange}
                                        className="input-field"
                                    />
                                </label>
                                <label>
                                    Last Name:
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={form.lastName}
                                        onChange={handleInputChange}
                                        className="input-field"
                                    />
                                </label>
                                <label>
                                    Phone Number:
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        value={form.phoneNumber}
                                        onChange={handleInputChange}
                                        className="input-field"
                                    />
                                </label>
                                <label>
                                    Join Date:
                                    <input
                                        type="date"
                                        name="joinDate"
                                        value={form.joinDate}
                                        onChange={handleInputChange}
                                        className="input-field"
                                    />
                                </label>

                                <div className="popup-buttons">
                                    <button type="button" onClick={handleReset}>Reset</button>
                                    <button type="button" onClick={() => form._id ? handleupdateItem(form._id) : handleAddMember()}>{form._id ? "Update" : "Submit"}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddMembers;
