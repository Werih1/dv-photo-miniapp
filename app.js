// ============================================
// GREEN CARD PHOTO VERIFICATION APP
// Face Detection + Crop + Download
// ============================================

const CONFIG = {
  CROP_SIZE: 600,
  MIN_CONFIDENCE: 0.5,
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  MODEL_URL: 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/'
};

let currentImage = null;
let currentDetections = null;
let modelsLoaded = false;

// ============================================
// DOM Elements
// ============================================

const elements = {
  photoInput: document.getElementById('photoInput'),
  uploadBtn: document.getElementById('uploadBtn'),
  analyzeBtn: document.getElementById('analyzeBtn'),
  downloadBtn: document.getElementById('downloadBtn'),
  newPhotoBtn: document.getElementById('newPhotoBtn'),
  uploadArea: document.getElementById('uploadArea'),
  originalCanvas: document.getElementById('originalCanvas'),
  resultCanvas: document.getElementById('resultCanvas'),
  croppedCanvas: document.getElementById('croppedCanvas'),
  originalPhotoContainer: document.getElementById('originalPhotoContainer'),
  resultPhotoContainer: document.getElementById('resultPhotoContainer'),
  croppedPhotoContainer: document.getElementById('croppedPhotoContainer'),
  newPhotoContainer: document.getElementById('newPhotoContainer'),
  errorMessage: document.getElementById('errorMessage'),
  loadingSpinner: document.getElementById('loadingSpinner'),
  statusMessage: document.getElementById('statusMessage'),
  photoInfo: document.getElementById('photoInfo'),
  photoSize: document.getElementById('photoSize'),
};

// ============================================
// Event Listeners
// ============================================

elements.uploadBtn.addEventListener('click', () => {
  elements.photoInput.click();
});

elements.photoInput.addEventListener('change', handlePhotoSelect);

elements.uploadArea.addEventListener('click', () => {
  elements.photoInput.click();
});

elements.uploadArea.addEventListener('dragover', handleDragOver);
elements.uploadArea.addEventListener('drop', handleDrop);

elements.analyzeBtn.addEventListener('click', analyzePhoto);
elements.downloadBtn.addEventListener('click', downloadCroppedPhoto);
elements.newPhotoBtn.addEventListener('click', resetApp);

// ============================================
// Photo Upload & Selection
// ============================================

function handlePhotoSelect(event) {
  const file = event.target.files[0];
  if (file) {
    processPhoto(file);
  }
}

function handleDragOver(event) {
  event.preventDefault();
  elements.uploadArea.style.background = '#e8eef9';
}

function handleDrop(event) {
  event.preventDefault();
  elements.uploadArea.style.background = '#f0f4ff';
  const file = event.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) {
    processPhoto(file);
  }
}

function processPhoto(file) {
  // Validation
  if (!file.type.startsWith('image/')) {
    showError('⚠️ Please select an image file');
    return;
  }

  if (file.size > CONFIG.MAX_FILE_SIZE) {
    showError('⚠️ File too large (maximum 10 MB)');
    return;
  }

  showLoading(true);
  clearError();

  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      currentImage = img;
      displayOriginalPhoto(img);
      showLoading(false);
      elements.statusMessage.textContent = '✅ Photo loaded. Click "Analyze Photo"';
    };
    img.onerror = () => {
      showError('⚠️ Error loading image');
      showLoading(false);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function displayOriginalPhoto(img) {
  const canvas = elements.originalCanvas;
  const ctx = canvas.getContext('2d');

  // Set canvas size
  canvas.width = img.width;
  canvas.height = img.height;

  // Draw image
  ctx.drawImage(img, 0, 0);

  // Show container
  elements.originalPhotoContainer.classList.remove('hidden');
  elements.analyzeBtn.classList.remove('hidden');
  elements.uploadBtn.classList.add('hidden');

  // Photo info
  elements.photoSize.textContent = `${img.width}×${img.height}px`;
  elements.photoInfo.classList.remove('hidden');
}

// ============================================
// Load Face-API Models
// ============================================

async function loadModels() {
  if (modelsLoaded) return;

  try {
    showLoading(true);
    elements.statusMessage.textContent = '📦 Loading AI models...';

    // Load models from CDN
    await Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri(CONFIG.MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(CONFIG.MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(CONFIG.MODEL_URL)
    ]);

    modelsLoaded = true;
    elements.statusMessage.textContent = '✅ Models loaded. Ready to analyze.';
    showLoading(false);
  } catch (error) {
    console.error('Model loading error:', error);
    showError('⚠️ Error loading AI models. Please refresh page.');
    showLoading(false);
  }
}

// ============================================
// Face Detection & Analysis
// ============================================

async function analyzePhoto() {
  if (!currentImage) {
    showError('⚠️ Photo not loaded');
    return;
  }

  // Load models first
  if (!modelsLoaded) {
    await loadModels();
  }

  showLoading(true);
  elements.statusMessage.textContent = '🔍 Analyzing photo...';

  try {
    // Face detection with landmarks
    const detections = await faceapi
      .detectSingleFace(currentImage)
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detections) {
      showError('❌ Face not detected. Please upload a different photo.');
      showLoading(false);
      elements.statusMessage.textContent = '❌ Analysis failed - no face found';
      return;
    }

    currentDetections = detections;

    // Draw results
    drawResultsWithLines();
    drawCroppedPhoto();

    // Show results
    elements.resultPhotoContainer.classList.remove('hidden');
    elements.croppedPhotoContainer.classList.remove('hidden');
    elements.downloadBtn.classList.remove('hidden');
    elements.newPhotoContainer.classList.remove('hidden');

    elements.statusMessage.textContent = '✅ Analysis complete! Download your photo.';
    showLoading(false);

  } catch (error) {
    console.error('Analysis error:', error);
    showError('⚠️ Analysis error: ' + error.message);
    showLoading(false);
  }
}

