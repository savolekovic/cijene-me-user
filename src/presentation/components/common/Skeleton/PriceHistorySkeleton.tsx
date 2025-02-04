import React from 'react';
import './Skeleton.css';

const PriceHistorySkeleton: React.FC = () => {
  return (
    <div className="price-history-table">
      <div className="table-header">
        <div className="skeleton skeleton-title" style={{ width: '200px' }}></div>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              {[...Array(4)].map((_, index) => (
                <th key={index}>
                  <div className="skeleton skeleton-text" style={{ width: '100px' }}></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, rowIndex) => (
              <tr key={rowIndex}>
                {[...Array(4)].map((_, colIndex) => (
                  <td key={colIndex}>
                    <div 
                      className="skeleton skeleton-text" 
                      style={{ width: colIndex === 2 ? '50px' : '120px' }}
                    ></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PriceHistorySkeleton; 