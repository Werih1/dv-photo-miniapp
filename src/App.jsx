import React, { useState, useRef, useEffect } from "react";
import * as faceapi from "@vladmandic/face-api";
import "./App.css";

function App() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [lines, setLines] = useState({
    top: null,      // Желтая - верхняя точка головы
    middle: null,   // Зеленая - центр глаз
    bottom: null    // Красная - нижняя точка подбородка
  });
  const [faceDetected, setFaceDetected] = useState(false);
  const imgRef = useRef();
  const canvasRef = useRef();

  // Загрузка моделей face-api.js
  useEffect(() => {
    const loadModels = async () => {
      try {
        setLoading(true);
        const MODEL_URL = process.env.PUBLIC_URL + "/models";
        
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL)
        ]);
        
        setModelsLoaded(true);
        setLoading(false);
        console.log("Модели загружены");
      } catch (error) {
        console.error("Ошибка загрузки моделей:", error);
        setLoading(false);
        alert("Ошибка загрузки моделей. Проверьте наличие файлов в папке public/models/");
      }
    };

    loadModels();
  }, []);

  // Детектирование лица и определение линий
  const detectFace = async () => {
    if (!imgRef.current || !modelsLoaded) return;

    try {
      setLoading(true);
      const img = imgRef.current;
      
      // Детектирование лица с landmarks
      const detection = await faceapi
        .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks();

      if (!detection) {
        alert("Лицо не обнаружено на фото");
        setFaceDetected(false);
        setLoading(false);
        return;
      }

      setFaceDetected(true);
      const { detection: faceDetection, landmarks } = detection;
      const box = faceDetection.box;

      // Получаем координаты landmarks
      const landmarksPositions = landmarks.positions;

      // 1. КРАСНАЯ ЛИНИЯ - Нижняя точка подбородка (landmark 8)
      const chinBottom = landmarksPositions[8];
      const bottomLineY = chinBottom.y;

      // 2. ЗЕЛЕНАЯ ЛИНИЯ - Центр глаз
      const leftEyeCenter = landmarksPositions[38];
      const rightEyeCenter = landmarksPositions[44];
      const eyeCenterY = (leftEyeCenter.y + rightEyeCenter.y) / 2;

      // 3. ЖЕЛТАЯ ЛИНИЯ - Верхняя точка головы
      // ВАЖНО: Используем верхнюю границу bounding box (box.y)
      // Это верхняя точка головы, а не брови!
      const headTopY = box.y;

      // Сохраняем координаты линий
      setLines({
        top: headTopY,
        middle: eyeCenterY,
        bottom: bottomLineY
      });

      // Отрисовка на canvas
      drawLines(img, {
        top: headTopY,
        middle: eyeCenterY,
        bottom: bottomLineY
      }, box, landmarksPositions);

      setLoading(false);
    } catch (error) {
      console.error("Ошибка детектирования:", error);
      alert("Ошибка при детектировании лица: " + error.message);
      setLoading(false);
    }
  };

  // Отрисовка линий на canvas
  const drawLines = (img, linesData, box, landmarks) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    // Рисуем landmarks (опционально, для отладки)
    ctx.fillStyle = "cyan";
    landmarks.forEach(point => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
      ctx.fill();
    });

    // Желтая линия - верхняя точка головы (bounding box top)
    if (linesData.top !== null) {
      ctx.strokeStyle = "#FFD700"; // Желтый
      ctx.lineWidth = 3;
      ctx.setLineDash([10, 5]);
      ctx.beginPath();
      ctx.moveTo(0, linesData.top);
      ctx.lineTo(canvas.width, linesData.top);
      ctx.stroke();
      
      // Подпись
      ctx.fillStyle = "#FFD700";
      ctx.font = "bold 16px Arial";
      ctx.fillText("Top", 10, linesData.top - 5);
    }

    // Зеленая линия - центр глаз
    if (linesData.middle !== null) {
      ctx.strokeStyle = "#00FF00"; // Зеленый
      ctx.lineWidth = 3;
      ctx.setLineDash([10, 5]);
      ctx.beginPath();
      ctx.moveTo(0, linesData.middle);
      ctx.lineTo(canvas.width, linesData.middle);
      ctx.stroke();
      
      // Подпись
      ctx.fillStyle = "#00FF00";
      ctx.font = "bold 16px Arial";
      ctx.fillText("Eyes", 10, linesData.middle - 5);
    }

    // Красная линия - нижняя точка подбородка
    if (linesData.bottom !== null) {
      ctx.strokeStyle = "#FF0000"; // Красный
      ctx.lineWidth = 3;
      ctx.setLineDash([10, 5]);
      ctx.beginPath();
      ctx.moveTo(0, linesData.bottom);
      ctx.lineTo(canvas.width, linesData.bottom);
      ctx.stroke();
      
      // Подпись
      ctx.fillStyle = "#FF0000";
      ctx.font = "bold 16px Arial";
      ctx.fillText("Chin", 10, linesData.bottom - 5);
    }

    ctx.setLineDash([]);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
        setLines({ top: null, middle: null, bottom: null });
        setFaceDetected(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // Автоматическое детектирование при загрузке изображения
  useEffect(() => {
    if (image && modelsLoaded && imgRef.current?.complete) {
      setTimeout(() => {
        detectFace();
      }, 100);
    }
  }, [image, modelsLoaded]);

  return (
    <div className="app">
      <h2>Проверка фото DV Lottery</h2>

      {loading && !modelsLoaded && <p>Загрузка моделей...</p>}
      {!modelsLoaded && !loading && <p>Ожидание загрузки моделей...</p>}

      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange}
        disabled={!modelsLoaded}
        style={{ marginBottom: "20px" }}
      />

      {image && (
        <div className="photo-area">
          <div style={{ position: "relative", display: "inline-block" }}>
            <img 
              ref={imgRef}
              src={image} 
              alt="uploaded"
              onLoad={() => {
                if (modelsLoaded) {
                  setTimeout(() => detectFace(), 100);
                }
              }}
              style={{ maxWidth: "100%", height: "auto", display: "block" }}
            />
            <canvas
              ref={canvasRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none"
              }}
            />
          </div>

          {faceDetected && lines.top !== null && (
            <div className="lines-info">
              <h3>Координаты линий:</h3>
              <p>
                <span style={{ color: "#FFD700", fontWeight: "bold" }}>Желтая линия</span> (верхняя точка головы): {Math.round(lines.top)}px
              </p>
              <p>
                <span style={{ color: "#00FF00", fontWeight: "bold" }}>Зеленая линия</span> (центр глаз): {Math.round(lines.middle)}px
              </p>
              <p>
                <span style={{ color: "#FF0000", fontWeight: "bold" }}>Красная линия</span> (нижняя точка подбородка): {Math.round(lines.bottom)}px
              </p>
            </div>
          )}

          <button 
            onClick={detectFace} 
            disabled={!modelsLoaded || loading}
            style={{ 
              marginTop: "10px", 
              padding: "10px 20px",
              fontSize: "16px",
              cursor: modelsLoaded && !loading ? "pointer" : "not-allowed"
            }}
          >
            {loading ? "Обработка..." : "Обнаружить лицо"}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
