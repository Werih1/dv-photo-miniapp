// Translations
const translations = {
  ru: {
    'splash.title': 'Проверка фото DV',
    'splash.subtitle': 'Выберите язык',
    'app.title': 'Проверка фото DV',
    'app.attempts': 'Попытки',
    'upload.button': 'Загрузить фото',
    'menu.howto': 'Как это работает',
    'menu.news': 'Новости',
    'menu.pricing': 'Цены',
    'menu.guide': 'Руководство DV',
    'content.howto.title': 'Как это работает',
    'content.howto.p1': 'Наш инструмент проверки фото DV помогает проверить, соответствует ли ваше фото строгим требованиям программы лотереи Green Card США.',
    'content.howto.p2': 'Просто загрузите фото, настройте направляющие линии по границам лица и нажмите проверить. Мы проанализируем положение головы, уровень глаз и однородность фона.',
    'content.howto.p3': 'Инструмент автоматически обрежет и подготовит фото точно по спецификации 600x600 пикселей, требуемой для подачи DV.',
    'content.news.title': 'Новости',
    'content.news.p1': 'Добро пожаловать в проверку фото DV! Наш инструмент гарантирует, что ваше фото соответствует всем официальным требованиям для лотереи Green Card США.',
    'content.news.p2': 'Получите 3 бесплатные проверки для тестирования сервиса. Для безлимитного доступа ознакомьтесь с нашими тарифными планами.',
    'content.pricing.title': 'Цены',
    'pricing.free.title': 'Бесплатно',
    'pricing.free.checks': '3 бесплатные проверки',
    'pricing.free.quality': 'Полный анализ качества',
    'pricing.free.download': 'Скачивание результатов',
    'pricing.agency.title': 'Агентство PRO',
    'pricing.agency.unlimited': 'Безлимитные проверки',
    'pricing.agency.duration': '6 месяцев доступа',
    'pricing.agency.support': 'Приоритетная поддержка',
    'pricing.agency.batch': 'Пакетная обработка',
    'content.guide.title': 'Руководство DV',
    'content.guide.p1': 'Фото должно быть в формате JPEG размером ровно 600x600 пикселей. Высота головы должна составлять от 50% до 69% от общей высоты изображения (300-414 пикселей).',
    'content.guide.p2': 'Глаза должны быть расположены между 56% и 69% от нижнего края изображения. Фон должен быть однородным белым или светло-серым без теней и узоров.',
    'content.guide.p3': 'Фото должно быть недавним (сделано за последние 6 месяцев) и показывать ваше лицо анфас, смотрящее прямо в камеру с нейтральным выражением.',
    'modal.title': 'Настройте направляющие',
    'modal.instructions.title': 'Инструкции:',
    'modal.instructions.red': 'Красная линия: Верх головы',
    'modal.instructions.blue': 'Синяя линия: Низ подбородка',
    'modal.instructions.green': 'Зеленая линия: Центр глаз (пунктир)',
    'modal.instructions.brown': 'Коричневая линия: Вертикальный центр (пунктир)',
    'modal.check': 'Начать проверку',
    'results.head': 'Высота головы',
    'results.eyes': 'Положение глаз',
    'results.background': 'Фон',
    'results.download': 'Скачать фото',
    'results.pass': 'ПРОЙДЕНО',
    'results.fail': 'НЕ ПРОЙДЕНО',
    'error.noSpace': 'Недостаточно места для обрезки. Фото слишком близко к краям. Загрузите фото с большим пространством вокруг лица.',
    'error.noAttempts': 'У вас закончились попытки. Пожалуйста, приобретите тариф для продолжения.'
  },
  en: {
    'splash.title': 'DV Photo Checker',
    'splash.subtitle': 'Select your language',
    'app.title': 'DV Photo Checker',
    'app.attempts': 'Attempts',
    'upload.button': 'Upload Photo',
    'menu.howto': 'How it works',
    'menu.news': 'News',
    'menu.pricing': 'Pricing',
    'menu.guide': 'DV Form Guide',
    'content.howto.title': 'How it works',
    'content.howto.p1': 'Our DV Photo Checker helps you verify if your photo meets the strict requirements for the US Diversity Visa Lottery program.',
    'content.howto.p2': 'Simply upload your photo, adjust the guide lines to match your face boundaries, and click check. We\'ll analyze head position, eye level, and background uniformity.',
    'content.howto.p3': 'The tool will automatically crop and prepare your photo to the exact 600x600 pixel specification required for DV submission.',
    'content.news.title': 'News',
    'content.news.p1': 'Welcome to DV Photo Checker! Our tool ensures your photo meets all official requirements for the US Diversity Visa Lottery.',
    'content.news.p2': 'Get 3 free checks to test the service. For unlimited access, check our pricing plans.',
    'content.pricing.title': 'Pricing',
    'pricing.free.title': 'Free',
    'pricing.free.checks': '3 free checks',
    'pricing.free.quality': 'Full quality analysis',
    'pricing.free.download': 'Download results',
    'pricing.agency.title': 'Agency PRO',
    'pricing.agency.unlimited': 'Unlimited checks',
    'pricing.agency.duration': '6 months access',
    'pricing.agency.support': 'Priority support',
    'pricing.agency.batch': 'Batch processing',
    'content.guide.title': 'DV Form Guide',
    'content.guide.p1': 'The photo must be a JPEG file with exactly 600x600 pixels. The head height must be between 50% and 69% of the total image height (300-414 pixels).',
    'content.guide.p2': 'Eyes should be positioned between 56% and 69% from the bottom of the image. The background must be uniform white or light gray with no shadows or patterns.',
    'content.guide.p3': 'The photo must be recent (taken within the last 6 months) and show your full face looking directly at the camera with a neutral expression.',
    'modal.title': 'Adjust Guide Lines',
    'modal.instructions.title': 'Instructions:',
    'modal.instructions.red': 'Red line: Top of head',
    'modal.instructions.blue': 'Blue line: Bottom of chin',
    'modal.instructions.green': 'Green line: Eye center (dashed)',
    'modal.instructions.brown': 'Brown line: Vertical center (dashed)',
    'modal.check': 'Start Check',
    'results.head': 'Head Height',
    'results.eyes': 'Eye Position',
    'results.background': 'Background',
    'results.download': 'Download Photo',
    'results.pass': 'PASS',
    'results.fail': 'FAIL',
    'error.noSpace': 'Not enough space to crop. Photo too close to edges. Please upload a photo with more space around the face.',
    'error.noAttempts': 'You have run out of attempts. Please purchase a plan to continue.'
  },
  fr: {
    'splash.title': 'Vérificateur de photo DV',
    'splash.subtitle': 'Sélectionnez votre langue',
    'app.title': 'Vérificateur de photo DV',
    'app.attempts': 'Tentatives',
    'upload.button': 'Télécharger une photo',
    'menu.howto': 'Comment ça marche',
    'menu.news': 'Actualités',
    'menu.pricing': 'Tarifs',
    'menu.guide': 'Guide du formulaire DV',
    'content.howto.title': 'Comment ça marche',
    'content.howto.p1': 'Notre vérificateur de photo DV vous aide à vérifier si votre photo répond aux exigences strictes du programme de loterie Diversity Visa des États-Unis.',
    'content.howto.p2': 'Téléchargez simplement votre photo, ajustez les lignes de guidage pour qu\'elles correspondent aux limites de votre visage et cliquez sur vérifier. Nous analyserons la position de la tête, le niveau des yeux et l\'uniformité de l\'arrière-plan.',
    'content.howto.p3': 'L\'outil recadrera et préparera automatiquement votre photo selon la spécification exacte de 600x600 pixels requise pour la soumission DV.',
    'content.news.title': 'Actualités',
    'content.news.p1': 'Bienvenue dans le vérificateur de photo DV ! Notre outil garantit que votre photo répond à toutes les exigences officielles pour la loterie Diversity Visa des États-Unis.',
    'content.news.p2': 'Obtenez 3 vérifications gratuites pour tester le service. Pour un accès illimité, consultez nos plans tarifaires.',
    'content.pricing.title': 'Tarifs',
    'pricing.free.title': 'Gratuit',
    'pricing.free.checks': '3 vérifications gratuites',
    'pricing.free.quality': 'Analyse de qualité complète',
    'pricing.free.download': 'Télécharger les résultats',
    'pricing.agency.title': 'Agence PRO',
    'pricing.agency.unlimited': 'Vérifications illimitées',
    'pricing.agency.duration': '6 mois d\'accès',
    'pricing.agency.support': 'Support prioritaire',
    'pricing.agency.batch': 'Traitement par lots',
    'content.guide.title': 'Guide du formulaire DV',
    'content.guide.p1': 'La photo doit être un fichier JPEG de exactement 600x600 pixels. La hauteur de la tête doit être entre 50% et 69% de la hauteur totale de l\'image (300-414 pixels).',
    'content.guide.p2': 'Les yeux doivent être positionnés entre 56% et 69% à partir du bas de l\'image. L\'arrière-plan doit être blanc uniforme ou gris clair sans ombres ni motifs.',
    'content.guide.p3': 'La photo doit être récente (prise au cours des 6 derniers mois) et montrer votre visage complet regardant directement vers la caméra avec une expression neutre.',
    'modal.title': 'Ajuster les lignes de guidage',
    'modal.instructions.title': 'Instructions:',
    'modal.instructions.red': 'Ligne rouge: Haut de la tête',
    'modal.instructions.blue': 'Ligne bleue: Bas du menton',
    'modal.instructions.green': 'Ligne verte: Centre des yeux (pointillé)',
    'modal.instructions.brown': 'Ligne marron: Centre vertical (pointillé)',
    'modal.check': 'Commencer la vérification',
    'results.head': 'Hauteur de la tête',
    'results.eyes': 'Position des yeux',
    'results.background': 'Arrière-plan',
    'results.download': 'Télécharger la photo',
    'results.pass': 'RÉUSSI',
    'results.fail': 'ÉCHOUÉ',
    'error.noSpace': 'Pas assez d\'espace pour recadrer. Photo trop proche des bords. Veuillez télécharger une photo avec plus d\'espace autour du visage.',
    'error.noAttempts': 'Vous avez épuisé vos tentatives. Veuillez acheter un plan pour continuer.'
  },
  ar: {
    'splash.title': 'فاحص صور DV',
    'splash.subtitle': 'اختر لغتك',
    'app.title': 'فاحص صور DV',
    'app.attempts': 'المحاولات',
    'upload.button': 'تحميل صورة',
    'menu.howto': 'كيف يعمل',
    'menu.news': 'أخبار',
    'menu.pricing': 'الأسعار',
    'menu.guide': 'دليل نموذج DV',
    'content.howto.title': 'كيف يعمل',
    'content.howto.p1': 'يساعدك فاحص صور DV الخاص بنا في التحقق مما إذا كانت صورتك تلبي المتطلبات الصارمة لبرنامج يانصيب التأشيرة المتنوعة الأمريكية.',
    'content.howto.p2': 'ببساطة قم بتحميل صورتك، اضبط خطوط الإرشاد لتتناسب مع حدود وجهك، وانقر على فحص. سنقوم بتحليل موضع الرأس ومستوى العين وتوحيد الخلفية.',
    'content.howto.p3': 'ستقوم الأداة تلقائيًا بقص صورتك وإعدادها بمواصفات 600x600 بكسل المطلوبة لتقديم DV.',
    'content.news.title': 'أخبار',
    'content.news.p1': 'مرحبًا بك في فاحص صور DV! تضمن أداتنا أن صورتك تلبي جميع المتطلبات الرسمية ليانصيب التأشيرة المتنوعة الأمريكية.',
    'content.news.p2': 'احصل على 3 فحوصات مجانية لاختبار الخدمة. للوصول غير المحدود، تحقق من خطط الأسعار لدينا.',
    'content.pricing.title': 'الأسعار',
    'pricing.free.title': 'مجاني',
    'pricing.free.checks': '3 فحوصات مجانية',
    'pricing.free.quality': 'تحليل كامل للجودة',
    'pricing.free.download': 'تنزيل النتائج',
    'pricing.agency.title': 'وكالة PRO',
    'pricing.agency.unlimited': 'فحوصات غير محدودة',
    'pricing.agency.duration': '6 أشهر وصول',
    'pricing.agency.support': 'دعم ذو أولوية',
    'pricing.agency.batch': 'معالجة دفعية',
    'content.guide.title': 'دليل نموذج DV',
    'content.guide.p1': 'يجب أن تكون الصورة ملف JPEG بحجم 600x600 بكسل بالضبط. يجب أن يكون ارتفاع الرأس بين 50٪ و 69٪ من إجمالي ارتفاع الصورة (300-414 بكسل).',
    'content.guide.p2': 'يجب أن تكون العيون موضوعة بين 56٪ و 69٪ من أسفل الصورة. يجب أن تكون الخلفية بيضاء موحدة أو رمادية فاتحة بدون ظلال أو أنماط.',
    'content.guide.p3': 'يجب أن تكون الصورة حديثة (تم التقاطها خلال الأشهر الستة الماضية) وتظهر وجهك الكامل ينظر مباشرة إلى الكاميرا بتعبير محايد.',
    'modal.title': 'اضبط خطوط الإرشاد',
    'modal.instructions.title': 'التعليمات:',
    'modal.instructions.red': 'الخط الأحمر: أعلى الرأس',
    'modal.instructions.blue': 'الخط الأزرق: أسفل الذقن',
    'modal.instructions.green': 'الخط الأخضر: مركز العين (متقطع)',
    'modal.instructions.brown': 'الخط البني: المركز العمودي (متقطع)',
    'modal.check': 'بدء الفحص',
    'results.head': 'ارتفاع الرأس',
    'results.eyes': 'موضع العين',
    'results.background': 'الخلفية',
    'results.download': 'تنزيل الصورة',
    'results.pass': 'نجح',
    'results.fail': 'فشل',
    'error.noSpace': 'لا توجد مساحة كافية للقص. الصورة قريبة جدًا من الحواف. يرجى تحميل صورة بمساحة أكبر حول الوجه.',
    'error.noAttempts': 'لقد نفدت محاولاتك. يرجى شراء خطة للمتابعة.'
  }
};

