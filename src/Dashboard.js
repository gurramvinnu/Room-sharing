import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './Dashboard.css';

ChartJS.register( Tooltip, Legend,ArcElement);

const data = {
    
    datasets: [
        {
            data: [50, 15, 12, 15, 13, 5],
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
        }
    ],
    labels: ['Prudhvi', 'Verra Reddy', 'Ramesh', 'Saikrishna', 'Dayan', 'Vinnu']
};

const Dashboard = () => {
    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            
            <div className="card-container">
                <div className="card card-1">
                    <h2>Total Months Expansion</h2>
                    <p>10000</p>
                </div>
                <div className="card card-2">
                    <h2>Your Expansions</h2>
                    <p>1111</p>
                </div>
                <div className="card card-3">
                    <h2>Yearly Expansions</h2>
                    <p>12121</p>
                </div>
                <div className="card card-4">
                    <h2>Started date expnasions</h2>
                    <p>454545</p>
                </div>
            </div>
            <div className="pie-chart-container">
                <Pie data={data} />
            </div>
        </div>
    );
}

export default Dashboard;
