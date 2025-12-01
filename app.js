// ============================================
// Green Card Photo Verification App
// Face Detection + Crop + Download
// ============================================

const CONFIG = {
    CROP_SIZE: 600,
    MIN_CONFIDENCE: 0.5,
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
};

let currentImage = null;
let currentDetections = null;

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
        showError('⚠️ Пожалуйста, выберите изображение');
        return;
    }

    if (file.size > CONFIG.MAX_FILE_SIZE) {
        showError('⚠️ Файл слишком большой (максимум 10 MB)');
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
            elements.statusMessage.textContent = '✅ Фото загружено. Нажмите "Анализировать"';
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function displayOriginalPhoto(img) {
    const canvas = elements.originalCanvas;
    const ctx = canvas.getContext('2d');

    // Установка размеров
    canvas.width = img.width;
    canvas.height = img.height;

    // Рисование изображения
    ctx.drawImage(img, 0, 0);

    // Показ контейнера
    elements.originalPhotoContainer.classList.remove('hidden');
    elements.analyzeBtn.classList.remove('hidden');
    elements.uploadBtn.classList.add('hidden');

    // Информация о фото
    elements.photoSize.textContent = `${img.width}×${img.height}px`;
    elements.photoInfo.classList.remove('hidden');
}

// ============================================
// Face Detection & Analysis
// ============================================

async function analyzePhoto() {
    if (!currentImage) {
        showError('⚠️ Фото не загружено');
        return;
    }

    showLoading(true);
    elements.statusMessage.textContent = '🔍 Анализ фото...';

    try {
        // Ожидаем загрузки моделей face-api
        await waitForFaceApi();

        // Обнаружение лица
        const detections = await faceapi
            .detectSingleFace(currentImage)
            .withFaceLandmarks()
            .withFaceDescriptor();

        if (!detections) {
            showError('❌ Лицо не обнаружено. Пожалуйста, загрузите другое фото.');
            showLoading(false);
            return;
        }

        currentDetections = detections;

        // Рисование результатов
        drawResultsWithLines();
        drawCroppedPhoto();

        // Показ результатов
        elements.resultPhotoContainer.classList.remove('hidden');
        elements.croppedPhotoContainer.classList.remove('hidden');
        elements.downloadBtn.classList.remove('hidden');
        elements.newPhotoBtn.classList.remove('hidden');

        elements.statusMessage.textContent = '✅ Анализ завершён!';

        showLoading(false);
    } catch (error) {
        console.error('Ошибка анализа:', error);
        showError('⚠️ Ошибка при анализе фото: ' + error.message);
        showLoading(false);
    }
}

function waitForFaceApi() {
    return new Promise((resolve) => {
        const checkFaceApi = () => {
            if (window.faceapi && window.faceapi.detectSingleFace) {
                resolve();
            } else {
                setTimeout(checkFaceApi, 100);
            }
        };
        checkFaceApi();
    });
}

// ============================================
// Drawing Functions
// ============================================

function drawResultsWithLines() {
    const canvas = elements.resultCanvas;
    const ctx = canvas.getContext('2d');

    // Копирование исходного изображения
    canvas.width = currentImage.width;
    canvas.height = currentImage.height;
    ctx.drawImage(currentImage, 0, 0);

    if (!currentDetections) return;

    const box = currentDetections.detection.box;
    const landmarks = currentDetections.landmarks.positions;

    // Вычисление трёх ключевых точек
    const topHead = {
        x: box.x + box.width / 2,
        y: box.y - 10, // Немного выше лица
    };

    const eyeCenter = {
        x: (landmarks[36].x + landmarks[45].x) / 2, // Между левым и правым глазом
        y: (landmarks[36].y + landmarks[45].y) / 2,
    };

    const chinBottom = {
        x: box.x + box.width / 2,
        y: box.y + box.height + 5, // Чуть ниже лица
    };

    // Рисование горизонтальных линий
    const lineWidth = 3;
    const lineLength = canvas.width * 0.3;

    // Жёлтая линия (макушка)
    drawHorizontalLine(ctx, topHead.x, topHead.y, lineLength, '#FFD700', lineWidth);

    // Зелёная линия (глаза)
    drawHorizontalLine(ctx, eyeCenter.x, eyeCenter.y, lineLength, '#00FF00', lineWidth);

    // Красная линия (подбородок)
    drawHorizontalLine(ctx, chinBottom.x, chinBottom.y, lineLength, '#FF0000', lineWidth);

    // Рисование точек
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

    if (!currentDetections) return;

    const box = currentDetections.detection.box;

    // Вычисление центра лица
    const faceCenter = {
        x: box.x + box.width / 2,
        y: box.y + box.height / 2,
    };

    // Вычисление координат кропа
    const cropX = Math.max(0, faceCenter.x - CONFIG.CROP_SIZE / 2);
    const cropY = Math.max(0, faceCenter.y - CONFIG.CROP_SIZE / 2);

    const maxCropX = Math.max(0, currentImage.width - CONFIG.CROP_SIZE);
    const maxCropY = Math.max(0, currentImage.height - CONFIG.CROP_SIZE);

    const finalCropX = Math.min(cropX, maxCropX);
    const finalCropY = Math.min(cropY, maxCropY);

    // Установка размеров
    croppedCanvas.width = CONFIG.CROP_SIZE;
    croppedCanvas.height = CONFIG.CROP_SIZE;

    // Рисование кропа БЕЗ линий
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
    elements.originalPhotoContainer.classList.add('hidden');
    elements.resultPhotoContainer.classList.add('hidden');
    elements.croppedPhotoContainer.classList.add('hidden');
    elements.analyzeBtn.classList.add('hidden');
    elements.downloadBtn.classList.add('hidden');
    elements.newPhotoBtn.classList.add('hidden');
    elements.uploadBtn.classList.remove('hidden');
    elements.statusMessage.textContent = 'Загрузите фото для начала';
    elements.photoInfo.classList.add('hidden');
    clearError();
}

// ============================================
// Initialization
// ============================================

window.addEventListener('load', () => {
    console.log('🚀 Green Card Photo App загружено');
    console.log('📦 face-api.js загружается из CDN...');
});