// State
let currentLang = 'en';
let attempts = 3;
let uploadedImage = null;
let canvas, ctx;
let lines = {
  red: { y: 100, label: 'Top of head', color: 'red', dragging: false },
  blue: { y: 500, label: 'Bottom of chin', color: 'blue', dragging: false },
  green: { y: 250, label: 'Eye center', color: 'green', dragging: false, dashed: true },
  brown: { x: 300, label: 'Vertical center', color: 'brown', dragging: false, dashed: true, vertical: true }
};
let croppedImageData = null;

const ADMIN_IDS = [380950248, 375133882];
const CANVAS_SIZE = 600;

// Initialize
function init() {
  setupEventListeners();
  updateAttemptsDisplay();
}

function setupEventListeners() {
  // Language selection
  document.querySelectorAll('.lang-button').forEach(btn => {
    btn.addEventListener('click', () => selectLanguage(btn.dataset.lang));
  });

  // Upload button
  document.getElementById('upload-btn').addEventListener('click', () => {
    if (attempts <= 0 && !isAdmin()) {
      showError(translate('error.noAttempts'));
      return;
    }
    document.getElementById('file-input').click();
  });

  document.getElementById('file-input').addEventListener('change', handleFileUpload);

  // Menu items
  document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => showContent(item.dataset.menu));
  });

  // Modal
  document.getElementById('close-modal').addEventListener('click', closeModal);
  document.getElementById('start-check').addEventListener('click', startCheck);
  document.getElementById('download-btn').addEventListener('click', downloadPhoto);

  // Canvas events
  canvas = document.getElementById('photo-canvas');
  ctx = canvas.getContext('2d', { willReadFrequently: true });
  
  canvas.addEventListener('mousedown', handleMouseDown);
  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('mouseup', handleMouseUp);
  canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
  canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
  canvas.addEventListener('touchend', handleTouchEnd);
}

