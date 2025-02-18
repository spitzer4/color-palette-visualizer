import React, { useState } from 'react';
import ArtworkUpload from './components/ArtworkUpload';
import './App.css';

const App = () => {
  const [palette, setPalette] = useState([]);

  const handlePaletteChange = (newPalette) => {
    setPalette(newPalette); // Update the palette state with the new colors
  };

  return (
    <div className="App">
      <h1>Artwork Color Palette Extractor 🎨</h1>
      <ArtworkUpload onPaletteChange={handlePaletteChange} />

      <div className="palette-display">
        {palette.map((color, index) => (
          <div key={index} className="color-card" style={{ backgroundColor: color }}>
            {color}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
