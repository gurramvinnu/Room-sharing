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

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
    const [totalMonthsExpansion, setTotalMonthsExpansion] = useState(0);
    const [yourExpansions, setYourExpansions] = useState(0);
    const [yourShare, setYourShare] = useState(0);
    const [pieData, setPieData] = useState([]);
    const [labels, setLabels] = useState([]);
    const login_id = localStorage.getItem('login_id');
    const room_id = localStorage.getItem('room_id')


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const room_id = room_id;
                const response1 = await fetch('https://back-end-room-sharing.onrender.com/api/Roomexpansions', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ room_id, month: selectedMonth })
                });
                const data1 = await response1.json();
                setTotalMonthsExpansion(data1.totalSum);


                const purchaseby_id = login_id
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

        fetchData();
    }, [selectedMonth]);

    // Handle change in dropdown selection
    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    return (
        <div className="dashboard">
            <h1>Welcome room</h1>

            {/* Month-wise dropdown */}
            <select value={selectedMonth} onChange={handleMonthChange}>
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

            <div className="card-container">
                {loading ? (
                    <>
                        <ShimmerCard />
                        <ShimmerCard />
                        <ShimmerCard />
                        <ShimmerCard />
                    </>
                ) : (
                    <>
                        <div className="card card-1">
                            <h2>Total Months Expansion</h2>
                            <p>{totalMonthsExpansion}</p>
                        </div>
                        <div className="card card-2">
                            <h2>Months Your Expansions</h2>
                            <p>{yourExpansions}</p>
                        </div>
                        <div className="card card-3">
                            <h2>Your Share This Month</h2>
                            <p>{yourShare}</p>
                        </div>
                    </>
                )}
            </div>

            <div className="pie-chart-container">
                {loading ? (
                    <ShimmerCard />
                ) : (
                    <Pie data={{
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
                            ]
                        }],
                        labels: labels
                    }} />
                )}
            </div>
        </div>
    );
};

export default Dashboard;