function selectLanguage(lang) {
  currentLang = lang;
  document.getElementById('splash-screen').classList.add('hidden');
  document.getElementById('main-app').classList.add('visible');
  
  if (lang === 'ar') {
    document.body.setAttribute('dir', 'rtl');
  } else {
    document.body.removeAttribute('dir');
  }
  
  updateTranslations();
}

function updateTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = translate(key);
  });
}

function translate(key) {
  return translations[currentLang][key] || translations['en'][key] || key;
}

function updateAttemptsDisplay() {
  document.getElementById('attempts-count').textContent = isAdmin() ? '∞' : attempts;
}

function isAdmin() {
  return false;
}

function showContent(menu) {
  document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('active'));
  document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
  
  document.querySelector(`[data-menu="${menu}"]`).classList.add('active');
  document.getElementById(`content-${menu}`).classList.add('active');
}

function handleFileUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    const img = new Image();
    img.onload = () => {
      uploadedImage = img;
      openPhotoModal();
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

function openPhotoModal() {
  document.getElementById('photo-modal').classList.add('visible');
  document.getElementById('results').classList.remove('visible');
  document.getElementById('error-container').innerHTML = '';
  
  canvas.width = CANVAS_SIZE;
  canvas.height = CANVAS_SIZE;
  
  // Calculate scale to fit uploaded image into canvas
  const scale = Math.min(CANVAS_SIZE / uploadedImage.width, CANVAS_SIZE / uploadedImage.height);
  const scaledWidth = uploadedImage.width * scale;
  const scaledHeight = uploadedImage.height * scale;
  const offsetX = (CANVAS_SIZE - scaledWidth) / 2;
  const offsetY = (CANVAS_SIZE - scaledHeight) / 2;
  
  // Store original image dimensions for calculations
  canvas.imageScale = scale;
  canvas.imageOffsetX = offsetX;
  canvas.imageOffsetY = offsetY;
  canvas.scaledWidth = scaledWidth;
  canvas.scaledHeight = scaledHeight;
  
  // Reset lines to default positions
  lines.red.y = 100;
  lines.blue.y = 500;
  lines.green.y = 250;
  lines.brown.x = CANVAS_SIZE / 2;
  
  drawCanvas();
}

function closeModal() {
  document.getElementById('photo-modal').classList.remove('visible');
}

function drawCanvas() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  
  // Draw image
  if (uploadedImage) {
    ctx.drawImage(
      uploadedImage,
      canvas.imageOffsetX,
      canvas.imageOffsetY,
      canvas.scaledWidth,
      canvas.scaledHeight
    );
  }
  
  // Draw lines
  Object.values(lines).forEach(line => {
    ctx.strokeStyle = line.color;
    ctx.lineWidth = 2;
    
    if (line.dashed) {
      ctx.setLineDash([5, 5]);
    } else {
      ctx.setLineDash([]);
    }
    
    ctx.beginPath();
    if (line.vertical) {
      ctx.moveTo(line.x, 0);
      ctx.lineTo(line.x, CANVAS_SIZE);
    } else {
      ctx.moveTo(0, line.y);
      ctx.lineTo(CANVAS_SIZE, line.y);
    }
    ctx.stroke();
  });
  
  ctx.setLineDash([]);
}

