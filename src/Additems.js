import React, { useEffect, useState, useRef } from 'react';
import './Additems.css';
import ShimmerRow from './ShimmerRow1';

const AddItems = () => {
    const room_id = localStorage.getItem("room_id");
    const login_id = localStorage.getItem("login_id");
    const [showPopup, setShowPopup] = useState(false);
    const [showDownloadPopup, setShowDownloadPopup] = useState(false); // State for download popup
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        _id: '',
        category: 'Select a Type',
        sub_category: '',
        quantity: '',
        price: '',
        date_of_purchase: new Date().toISOString().split('T')[0],
    });
    const [downloadMonth, setDownloadMonth] = useState('01'); // State for download month

    const profileMenuRef = useRef(null);
    const downloadMenuRef = useRef(null); // Ref for download popup

    const handleClickOutside = (event) => {
        if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
            setShowPopup(false);
        }
        if (downloadMenuRef.current && !downloadMenuRef.current.contains(event.target)) {
            setShowDownloadPopup(false);
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
            _id: '',
            category: 'Select a Type',
            sub_category: '',
            quantity: '',
            price: '',
            date_of_purchase: new Date().toISOString().split('T')[0],
        });
    };

    const handleAddItem = async () => {
        const userData = {
            category: form.category,
            sub_category: form.sub_category,
            quantity: form.quantity,
            price: form.price,
            date_of_purchase: form.date_of_purchase,
            room_id: localStorage.getItem('room_id'),
            purchaseby: localStorage.getItem("Loginname"),
            purchaseby_id: localStorage.getItem("login_id")
        };

        try {
            const response = await fetch('https://back-end-room-sharing.onrender.com/api/additems', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                handleGetItems({ room_id });
                setShowPopup(false);
                handleReset();
            } else {
                console.log('Failed to add item');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleUpdateItem = async (id) => {
        const updateData = {
            _id: id,
            category: form.category,
            sub_category: form.sub_category,
            quantity: form.quantity,
            price: form.price,
            date_of_purchase: form.date_of_purchase,
            room_id: localStorage.getItem('room_id'),
            purchaseby: localStorage.getItem("Loginname"),
            purchaseby_id: localStorage.getItem("login_id")
        }
        try {
            const response = await fetch('https://back-end-room-sharing.onrender.com/api/updateitems', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            });

            if (response.ok) {
                handleGetItems({ room_id });
                setShowPopup(false);
                handleReset();
            } else {
                console.log('Failed to update item');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        handleGetItems({ room_id });
    }, []);

    const handleGetItems = async (room_idObj) => {
        setLoading(true);
        try {
            const response = await fetch('https://back-end-room-sharing.onrender.com/api/getitems', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(room_idObj),
            });

            if (response.ok) {
                const data = await response.json();
                setItems(data.items);
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

    const handleDeleteItem = async (id) => {
        try {
            const response = await fetch('https://back-end-room-sharing.onrender.com/api/deleteItem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ _id: id }),
            });

            if (response.ok) {
                handleGetItems({ room_id });
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    
    const editPopup = async (id) => {
        setShowPopup(true);
        if (id) {
            try {
                const response = await fetch('https://back-end-room-sharing.onrender.com/api/getitemssdetails', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ _id: id }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setForm({
                        _id: data.items._id,
                        category: data.items.category,
                        sub_category: data.items.sub_category,
                        quantity: data.items.quantity,
                        price: data.items.price,
                        date_of_purchase: data.items.date_of_purchase,
                    });
                } else {
                    console.log('Failed to fetch item details');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleDownloadItems = async (event) => {
        event.preventDefault(); // Prevent the default action
    
        const month = downloadMonth;
        const room_id = localStorage.getItem("room_id");
    
        try {
            const response = await fetch(`http://localhost:666/api/downloadtemplate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ room_id, month, name: 'downloaditems' }),
            });
    
            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `items_${month}.pdf`; // Change the extension to .pdf
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
                setShowDownloadPopup(false);
            } else {
                console.error('Failed to download items');
            }
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };
    
    
    
    const toggleDownloadPopup = () => {
        setShowDownloadPopup(!showDownloadPopup);
    };


    return (
        <div className="add-items">
            <div className="button-container">
                <button className="add-item-button" onClick={togglePopup}>
                    <span>+</span> Add Items
                </button>
                <button className="download-item-button" onClick={toggleDownloadPopup}>
                    <span>⬇</span> Download Items
                </button>
            </div>

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
                    {loading ? (
                        <>
                            <ShimmerRow />
                            <ShimmerRow />
                            <ShimmerRow />
                            <ShimmerRow />
                        </>
                    ) : items.length === 0 ? (
                        <tr>
                            <td colSpan="9" style={{ textAlign: 'center' }}>No data available</td>
                        </tr>
                    ) : (
                        items.slice(0, 10).map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.category}</td>
                                <td>{item.sub_category}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price}</td>
                                <td>{formatDate(item.date_of_purchase)}</td>
                                <td>{item.purchaseby}</td>
                                <td>
                                    <button className="edit-button" onClick={() => editPopup(item._id)}>{(item.purchaseby_id === login_id) ? "✏️" : "-"}</button>
                                </td>
                                <td>
                                    <button className="delete-button" onClick={() => handleDeleteItem(item._id)}>{(item.purchaseby_id === login_id) ? "🗑️" : "-"}</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {showPopup && (
                <div className="popup">
                    <div className="popup-content" ref={profileMenuRef}>
                        <span className="close-icon" onClick={togglePopup}>&times;</span>
                        <h2>{form._id ? 'Edit Item' : 'Add New Item'}</h2>
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
                                    name="sub_category"
                                    value={form.sub_category}
                                    onChange={handleInputChange}
                                    className="input-field sub_category"
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
                                    name="date_of_purchase"
                                    value={form.date_of_purchase}
                                    onChange={handleInputChange}
                                    className="input-field date"
                                />
                            </label>
                            <div className="popup-buttons">
                                <button type="button" onClick={() => form._id ? togglePopup() : handleReset()}>{form._id ? "Close" : "Reset"}</button>
                                <button type="button" onClick={() => form._id ? handleUpdateItem(form._id) : handleAddItem()}>
                                    {form._id ? 'Update' : 'Submit'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showDownloadPopup && (
                <div className="popup">
                    <div className="popup-content" ref={downloadMenuRef}>
                        <span className="close-icon" onClick={toggleDownloadPopup}>&times;</span>
                        <h2>Download the Items</h2>
                        <form>
                            <label>
                                Select Month:
                                <select
                                    name="month"
                                    value={downloadMonth}
                                    onChange={(e) => setDownloadMonth(e.target.value)}
                                    className="input-field"
                                >
                                    <option value="01">January</option>
                                    <option value="02">February</option>
                                    <option value="03">March</option>
                                    <option value="04">April</option>
                                    <option value="05">May</option>
                                    <option value="06">June</option>
                                    <option value="07">July</option>
                                    <option value="08">August</option>
                                    <option value="09">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                                </select>
                            </label>
                            <div className="popup-buttons">
                                <button type="button" onClick={toggleDownloadPopup}>Close</button>
                                <button onClick={handleDownloadItems}  >Download PDF
                    </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddItems;
