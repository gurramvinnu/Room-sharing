import React, { useState,useEffect } from 'react';
import './AddMembers.css';

const AddMembers = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [members, setMembers] = useState([]);
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        joinDate: new Date().toISOString().split('T')[0],
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleDeleteMember = (id) => {
        setMembers(members.filter(member => member.id !== id));
    };

    const handleReset = () => {
        setForm({
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
            joinDate: form.joinDate
        };
        try {
            const response = await fetch('http://localhost:666/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if (response.ok) {
                console.log('User added successfully');
                setMembers([...members, { ...form, id: members.length + 1 }]);
                setShowPopup(false);
                handleReset();
            } else {
                console.log('Failed to add user');
            }         
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        handleGetItems();
    }, []);

    const handleGetItems = async () => {
        try {
            const response = await fetch('http://localhost:666/api/getmemberslist', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setMembers(data.items);
                console.log(data.items)
            } else {
                console.log('Failed to fetch items');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const togglePopup = () => {
        setShowPopup(!showPopup);
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
                    {members.slice(0, 10).map((member, index) => (
                        <tr key={member.id}>
                            <td>{index + 1}</td>
                            <td>{`${member.first_name} ${member.last_name}`}</td>
                            <td>{member.phone}</td>
                            <td>{member.joinDate}</td>
                            <td>
                                <button onClick={togglePopup}>✏️</button>
                            </td>
                            <td>
                                <button onClick={() => handleDeleteMember(member.id)}>🗑️</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
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
                                <button type="button" onClick={handleAddMember}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddMembers;