function handleMouseDown(e) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const x = (e.clientX - rect.left) * scaleX;
  const y = (e.clientY - rect.top) * scaleY;
  
  checkLineDrag(x, y, true);
}

function handleMouseMove(e) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const x = (e.clientX - rect.left) * scaleX;
  const y = (e.clientY - rect.top) * scaleY;
  
  if (lines.red.dragging) {
    lines.red.y = Math.max(0, Math.min(CANVAS_SIZE, y));
    drawCanvas();
  } else if (lines.blue.dragging) {
    lines.blue.y = Math.max(0, Math.min(CANVAS_SIZE, y));
    drawCanvas();
  } else if (lines.green.dragging) {
    lines.green.y = Math.max(0, Math.min(CANVAS_SIZE, y));
    drawCanvas();
  } else if (lines.brown.dragging) {
    lines.brown.x = Math.max(0, Math.min(CANVAS_SIZE, x));
    drawCanvas();
  } else {
    updateCursor(x, y);
  }
}

function handleMouseUp() {
  Object.values(lines).forEach(line => line.dragging = false);
}

function handleTouchStart(e) {
  e.preventDefault();
  const touch = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const x = (touch.clientX - rect.left) * scaleX;
  const y = (touch.clientY - rect.top) * scaleY;
  
  checkLineDrag(x, y, true);
}

