import React, { useState } from 'react';
import './Additems.css';

const AddItems = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [items, setItems] = useState([]);
    const [form, setForm] = useState({
        category: 'Select a Type',
        itemType: '',
        subCategory: '',
        quantity: '',
        price: '',
        date: new Date().toISOString().split('T')[0],
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleAddItem = () => {
        setItems([...items, { ...form, id: items.length + 1 }]);
        setShowPopup(false);
        handleReset();
        
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
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {items.slice(0, 10).map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.category}</td>
                            <td>{item.subCategory}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                            <td>{item.date}</td>
                            <td>
                                <button className="edit-button" onClick={togglePopup}>✏️</button>
                            </td>
                            <td>
                                <button className="delete-button" onClick={() => handleDeleteItem(item.id)}>🗑️</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
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
                                ><option value="Select a Type">Select a Type</option>
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
                                    value={form.subCategory}
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
                                    value={form.date}
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
