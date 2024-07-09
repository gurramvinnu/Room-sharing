import React from 'react';
import './Card.css';

const Card = ({ title }) => {
    return (
        <div className="card">
            <h2>{title}</h2>
        </div>
    );
}

export default Card;
