import React, { useEffect, useState,useRef } from 'react';
import './Additems.css';

const AddItems = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [items, setItems] = useState([]);
    const [form, setForm] = useState({
        category: 'Select a Type',
        sub_category: '',
        quantity: '',
        price: '',
        date_of_purchase: new Date().toISOString().split('T')[0],
    });
localStorage.setItem("purchaseby","sai")
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };
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
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleAddItem = async () => {
        const userData = {
            category: form.category,
            sub_category: form.sub_category,
            quantity: form.quantity,
            price: form.price,
            date_of_purchase: form.date_of_purchase,
            room_id:localStorage.getItem('room_id'),
            purchaseby:localStorage.getItem("purchaseby")
        };
        try {
            const response = await fetch('http://localhost:666/api/additems', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if (response.ok) {
                console.log('User added successfully');
                setItems([...items, { ...form, id: items.length + 1 }]);
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
        const room_id=localStorage.getItem('room_id')
        handleGetItems(room_id);
    }, []);

    const handleGetItems = async (room_idObj) => {
        try {
            const response = await fetch('http://localhost:666/api/getitems', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(room_idObj),
                
            });

            if (response.ok) {
                const data = await response.json();
                setItems(data.items);
            } else {
                console.log('Failed to fetch items');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDeleteItem = (id) => {
        setItems(items.filter(item => item.id !== id));
    };

    const handleReset = () => {
        setForm({
            category: 'Select a Type',
            itemType: '',
            subCategory: '',
            quantity: '',
            price: '',
            date: new Date().toISOString().split('T')[0],
        });
    };

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };
    const editPopup = async (_id) => {
        const newShowPopup = !showPopup;
        setShowPopup(newShowPopup);
        if (_id) { 
            try {
                const response = await fetch('http://localhost:666/api/getitemssdetails', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ _id: _id }) 
                });
    
                if (response.ok) {
                    const data = await response.json();
                    setForm({

                        category: data.items.category,
                        sub_category: data.items.sub_category,
                        quantity: data.items.quantity,
                        price: data.items.price,
                        date_of_purchase: data.items.date_of_purchase,
                       
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
    return (
        <div className="add-items">
            <button className="add-item-button" onClick={togglePopup}>
                <span>+</span> Add Items
            </button>

            <table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Item Type</th>
                        <th>Item Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Date of Purchase</th>
                        <th>Purchase by</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {items.slice(0, 10).map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.category}</td>
                            <td>{item.sub_category}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                            <td>{formatDate(item.date_of_purchase)}</td>
                            <td>{localStorage.getItem("purchaseby")}</td>
                            <td>
                                <button className="edit-button" onClick={() => editPopup(item._id)}>✏️</button>
                            </td>
                            <td>
                                <button className="delete-button" onClick={() => handleDeleteItem(item.id)}>🗑️</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showPopup && (
                <div className="popup" >
                    <div className="popup-content" ref={profileMenuRef}>
                        <span className="close-icon" onClick={togglePopup}>&times;</span>
                        <h2>Add New Item</h2>
                        <form>
                            <label>
                                Category:
                                <select
                                    name="category"
                                    value={form.category}
                                    onChange={handleInputChange}
                                    className="input-field category"
                                >
                                    <option value="Select a Type">Select a Type</option>
                                    <option value="kirana">Kirana</option>
                                    <option value="vegetable">Vegetable</option>
                                    <option value="milk">Milk</option>
                                    <option value="water">Water</option>
                                </select>
                            </label>

                            <label>
                                Sub Category:
                                <input
                                    type="text"
                                    name="subCategory"
                                    value={form.sub_category}
                                    onChange={handleInputChange}
                                    className="input-field subCategory"
                                />
                            </label>
                            <label>
                                Quantity:
                                <input
                                    type="number"
                                    name="quantity"
                                    value={form.quantity}
                                    onChange={handleInputChange}
                                    className="input-field quantity"
                                />
                            </label>
                            <label>
                                Price:
                                <input
                                    type="number"
                                    name="price"
                                    value={form.price}
                                    onChange={handleInputChange}
                                    className="input-field price"
                                />
                            </label>
                            <label>
                                Date of Purchase:
                                <input
                                    type="date"
                                    name="date"
                                    value={form.date_of_purchase}
                                    onChange={handleInputChange}
                                    className="input-field date"
                                />
                            </label>
                            <div className="popup-buttons">
                                <button type="button" onClick={handleReset}>Reset</button>
                                <button type="button" onClick={handleAddItem}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddItems;
