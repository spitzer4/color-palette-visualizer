import React from 'react';

const ColorCard = ({ color }) => {
  return (
    <div className="color-card" style={{ backgroundColor: color }}>
      <span>{color}</span>
    </div>
  );
};

export default ColorCard;
