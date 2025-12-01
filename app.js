const CONFIG = {
    CROP_SIZE: 600,
    MAX_FILE_SIZE: 10 * 1024 * 1024
};

let currentImage = null;
let currentPredictions = null;
let modelsLoaded = false;
let facemeshModel = null;

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    setupEventListeners();
    loadModels();
});

// Setup all event listeners
function setupEventListeners() {
    const uploadBtn = document.getElementById('uploadBtn');
    const photoInput = document.getElementById('photoInput');
    const uploadArea = document.getElementById('uploadArea');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const newPhotoBtn = document.getElementById('newPhotoBtn');

    if (uploadBtn) uploadBtn.addEventListener('click', () => photoInput.click());
    if (photoInput) photoInput.addEventListener('change', handlePhotoSelect);
    if (uploadArea) {
        uploadArea.addEventListener('click', () => photoInput.click());
        uploadArea.addEventListener('dragover', e => e.preventDefault());
        uploadArea.addEventListener('drop', handleDrop);
    }
    if (analyzeBtn) analyzeBtn.addEventListener('click', analyzePhoto);
    if (downloadBtn) downloadBtn.addEventListener('click', downloadCroppedPhoto);
    if (newPhotoBtn) newPhotoBtn.addEventListener('click', resetApp);
}

// Load models
async function loadModels() {
    try {
        updateStatus('Loading AI models...');
        showLoading(true);
        
        console.log('Loading Face Mesh...');
        facemeshModel = await facemesh.load();
        
        modelsLoaded = true;
        updateStatus('Ready! Upload a photo.');
        showLoading(false);
        console.log('Models loaded successfully');
    } catch (error) {
        console.error('Error loading models:', error);
        showError('Failed to load AI models');
        showLoading(false);
    }
}

// Photo select
function handlePhotoSelect(event) {
    const file = event.target.files[0];
    if (file) processPhoto(file);
}

// Photo drop
function handleDrop(event) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) processPhoto(file);
}

