import React, { useState, useRef } from "react";
import "./App.css";

function App() {
  const [image, setImage] = useState(null);
  const [eyeLineY, setEyeLineY] = useState(150);
  const [headTopLineY, setHeadTopLineY] = useState(50);
  const imgRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMoveEyeLine = (e) => {
    const rect = e.target.getBoundingClientRect();
    const y = e.clientY - rect.top;
    setEyeLineY(y);
  };

  const handleMoveHeadTopLine = (e) => {
    const rect = e.target.getBoundingClientRect();
    const y = e.clientY - rect.top;
    setHeadTopLineY(y);
  };

  return (
    <div className="app">
      <h2>Проверка фото DV Lottery</h2>

      <input type="file" accept="image/*" onChange={handleFileChange} />

      {image && (
        <div className="photo-area">
          <img ref={imgRef} src={image} alt="uploaded" />
          <div 
            className="eye-line" 
            style={{ top: eyeLineY }}
            onMouseMove={handleMoveEyeLine}
          ></div>
          <div 
            className="head-top-line" 
            style={{ top: headTopLineY }}
            onMouseMove={handleMoveHeadTopLine}
          ></div>
        </div>
      )}

      <p>Зелёная пунктирная линия должна проходить горизонтально через глаза.</p>
      <p>Синяя пунктирная линия должна проходить по верхушке головы.</p>
    </div>
  );
}

export default App;
