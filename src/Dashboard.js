import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './Dashboard.css';
import ShimmerCard from './ShimmerCard';

ChartJS.register(Tooltip, Legend, ArcElement);

const getCurrentMonth = () => {
    const monthNames = [
        '01', '02', '03', '04', '05', '06',
        '07', '08', '09', '10', '11', '12'
    ];
    const currentMonthIndex = new Date().getMonth();
    return monthNames[currentMonthIndex];
};

const monthNamesMap = {
    '01': 'January', '02': 'February', '03': 'March', '04': 'April',
    '05': 'May', '06': 'June', '07': 'July', '08': 'August',
    '09': 'September', '10': 'October', '11': 'November', '12': 'December'
};

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
    const [totalMonthsExpansion, setTotalMonthsExpansion] = useState(0);
    const [yourExpansions, setYourExpansions] = useState(0);
    const [yourShare, setYourShare] = useState(0);
    const [pieData, setPieData] = useState([]);
    const [labels, setLabels] = useState([]);
    const loginid = localStorage.getItem('login_id');
    const roomid = localStorage.getItem('room_id');
    const [monthLabel, setMonthLabel] = useState(monthNamesMap[selectedMonth]);
    const Loginname = localStorage.getItem('Loginname');
    const [showPopup, setShowPopup] = useState(!roomid);

    useEffect(() => {debugger
        setMonthLabel(monthNamesMap[selectedMonth]);
    }, [selectedMonth]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const room_id = roomid;
                const response1 = await fetch('https://back-end-room-sharing.onrender.com/api/Roomexpansions', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ room_id, month: selectedMonth })
                });
                const data1 = await response1.json();
                setTotalMonthsExpansion(data1.totalSum);

                const purchaseby_id = loginid;
                const response2 = await fetch('https://back-end-room-sharing.onrender.com/api/yourexpansions', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ purchaseby_id, month: selectedMonth })
                });
                const data2 = await response2.json();
                setYourExpansions(data2.totalSumByPurchaseId);

                const response3 = await fetch('https://back-end-room-sharing.onrender.com/api/getRoomMatesExpansions', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ room_id, month: selectedMonth })
                });
                const data3 = await response3.json();
                setPieData(data3.expansions.map(exp => exp.totalExpansion));
                setLabels(data3.expansions.map(exp => exp.membername));
                setYourShare(data1.totalSum / data3.memberCount);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        if (roomid) {
            fetchData();
        }
    }, [selectedMonth, roomid, loginid]);

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    const noDataChart = {
        datasets: [{
            data: [1],
            backgroundColor: ['#D3D3D3'],
            borderWidth: 1,
            borderColor: '#FFFFFF',
        }],
        labels: ['No data available'],
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className="dashboard">
            <h1>Welcome {Loginname}</h1>

            <select value={selectedMonth} onChange={handleMonthChange}>
                {Object.entries(monthNamesMap).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                ))}
            </select>

            <div className="card-container">
                {loading ? (
                    <>
                        <ShimmerCard />
                        <ShimmerCard />
                        <ShimmerCard />
                    </>
                ) : (
                    <>
                        <div className="card-container">
                            <div className="card card-1">
                                <h2>Total <span className="bold-text">{monthLabel}</span> Room Expansion</h2>
                                <p>₹{totalMonthsExpansion}</p>
                            </div>
                            <div className="card card-2">
                                <h2><span className="bold-text">{monthLabel}</span> Your spend Amount</h2>
                                <p>₹{yourExpansions}</p>
                            </div>
                            <div className="card card-3">
                                <h2>Your Room Share on This <span className="bold-text">{monthLabel}</span></h2>
                                <p>₹{yourShare}</p>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <div className="pie-chart-container">
                <h2 className="pie-chart-title">Member Spend Money</h2>
                {loading ? (
                    <ShimmerCard />
                ) : (
                    <Pie data={totalMonthsExpansion === 0 ? noDataChart : {
                        datasets: [{
                            data: pieData,
                            backgroundColor: [
                                '#FF6384',
                                '#36A2EB',
                                '#FFCE56',
                                '#4BC0C0',
                                '#9966FF',
                                '#FF9F40'
                            ],
                            hoverBackgroundColor: [
                                '#FF6384',
                                '#36A2EB',
                                '#FFCE56',
                                '#4BC0C0',
                                '#9966FF',
                                '#FF9F40'
                            ],
                            borderWidth: 1,
                            borderColor: '#FFFFFF'
                        }],
                        labels: labels
                    }} />
                )}
                {(pieData.length === 0 && !loading) && (
                    <div className="no-data-message">No data available</div>
                )}
            </div>

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Welcome to Room App</h2>
                        <p>Login into your room</p>
                        <button onClick={() => window.location.href = '/login'}>Login</button>
                        <p>New user or create a room</p>
                        <button className="signup-button" onClick={() => window.location.href = '/SignupPage'}>Sign Up / Register</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