function handleTouchMove(e) {
  e.preventDefault();
  const touch = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const x = (touch.clientX - rect.left) * scaleX;
  const y = (touch.clientY - rect.top) * scaleY;
  
  if (lines.red.dragging) {
    lines.red.y = Math.max(0, Math.min(CANVAS_SIZE, y));
    drawCanvas();
  } else if (lines.blue.dragging) {
    lines.blue.y = Math.max(0, Math.min(CANVAS_SIZE, y));
    drawCanvas();
  } else if (lines.green.dragging) {
    lines.green.y = Math.max(0, Math.min(CANVAS_SIZE, y));
    drawCanvas();
  } else if (lines.brown.dragging) {
    lines.brown.x = Math.max(0, Math.min(CANVAS_SIZE, x));
    drawCanvas();
  }
}

function handleTouchEnd() {
  Object.values(lines).forEach(line => line.dragging = false);
}

function checkLineDrag(x, y, setDragging) {
  const threshold = 10;
  
  if (Math.abs(y - lines.red.y) < threshold) {
    if (setDragging) lines.red.dragging = true;
    return true;
  }
  if (Math.abs(y - lines.blue.y) < threshold) {
    if (setDragging) lines.blue.dragging = true;
    return true;
  }
  if (Math.abs(y - lines.green.y) < threshold) {
    if (setDragging) lines.green.dragging = true;
    return true;
  }
  if (Math.abs(x - lines.brown.x) < threshold) {
    if (setDragging) lines.brown.dragging = true;
    return true;
  }
  
  return false;
}

