import React from 'react';
import './ShimmerRow.css';

const ShimmerRow = () => {
    return (
        <tr className="shimmer-row">
            <td><div className="shimmer-cell"></div></td>
            <td><div className="shimmer-cell"></div></td>
            <td><div className="shimmer-cell"></div></td>
            <td><div className="shimmer-cell"></div></td>
            <td><div className="shimmer-cell"></div></td>
            <td><div className="shimmer-cell"></div></td>
        </tr>
    );
};

export default ShimmerRow;