// Process photo
function processPhoto(file) {
    if (!file.type.startsWith('image/')) {
        showError('Please select an image');
        return;
    }

    if (file.size > CONFIG.MAX_FILE_SIZE) {
        showError('File too large');
        return;
    }

    showLoading(true);
    clearError();

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            currentImage = img;
            displayOriginalPhoto(img);
            showLoading(false);
            updateStatus('Photo loaded. Click Analyze');
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// Display original photo
function displayOriginalPhoto(img) {
    const canvas = document.getElementById('originalCanvas');
    if (!canvas) {
        console.error('Canvas not found');
        return;
    }

    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    document.getElementById('originalPhotoContainer').classList.remove('hidden');
    document.getElementById('analyzeBtn').classList.remove('hidden');
    document.getElementById('uploadBtn').classList.add('hidden');

    document.getElementById('photoSize').textContent = img.width + 'x' + img.height + 'px';
    document.getElementById('photoInfo').classList.remove('hidden');
}

// Analyze photo
async function analyzePhoto() {
    if (!currentImage) {
        showError('Photo not loaded');
        return;
    }

    if (!modelsLoaded) {
        showError('Models still loading');
        return;
    }

    showLoading(true);
    updateStatus('Analyzing photo...');

    try {
        console.log('Starting face detection...');
        const predictions = await facemeshModel.estimateFaces(currentImage);
        
        console.log('Predictions:', predictions);

        if (!predictions || predictions.length === 0) {
            showError('Face not detected');
            showLoading(false);
            return;
        }

        currentPredictions = predictions[0];

        drawResultsWithLines();
        drawCroppedPhoto();

        document.getElementById('resultPhotoContainer').classList.remove('hidden');
        document.getElementById('croppedPhotoContainer').classList.remove('hidden');
        document.getElementById('downloadBtn').classList.remove('hidden');
        document.getElementById('newPhotoBtn').classList.remove('hidden');

        updateStatus('Analysis complete!');
        showLoading(false);
    } catch (error) {
        console.error('Analysis error:', error);
        showError('Analysis failed: ' + error.message);
        showLoading(false);
    }
}

// Draw results with lines
function drawResultsWithLines() {
    const canvas = document.getElementById('resultCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = currentImage.width;
    canvas.height = currentImage.height;
    ctx.drawImage(currentImage, 0, 0);

    if (!currentPredictions) return;

    const landmarks = currentPredictions.scaledMesh;
    if (!landmarks || landmarks.length < 468) return;

    const topHead = { x: landmarks[10][0], y: landmarks[10][1] };
    const eyeCenter = {
        x: (landmarks[33][0] + landmarks[263][0]) / 2,
        y: (landmarks[33][1] + landmarks[263][1]) / 2
    };
    const chinBottom = { x: landmarks[152][0], y: landmarks[152][1] };

    const lineLength = canvas.width * 0.3;

    drawHorizontalLine(ctx, topHead.x, topHead.y, lineLength, '#FFD700', 3);
    drawHorizontalLine(ctx, eyeCenter.x, eyeCenter.y, lineLength, '#00FF00', 3);
    drawHorizontalLine(ctx, chinBottom.x, chinBottom.y, lineLength, '#FF0000', 3);

    drawPoint(ctx, topHead.x, topHead.y, '#FFD700');
    drawPoint(ctx, eyeCenter.x, eyeCenter.y, '#00FF00');
    drawPoint(ctx, chinBottom.x, chinBottom.y, '#FF0000');
}

function drawHorizontalLine(ctx, centerX, y, length, color, width) {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(centerX - length / 2, y);
    ctx.lineTo(centerX + length / 2, y);
    ctx.stroke();
}

function drawPoint(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();
}

// Draw cropped photo
function drawCroppedPhoto() {
    const croppedCanvas = document.getElementById('croppedCanvas');
    const ctx = croppedCanvas.getContext('2d');

    if (!currentPredictions) return;

    const landmarks = currentPredictions.scaledMesh;
    
    let minX = Math.min(...landmarks.map(l => l[0]));
    let maxX = Math.max(...landmarks.map(l => l[0]));
    let minY = Math.min(...landmarks.map(l => l[1]));
    let maxY = Math.max(...landmarks.map(l => l[1]));

    const faceCenter = {
        x: minX + (maxX - minX) / 2,
        y: minY + (maxY - minY) / 2
    };

    let cropX = faceCenter.x - CONFIG.CROP_SIZE / 2;
    let cropY = faceCenter.y - CONFIG.CROP_SIZE / 2;

    cropX = Math.max(0, Math.min(cropX, currentImage.width - CONFIG.CROP_SIZE));
    cropY = Math.max(0, Math.min(cropY, currentImage.height - CONFIG.CROP_SIZE));

    croppedCanvas.width = CONFIG.CROP_SIZE;
    croppedCanvas.height = CONFIG.CROP_SIZE;

    ctx.drawImage(
        currentImage,
        cropX, cropY, CONFIG.CROP_SIZE, CONFIG.CROP_SIZE,
        0, 0, CONFIG.CROP_SIZE, CONFIG.CROP_SIZE
    );
}

// Download photo
function downloadCroppedPhoto() {
    const canvas = document.getElementById('croppedCanvas');
    canvas.toBlob(function(blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'greencard-photo-' + Date.now() + '.jpg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 'image/jpeg', 0.95);
}

// UI Helpers
function updateStatus(text) {
    const statusEl = document.getElementById('statusMessage');
    if (statusEl) statusEl.textContent = text;
}

function showError(message) {
    const errorEl = document.getElementById('errorMessage');
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.add('show');
    }
}

function clearError() {
    const errorEl = document.getElementById('errorMessage');
    if (errorEl) errorEl.classList.remove('show');
}

function showLoading(show) {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        if (show) {
            spinner.classList.remove('hidden');
        } else {
            spinner.classList.add('hidden');
        }
    }
}

function resetApp() {
    currentImage = null;
    currentPredictions = null;
    
    document.getElementById('photoInput').value = '';
    document.getElementById('originalPhotoContainer').classList.add('hidden');
    document.getElementById('resultPhotoContainer').classList.add('hidden');
    document.getElementById('croppedPhotoContainer').classList.add('hidden');
    document.getElementById('analyzeBtn').classList.add('hidden');
    document.getElementById('downloadBtn').classList.add('hidden');
    document.getElementById('newPhotoBtn').classList.add('hidden');
    document.getElementById('uploadBtn').classList.remove('hidden');
    
    updateStatus('Load photo to start');
    document.getElementById('photoInfo').classList.add('hidden');
    clearError();
}

console.log('App script loaded');