function updateCursor(x, y) {
  if (checkLineDrag(x, y, false)) {
    canvas.style.cursor = 'move';
  } else {
    canvas.style.cursor = 'crosshair';
  }
}

function startCheck() {
  document.getElementById('error-container').innerHTML = '';
  
  // Calculate head height in pixels on the canvas
  const headHeightPixels = Math.abs(lines.blue.y - lines.red.y);
  
  // CRITICAL FIX: Check if there's enough space to crop
  if (headHeightPixels < 300) {
    showError(translate('error.noSpace'));
    return;
  }
  
  // Perform intelligent cropping
  const cropResult = performIntelligentCrop();
  
  if (!cropResult.success) {
    showError(cropResult.error);
    return;
  }
  
  croppedImageData = cropResult.imageData;
  
  // Analyze the cropped image
  const analysis = analyzePhoto(cropResult.analysisCanvas);
  
  // Decrement attempts
  if (!isAdmin()) {
    attempts--;
    updateAttemptsDisplay();
  }
  
  displayResults(analysis);
}

function performIntelligentCrop() {
  // Create a temporary canvas to work with the original image at full resolution
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d', { willReadFrequently: true });
  
  // Calculate the scaling factor from canvas coordinates to original image coordinates
  const canvasToImageScale = uploadedImage.height / canvas.scaledHeight;
  
  // Convert canvas line positions to original image coordinates
  const redYInImage = (lines.red.y - canvas.imageOffsetY) * canvasToImageScale;
  const blueYInImage = (lines.blue.y - canvas.imageOffsetY) * canvasToImageScale;
  const headHeightInImage = Math.abs(blueYInImage - redYInImage);
  
  // Calculate required scale for 60% head height (target 360px in 600px image)
  const targetHeadHeight = 360; // 60% of 600
  const requiredScale = targetHeadHeight / headHeightInImage;
  
  // CRITICAL FIX: If image is already ideal size (scale ~1.0), use simple pixel-based cropping
  if (requiredScale >= 0.95 && requiredScale <= 1.05) {
    // Image is already the right size - use direct pixel cropping
    return performSimpleCrop(tempCanvas, tempCtx, redYInImage, blueYInImage);
  }
  
  // Calculate scaled dimensions
  const scaledWidth = uploadedImage.width * requiredScale;
  const scaledHeight = uploadedImage.height * requiredScale;
  const scaledRedY = redYInImage * requiredScale;
  const scaledBlueY = blueYInImage * requiredScale;
  const scaledHeadHeight = Math.abs(scaledBlueY - scaledRedY);
  
  // Calculate crop region in scaled image
  const topOfHeadY = Math.min(scaledRedY, scaledBlueY);
  const marginAboveHead = (CANVAS_SIZE * 0.60 - scaledHeadHeight) / 2; // 60% head, 40% margin split
  const cropY = Math.max(0, topOfHeadY - marginAboveHead);
  const cropX = Math.max(0, (scaledWidth - CANVAS_SIZE) / 2);
  
  // Check if we have enough space after scaling
  if (cropY + CANVAS_SIZE > scaledHeight || cropX + CANVAS_SIZE > scaledWidth) {
    return {
      success: false,
      error: translate('error.noSpace')
    };
  }
  
  // Create scaled version of the image
  tempCanvas.width = scaledWidth;
  tempCanvas.height = scaledHeight;
  tempCtx.fillStyle = 'white';
  tempCtx.fillRect(0, 0, scaledWidth, scaledHeight);
  tempCtx.drawImage(uploadedImage, 0, 0, scaledWidth, scaledHeight);
  
  // Extract the 600x600 crop region
  const outputCanvas = document.createElement('canvas');
  outputCanvas.width = CANVAS_SIZE;
  outputCanvas.height = CANVAS_SIZE;
  const outputCtx = outputCanvas.getContext('2d', { willReadFrequently: true });
  
  outputCtx.fillStyle = 'white';
  outputCtx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  
  const croppedData = tempCtx.getImageData(cropX, cropY, CANVAS_SIZE, CANVAS_SIZE);
  outputCtx.putImageData(croppedData, 0, 0);
  
  return {
    success: true,
    imageData: outputCanvas.toDataURL('image/jpeg', 0.95),
    analysisCanvas: outputCanvas
  };
}

