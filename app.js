// ============================================
// Green Card Photo Verification App
// TensorFlow.js + Face Mesh
// ============================================

const CONFIG = {
    CROP_SIZE: 600,
    MAX_FILE_SIZE: 10 * 1024 * 1024
};

let currentImage = null;
let currentPredictions = null;
let modelsLoaded = false;

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
    errorMessage: document.getElementById('errorMessage'),
    loadingSpinner: document.getElementById('loadingSpinner'),
    statusMessage: document.getElementById('statusMessage'),
    photoInfo: document.getElementById('photoInfo'),
    photoSize: document.getElementById('photoSize')
};

// ============================================
// Load Models
// ============================================

async function loadModels() {
    try {
        elements.statusMessage.textContent = 'Loading AI models...';
        showLoading(true);
        
        console.log('Loading Face Mesh model...');
        await facemesh.load();
        
        modelsLoaded = true;
        elements.statusMessage.textContent = 'Ready! Upload a photo.';
        showLoading(false);
        console.log('Models loaded successfully');
    } catch (error) {
        console.error('Error loading models:', error);
        showError('Failed to load AI models: ' + error.message);
        showLoading(false);
    }
}

// ============================================
// Event Listeners
// ============================================

elements.uploadBtn.addEventListener('click', function() {
    elements.photoInput.click();
});

elements.photoInput.addEventListener('change', handlePhotoSelect);

elements.uploadArea.addEventListener('click', function() {
    elements.photoInput.click();
});

elements.uploadArea.addEventListener('dragover', handleDragOver);
elements.uploadArea.addEventListener('drop', handleDrop);

elements.analyzeBtn.addEventListener('click', analyzePhoto);
elements.downloadBtn.addEventListener('click', downloadCroppedPhoto);
elements.newPhotoBtn.addEventListener('click', resetApp);

// ============================================
// Photo Upload
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
    if (!file.type.startsWith('image/')) {
        showError('Please select an image');
        return;
    }

    if (file.size > CONFIG.MAX_FILE_SIZE) {
        showError('File too large (max 10 MB)');
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
            elements.statusMessage.textContent = 'Photo loaded. Click Analyze';
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function displayOriginalPhoto(img) {
    const canvas = elements.originalCanvas;
    const ctx = canvas.getContext('2d');

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    elements.originalPhotoContainer.classList.remove('hidden');
    elements.analyzeBtn.classList.remove('hidden');
    elements.uploadBtn.classList.add('hidden');

    elements.photoSize.textContent = img.width + 'x' + img.height + 'px';
    elements.photoInfo.classList.remove('hidden');
}

// ============================================
// Face Detection & Analysis
// ============================================

async function analyzePhoto() {
    if (!currentImage) {
        showError('Photo not loaded');
        return;
    }

    if (!modelsLoaded) {
        showError('Models loading. Please wait...');
        return;
    }

    showLoading(true);
    elements.statusMessage.textContent = 'Analyzing photo...';

    try {
        console.log('Starting face detection...');
        
        const predictions = await facemesh.estimateFaces(currentImage);
        
        console.log('Predictions:', predictions);

        if (!predictions || predictions.length === 0) {
            showError('Face not detected. Try another photo.');
            showLoading(false);
            return;
        }

        currentPredictions = predictions[0];

        drawResultsWithLines();
        drawCroppedPhoto();

        elements.resultPhotoContainer.classList.remove('hidden');
        elements.croppedPhotoContainer.classList.remove('hidden');
        elements.downloadBtn.classList.remove('hidden');
        elements.newPhotoBtn.classList.remove('hidden');

        elements.statusMessage.textContent = 'Analysis complete!';

        showLoading(false);
    } catch (error) {
        console.error('Analysis error:', error);
        showError('Error during analysis: ' + error.message);
        showLoading(false);
    }
}

// ============================================
// Drawing
// ============================================

function drawResultsWithLines() {
    const canvas = elements.resultCanvas;
    const ctx = canvas.getContext('2d');

    canvas.width = currentImage.width;
    canvas.height = currentImage.height;
    ctx.drawImage(currentImage, 0, 0);

    if (!currentPredictions) return;

    const landmarks = currentPredictions.scaledMesh;

    if (landmarks.length < 468) return;

    const topHead = {
        x: landmarks[10][0],
        y: landmarks[10][1]
    };

    const eyeCenter = {
        x: (landmarks[33][0] + landmarks[263][0]) / 2,
        y: (landmarks[33][1] + landmarks[263][1]) / 2
    };

    const chinBottom = {
        x: landmarks[152][0],
        y: landmarks[152][1]
    };

    const lineWidth = 3;
    const lineLength = canvas.width * 0.3;

    drawHorizontalLine(ctx, topHead.x, topHead.y, lineLength, '#FFD700', lineWidth);
    drawHorizontalLine(ctx, eyeCenter.x, eyeCenter.y, lineLength, '#00FF00', lineWidth);
    drawHorizontalLine(ctx, chinBottom.x, chinBottom.y, lineLength, '#FF0000', lineWidth);

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

// ============================================
// Crop & Download
// ============================================

function drawCroppedPhoto() {
    const croppedCanvas = elements.croppedCanvas;
    const ctx = croppedCanvas.getContext('2d');

    if (!currentPredictions) return;

    const landmarks = currentPredictions.scaledMesh;
    
    let minX = Math.min(...landmarks.map(l => l[0]));
    let maxX = Math.max(...landmarks.map(l => l[0]));
    let minY = Math.min(...landmarks.map(l => l[1]));
    let maxY = Math.max(...landmarks.map(l => l[1]));

    const faceWidth = maxX - minX;
    const faceHeight = maxY - minY;
    const faceCenter = {
        x: minX + faceWidth / 2,
        y: minY + faceHeight / 2
    };

    const cropX = Math.max(0, faceCenter.x - CONFIG.CROP_SIZE / 2);
    const cropY = Math.max(0, faceCenter.y - CONFIG.CROP_SIZE / 2);

    const maxCropX = Math.max(0, currentImage.width - CONFIG.CROP_SIZE);
    const maxCropY = Math.max(0, currentImage.height - CONFIG.CROP_SIZE);

    const finalCropX = Math.min(cropX, maxCropX);
    const finalCropY = Math.min(cropY, maxCropY);

    croppedCanvas.width = CONFIG.CROP_SIZE;
    croppedCanvas.height = CONFIG.CROP_SIZE;

    ctx.drawImage(
        currentImage,
        finalCropX,
        finalCropY,
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

// ============================================
// UI Helpers
// ============================================

function showError(message) {
    elements.errorMessage.textContent = message;
    elements.errorMessage.classList.add('show');
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
    currentPredictions = null;
    elements.photoInput.value = '';
    elements.originalPhotoContainer.classList.add('hidden');
    elements.resultPhotoContainer.classList.add('hidden');
    elements.croppedPhotoContainer.classList.add('hidden');
    elements.analyzeBtn.classList.add('hidden');
    elements.downloadBtn.classList.add('hidden');
    elements.newPhotoBtn.classList.add('hidden');
    elements.uploadBtn.classList.remove('hidden');
    elements.statusMessage.textContent = 'Load photo to start';
    elements.photoInfo.classList.add('hidden');
    clearError();
}

// ============================================
// Initialization
// ============================================

window.addEventListener('load', function() {
    console.log('App loaded');
    if (typeof facemesh !== 'undefined') {
        loadModels();
    } else {
        console.error('Face Mesh not loaded');
        showError('Failed to load Face Mesh library');
    }
});
