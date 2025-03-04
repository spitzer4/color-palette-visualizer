import React, { useState } from 'react';
import chroma from 'chroma-js'; // Import Chroma.js
// import './ArtworkUpload.css';

const ArtworkUpload = ({ onPaletteChange }) => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      extractColors(file);
    }
  };

  const extractColors = (imageFile) => {
    // Create an image element to use it for color extraction
	console.log('Image file:', imageFile);  // Check the uploaded file
    const img = new Image();
    img.src = URL.createObjectURL(imageFile);
    img.onload = () => {
	  console.log('Image loaded');
      // Once the image is loaded, extract the colors using Chroma.js

      // Create a canvas element to extract pixel data
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
	  // Resize the image to a smaller size for performance
	  const maxDimension = 500; // Set the maximum dimension for resizing
	  const scale = Math.min(maxDimension / img.width, maxDimension / img.height);
	  canvas.width = img.width * scale;
	  canvas.height = img.height * scale;
	  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
	  
	  // Get pixel data from the canvas
      const pixelData = ctx.getImageData(0, 0, img.width, img.height).data;

      // Convert the pixel data into a color palette
      const colors = [];
      for (let i = 0; i < pixelData.length; i += 4) {
        const r = pixelData[i];
        const g = pixelData[i + 1];
        const b = pixelData[i + 2];
        const a = pixelData[i + 3];

        if (a > 128) { // Only consider colors that are not transparent
          const hexColor = chroma.rgb(r, g, b).hex(); // Convert to hex using Chroma.js
          if (!colors.includes(hexColor)) {
            colors.push(hexColor);
          }
        }
      }

      // Use Chroma.js to generate a color palette
      const palette = chroma.scale(colors).mode('lab').colors(5); // Example: Get 5 main colors

      // Pass the extracted color palette to the parent component
      onPaletteChange(palette);
    };

	img.onerror = (error) => {
		console.log('Image failed to load:', error);
	};
  };

  return (
    <div className="artwork-upload-container">
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && <img src={image} alt="Artwork" className="artwork-preview" />}
    </div>
  );
};

export default ArtworkUpload;