function performSimpleCrop(tempCanvas, tempCtx, redYInImage, blueYInImage) {
  // Simple crop for already ideal images - no scaling needed
  const headHeightInImage = Math.abs(blueYInImage - redYInImage);
  const topOfHeadY = Math.min(redYInImage, blueYInImage);
  
  // Calculate margins to center the head at 60% of image
  const marginAboveHead = (CANVAS_SIZE * 0.60 - headHeightInImage) / 2;
  const cropY = Math.max(0, topOfHeadY - marginAboveHead);
  const cropX = Math.max(0, (uploadedImage.width - CANVAS_SIZE) / 2);
  
  // Verify we have enough pixels to crop
  if (cropY + CANVAS_SIZE > uploadedImage.height || cropX + CANVAS_SIZE > uploadedImage.width) {
    return {
      success: false,
      error: translate('error.noSpace')
    };
  }
  
  // Direct pixel extraction - NO canvas transformations
  tempCanvas.width = CANVAS_SIZE;
  tempCanvas.height = CANVAS_SIZE;
  tempCtx.fillStyle = 'white';
  tempCtx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  
  // Draw the exact crop region from original image
  tempCtx.drawImage(
    uploadedImage,
    cropX, cropY, CANVAS_SIZE, CANVAS_SIZE,  // Source rectangle
    0, 0, CANVAS_SIZE, CANVAS_SIZE           // Destination rectangle
  );
  
  return {
    success: true,
    imageData: tempCanvas.toDataURL('image/jpeg', 0.95),
    analysisCanvas: tempCanvas
  };
}

function analyzePhoto(analysisCanvas) {
  const analysisCtx = analysisCanvas.getContext('2d', { willReadFrequently: true });
  const imageData = analysisCtx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  
  // Analyze head position in the final cropped image
  const headTop = findHeadTop(imageData);
  const headBottom = findHeadBottom(imageData);
  const headHeight = headBottom - headTop;
  const headPercent = (headHeight / CANVAS_SIZE) * 100;
  
  // Check head height (should be 50-69%)
  const headPass = headPercent >= 50 && headPercent <= 69;
  
  // Estimate eye position (approximately 1/3 from top of head)
  const eyeY = headTop + (headHeight * 0.33);
  const eyeFromBottom = CANVAS_SIZE - eyeY;
  const eyePercent = (eyeFromBottom / CANVAS_SIZE) * 100;
  
  // Check eye position (should be 56-69% from bottom)
  const eyePass = eyePercent >= 56 && eyePercent <= 69;
  
  // Check background uniformity (edges only)
  const bgPass = checkBackgroundUniformity(imageData);
  
  return {
    headPercent: headPercent.toFixed(1),
    headPass,
    eyePercent: eyePercent.toFixed(1),
    eyePass,
    bgPass,
    overallPass: headPass && eyePass && bgPass
  };
}

