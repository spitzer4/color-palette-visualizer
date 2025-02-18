import React from 'react';
import ColorCard from './ColorCard';

const PaletteDisplay = ({ palette }) => {
  return (
    <div className="palette-display">
      {palette.map((color, index) => (
        <ColorCard key={index} color={color} />
      ))}
    </div>
  );
};

export default PaletteDisplay;