// ============================================
// Drawing Functions
// ============================================

function drawResultsWithLines() {
  const canvas = elements.resultCanvas;
  const ctx = canvas.getContext('2d');

  // Copy original image
  canvas.width = currentImage.width;
  canvas.height = currentImage.height;
  ctx.drawImage(currentImage, 0, 0);

  if (!currentDetections) return;

  const box = currentDetections.detection.box;
  const landmarks = currentDetections.landmarks.positions;

  // Calculate three key points
  // Top of head - above the face box
  const topHead = {
    x: box.x + box.width / 2,
    y: box.y - 30,
  };

  // Eye center - between left and right eye
  const eyeCenter = {
    x: (landmarks[36].x + landmarks[45].x) / 2,
    y: (landmarks[36].y + landmarks[45].y) / 2,
  };

  // Chin bottom - below face box
  const chinBottom = {
    x: box.x + box.width / 2,
    y: box.y + box.height + 20,
  };

  // Draw horizontal lines
  const lineWidth = 4;
  const lineLength = canvas.width * 0.35;

  // Yellow line (top of head)
  drawHorizontalLine(ctx, topHead.x, topHead.y, lineLength, '#FFD700', lineWidth);

  // Green line (eyes)
  drawHorizontalLine(ctx, eyeCenter.x, eyeCenter.y, lineLength, '#00FF00', lineWidth);

  // Red line (chin)
  drawHorizontalLine(ctx, chinBottom.x, chinBottom.y, lineLength, '#FF0000', lineWidth);

  // Draw points
  drawPoint(ctx, topHead.x, topHead.y, '#FFD700');
  drawPoint(ctx, eyeCenter.x, eyeCenter.y, '#00FF00');
  drawPoint(ctx, chinBottom.x, chinBottom.y, '#FF0000');
}

function drawHorizontalLine(ctx, centerX, y, length, color, width) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(centerX - length / 2, y);
  ctx.lineTo(centerX + length / 2, y);
  ctx.stroke();
}

function drawPoint(ctx, x, y, color) {
  // Outer circle
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, 8, 0, Math.PI * 2);
  ctx.fill();

  // Inner white circle
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(x, y, 4, 0, Math.PI * 2);
  ctx.fill();
}

// ============================================
// Crop & Download
// ============================================

function drawCroppedPhoto() {
  const croppedCanvas = elements.croppedCanvas;
  const ctx = croppedCanvas.getContext('2d');

  if (!currentDetections) return;

  const box = currentDetections.detection.box;

  // Face center
  const faceCenter = {
    x: box.x + box.width / 2,
    y: box.y + box.height / 2,
  };

  // Calculate crop coordinates (centered on face)
  let cropX = faceCenter.x - CONFIG.CROP_SIZE / 2;
  let cropY = faceCenter.y - CONFIG.CROP_SIZE / 2;

  // Keep crop within image bounds
  cropX = Math.max(0, Math.min(cropX, currentImage.width - CONFIG.CROP_SIZE));
  cropY = Math.max(0, Math.min(cropY, currentImage.height - CONFIG.CROP_SIZE));

  // Set canvas size
  croppedCanvas.width = CONFIG.CROP_SIZE;
  croppedCanvas.height = CONFIG.CROP_SIZE;

  // Draw crop WITHOUT lines
  ctx.drawImage(
    currentImage,
    cropX,
    cropY,
    CONFIG.CROP_SIZE,
    CONFIG.CROP_SIZE,
    0,
    0,
    CONFIG.CROP_SIZE,
    CONFIG.CROP_SIZE
  );
}

function downloadCroppedPhoto() {
  const canvas = elements.croppedCanvas;

  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `greencard-photo-${Date.now()}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 'image/jpeg', 0.95);
}

// ============================================
// UI Helpers
// ============================================

function showError(message) {
  elements.errorMessage.textContent = message;
  elements.errorMessage.classList.add('show');
  setTimeout(() => {
    elements.errorMessage.classList.remove('show');
  }, 5000);
}

function clearError() {
  elements.errorMessage.classList.remove('show');
}

function showLoading(show) {
  if (show) {
    elements.loadingSpinner.classList.remove('hidden');
  } else {
    elements.loadingSpinner.classList.add('hidden');
  }
}

function resetApp() {
  currentImage = null;
  currentDetections = null;
  elements.photoInput.value = '';

  // Hide all results
  elements.originalPhotoContainer.classList.add('hidden');
  elements.resultPhotoContainer.classList.add('hidden');
  elements.croppedPhotoContainer.classList.add('hidden');
  elements.newPhotoContainer.classList.add('hidden');
  elements.analyzeBtn.classList.add('hidden');
  elements.downloadBtn.classList.add('hidden');

  // Show upload
  elements.uploadBtn.classList.remove('hidden');
  elements.statusMessage.textContent = '🎫 Load a new photo to verify';
  elements.photoInfo.classList.add('hidden');

  clearError();
}

// ============================================
// Initialization
// ============================================

window.addEventListener('load', () => {
  console.log('🚀 Green Card Photo Verification App loaded');
  console.log('📦 face-api.js loaded from CDN');
  
  // Pre-load models on start for faster first analysis
  if (window.faceapi) {
    loadModels().catch(err => console.log('Pre-load skipped:', err));
  }
});