function findHeadTop(imageData) {
  const data = imageData.data;
  const width = imageData.width;
  const height = imageData.height;
  
  for (let y = 0; y < height; y++) {
    for (let x = width * 0.3; x < width * 0.7; x++) {
      const idx = (y * width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const brightness = (r + g + b) / 3;
      
      if (brightness < 200) {
        return y;
      }
    }
  }
  
  return 50;
}

function findHeadBottom(imageData) {
  const data = imageData.data;
  const width = imageData.width;
  const height = imageData.height;
  
  for (let y = height - 1; y >= 0; y--) {
    for (let x = width * 0.3; x < width * 0.7; x++) {
      const idx = (y * width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const brightness = (r + g + b) / 3;
      
      if (brightness < 200) {
        return y;
      }
    }
  }
  
  return height - 50;
}

function checkBackgroundUniformity(imageData) {
  const data = imageData.data;
  const width = imageData.width;
  const height = imageData.height;
  
  const edgePixels = [];
  const edgeWidth = 20;
  
  // Sample edges
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < edgeWidth; y++) {
      const idx = (y * width + x) * 4;
      edgePixels.push({ r: data[idx], g: data[idx + 1], b: data[idx + 2] });
    }
    for (let y = height - edgeWidth; y < height; y++) {
      const idx = (y * width + x) * 4;
      edgePixels.push({ r: data[idx], g: data[idx + 1], b: data[idx + 2] });
    }
  }
  
  for (let y = edgeWidth; y < height - edgeWidth; y++) {
    for (let x = 0; x < edgeWidth; x++) {
      const idx = (y * width + x) * 4;
      edgePixels.push({ r: data[idx], g: data[idx + 1], b: data[idx + 2] });
    }
    for (let x = width - edgeWidth; x < width; x++) {
      const idx = (y * width + x) * 4;
      edgePixels.push({ r: data[idx], g: data[idx + 1], b: data[idx + 2] });
    }
  }
  
  // Calculate average color
  const avgR = edgePixels.reduce((sum, p) => sum + p.r, 0) / edgePixels.length;
  const avgG = edgePixels.reduce((sum, p) => sum + p.g, 0) / edgePixels.length;
  const avgB = edgePixels.reduce((sum, p) => sum + p.b, 0) / edgePixels.length;
  
  // Check if background is light (white or light gray)
  const avgBrightness = (avgR + avgG + avgB) / 3;
  if (avgBrightness < 200) return false;
  
  // Check uniformity
  const threshold = 30;
  const uniform = edgePixels.filter(p => {
    return Math.abs(p.r - avgR) < threshold &&
           Math.abs(p.g - avgG) < threshold &&
           Math.abs(p.b - avgB) < threshold;
  }).length / edgePixels.length;
  
  return uniform > 0.8;
}

function displayResults(analysis) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.classList.add('visible');
  
  document.getElementById('result-head').innerHTML = `
    ${analysis.headPercent}% ${analysis.headPass ? '✅' : '❌'}
  `;
  document.getElementById('result-head').className = `result-value ${analysis.headPass ? 'pass' : 'fail'}`;
  
  document.getElementById('result-eyes').innerHTML = `
    ${analysis.eyePercent}% ${analysis.eyePass ? '✅' : '❌'}
  `;
  document.getElementById('result-eyes').className = `result-value ${analysis.eyePass ? 'pass' : 'fail'}`;
  
  document.getElementById('result-bg').innerHTML = `
    ${analysis.bgPass ? '✅' : '❌'}
  `;
  document.getElementById('result-bg').className = `result-value ${analysis.bgPass ? 'pass' : 'fail'}`;
  
  const statusDiv = document.getElementById('overall-status');
  statusDiv.textContent = analysis.overallPass ? translate('results.pass') : translate('results.fail');
  statusDiv.className = `overall-status ${analysis.overallPass ? 'pass' : 'fail'}`;
}

function downloadPhoto() {
  if (!croppedImageData) return;
  
  // Check if mobile share API is available
  if (navigator.share && navigator.canShare) {
    fetch(croppedImageData)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], 'dv-photo.jpg', { type: 'image/jpeg' });
        if (navigator.canShare({ files: [file] })) {
          return navigator.share({
            files: [file],
            title: 'DV Photo',
            text: 'My DV lottery photo'
          });
        }
      })
      .catch(err => {
        // Fallback to download
        downloadFallback();
      });
  } else {
    downloadFallback();
  }
}

function downloadFallback() {
  const link = document.createElement('a');
  link.download = 'dv-photo-600x600.jpg';
  link.href = croppedImageData;
  link.click();
}

function showError(message) {
  const errorContainer = document.getElementById('error-container');
  errorContainer.innerHTML = `<div class="error-message">${message}</div>`;
}

// Initialize app
init();