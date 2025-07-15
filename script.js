const imageUpload = document.getElementById('imageUpload');
const gridSizeSelect = document.getElementById('gridSizeSelect');
const puzzleModeSelect = document.getElementById('puzzleModeSelect');
const languageSelect = document.getElementById('languageSelect');
const themeSelect = document.getElementById('themeSelect');
const numberColorPicker = document.getElementById('numberColorPicker');
const shuffleButton = document.getElementById('shuffleButton');
const undoButton = document.getElementById('undoButton');
const resetButton = document.getElementById('resetButton');
const puzzleCanvas = document.getElementById('puzzleCanvas');
const ctx = puzzleCanvas.getContext('2d');
const messageBoxContainer = document.getElementById('messageBoxContainer');
const confirmationBoxContainer = document.getElementById('confirmationBoxContainer');
const moveCounterDisplay = document.getElementById('moveCounter');
const timerDisplay = document.getElementById('timerDisplay');
const solveStatusDisplay = document.getElementById('solveStatus');
const viewOriginalImageButton = document.getElementById('viewOriginalImageButton');
const originalImageDisplayContainer = document.getElementById('originalImageDisplayContainer');
const fullImageDisplay = document.getElementById('fullImageDisplay');
const backToPuzzleButton = document.getElementById('backToPuzzleButton');
const mainContent = document.getElementById('mainContent');
const replayButton = document.getElementById('replayButton');
const loadingOverlay = document.getElementById('loadingOverlay');
const loadingMessage = document.getElementById('loadingMessage');
const moveHistoryList = document.getElementById('moveHistoryList');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const confettiCanvas = document.getElementById('confettiCanvas');
const confettiCtx = confettiCanvas.getContext('2d');

// Player Statistics elements
const statTotalGames = document.getElementById('statTotalGames');
const statTotalTime = document.getElementById('statTotalTime');
const statTotalPiecesMoved = document.getElementById('statTotalPiecesMoved');

const statBestTime3x3 = document.getElementById('statBestTime3x3');
const statBestMoves3x3 = document.getElementById('statBestMoves3x3');
const statBestTime4x4 = document.getElementById('statBestTime4x4');
const statBestMoves4x4 = document.getElementById('statBestMoves4x4');
const statBestTime5x5 = document.getElementById('statBestTime5x5');
const statBestMoves5x5 = document.getElementById('statBestMoves5x5');
const statBestTime6x6 = document.getElementById('statBestTime6x6');
const statBestMoves6x6 = document.getElementById('statBestMoves6x6');
const statBestTime7x7 = document.getElementById('statBestTime7x7');
const statBestMoves7x7 = document.getElementById('statBestMoves7x7');
const statBestTime8x8 = document.getElementById('statBestTime8x8');
const statBestMoves8x8 = document.getElementById('statBestMoves8x8');
const statBestTime9x9 = document.getElementById('statBestTime9x9');
const statBestMoves9x9 = document.getElementById('statBestMoves9x9');
const statBestTime10x10 = document.getElementById('statBestTime10x10');
const statBestMoves10x10 = document.getElementById('statBestMoves10x10');

const statWorstTime3x3 = document.getElementById('statWorstTime3x3');
const statWorstMoves3x3 = document.getElementById('statWorstMoves3x3');
const statWorstTime4x4 = document.getElementById('statWorstTime4x4');
const statWorstMoves4x4 = document.getElementById('statWorstMoves4x4');
const statWorstTime5x5 = document.getElementById('statWorstMoves5x5');
const statWorstMoves5x5 = document.getElementById('statWorstMoves5x5');
const statWorstTime6x6 = document.getElementById('statWorstTime6x6');
const statWorstMoves6x6 = document.getElementById('statWorstMoves6x6');
const statWorstTime7x7 = document.getElementById('statWorstTime7x7');
const statWorstMoves7x7 = document.getElementById('statWorstMoves7x7');
const statWorstTime8x8 = document.getElementById('statWorstTime8x8');
const statWorstMoves8x8 = document.getElementById('statWorstMoves8x8');
const statWorstTime9x9 = document.getElementById('statWorstTime9x9');
const statWorstMoves9x9 = document.getElementById('statWorstMoves9x9');
const statWorstTime10x10 = document.getElementById('statWorstTime10x10');
const statWorstMoves10x10 = document.getElementById('statWorstMoves10x10');

// New elements for stats filtering
const statsGridSizeFilter = document.getElementById('statsGridSizeFilter');
const detailedStatsList = document.getElementById('detailedStatsList');
const detailedStatsListWorst = document.getElementById('detailedStatsListWorst'); // New container for worst stats

// Cropper elements
const imageCropperContainer = document.getElementById('imageCropperContainer');
const cropperCanvas = document.getElementById('cropperCanvas');
const cropperCtx = cropperCanvas.getContext('2d');
const confirmCropButton = document.getElementById('confirmCropButton');
const cancelCropButton = document.getElementById('cancelCropButton');

// Moves Per Time Graph elements
const movesPerTimeGraphSVG = document.getElementById('movesPerTimeGraphSVG');
const movesPerTimeGraphContainer = document.getElementById('movesPerTimeGraphContainer');

// Directional Moves Graph elements
const directionalMovesGraphSVG = document.getElementById('directionalMovesGraphSVG');
const directionalMovesGraphContainer = document.getElementById('directionalMovesGraphContainer');

// Sample image elements
const sampleImageContainers = document.querySelectorAll('.sample-image-container');
let originalImage = new Image();
// Set crossOrigin for the originalImage object to handle CORS for images from external sources
originalImage.crossOrigin = 'Anonymous'; 
let puzzlePieces = [];
let gridSize = parseInt(gridSizeSelect.value);
let currentPuzzleMode = puzzleModeSelect.value;
let currentLanguage = 'id'; // Default to Indonesia
let currentTheme = 'light';
let numberColor = numberColorPicker.value;
const fixedCanvasSize = 1080;
let pieceWidth;
let pieceHeight;
let blankPieceIndex;
let isShuffled = false;
let puzzleReady = false;
let moves = 0;
let isProcessingClick = false;
let solving = false; 
let shuffling = false;
let undoStack = [];
const maxUndoStates = 50;

let startTime;
let timerInterval;
let hasMadeFirstMove = false;
const animationDuration = 200;

let hoveredPieceIndex = -1;
let currentBase64Image = '';

// Cropping variables
let cropRect = { x: 0, y: 0, size: 0 };
let isDragging = false;
let isResizing = false;
let dragStartX, dragStartY;
const resizeHandleSize = 10;

// Source dimensions for puzzle pieces after cropping
let finalSourceX = 0;
let finalSourceY = 0;
let finalSourceWidth = 0;
let finalSourceHeight = 0;

// Replay variables
let replayMoves = [];
let initialShuffledStateForReplay = [];
let isReplaying = false;

let moveHistory = []; // Stores { text: "...", direction: "...", timestamp: "00:00" }
const maxMoveHistory = 10;

// Moves per time graph data
let movesPerIntervalData = [];
const graphUpdateInterval = 5; // seconds
let lastRecordedTotalMoves = 0;
let lastGraphUpdateTime = 0;

// Directional Moves Count
let directionalMovesCount = {
    'Up': 0,
    'Down': 0,
    'Left': 0,
    'Right': 0
};
const directions = ['Up', 'Down', 'Left', 'Right']; // For easy iteration

// Player Statistics Object
let playerStats = {
    totalGamesPlayed: 0,
    totalTimePlayedSeconds: 0,
    totalPiecesMoved: 0,
    bestTimes: { '3': Infinity, '4': Infinity, '5': Infinity, '6': Infinity, '7': Infinity, '8': Infinity, '9': Infinity, '10': Infinity },
    bestMoves: { '3': Infinity, '4': Infinity, '5': Infinity, '6': Infinity, '7': Infinity, '8': Infinity, '9': Infinity, '10': Infinity },
    worstTimes: { '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0 },
    worstMoves: { '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0 }
};
let currentStatsView = '3'; // Default to 3x3 for stats view filter

// Confetti particles array
let confettiParticles = [];
let confettiAnimationId = null;

// =====================================================================
// Language Translations
// =====================================================================
const translations = {
    en: {
        mainTitle: "Interactive Sliding Puzzle",
        selectLanguage: "Select Language:",
        selectTheme: "Select Theme:",
        lightTheme: "Light",
        darkTheme: "Dark",
        uploadPhoto: "Upload Your Photo:",
        orSelectSample: "Or Select a Sample Image:",
        selectPuzzleSize: "Select Puzzle Size:",
        selectPuzzleMode: "Select Puzzle Mode:",
        numberColor: "Number Color:",
        numberColorHint: "Choose a color for the numbers on puzzle pieces.",
        slidingPuzzle: "Sliding Puzzle (Default)",
        jigsaw: "Jigsaw (No Numbers)",
        moves: "Moves",
        time: "Time",
        shuffle: "Shuffle",
        undo: "Undo",
        resetPuzzle: "Reset Puzzle",
        promoText: "Come play sliding puzzle at:", // New translation for promo
        viewOriginalImage: "View Original Image",
        replayMoves: "Replay Moves",
        clickHint: "Click a piece adjacent to the empty space to move it.",
        moveHistoryTitle: "Your Move History:",
        noMovesYet: "No moves yet.",
        backToPuzzle: "Back to Puzzle",
        cropAreaTitle: "Select Puzzle Area",
        confirmCrop: "Confirm Crop",
        cancel: "Cancel",
        loading: "Loading...",
        loadingImage: "Loading image...",
        loadingSampleImage: "Loading sample image...",
        failedLoadImage: "Failed to load image. Please ensure it's a valid image file.",
        failedLoadSampleImage: "Failed to load sample image. Please try again or upload your own image.",
        shufflingPuzzle: "Shuffling puzzle...",
        shuffleFail: (attempts) => `Failed to find a solvable puzzle after ${attempts} attempts. Try shuffling again.`,
        noUndo: "No moves to undo.",
        confirmReset: "Are you sure you want to reset the puzzle? Your progress will be lost.",
        uploadImageFirst: "Please upload an image first.",
        noReplayMoves: "No moves to replay.",
        replayFinished: "Replay finished.",
        puzzleSolved: (moves, time) => `Congratulations! Puzzle solved in ${moves} moves and ${time}!`,
        cropCancelled: "Cropping cancelled. Please upload or select another image.",
        noImageLoaded: "No image loaded to display.",
        pieceMoved: (pieceNumber, direction, timestamp) => `Piece ${pieceNumber} moved ${direction} (${timestamp})`,
        directionRight: "Right",
        directionLeft: "Left",
        directionDown: "Down",
        directionUp: "Up",
        playerStatsTitle: "Player Statistics:",
        totalGamesPlayed: "Total Games Played",
        totalTimePlayed: "Total Time Played",
        totalPiecesMoved: "Total Pieces Moved",
        bestStats: "Best Statistics:",
        bestTime3x3: "Best Time (3x3)",
        bestMoves3x3: "Best Moves (3x3)",
        bestTime4x4: "Best Time (4x4)",
        bestMoves4x4: "Best Moves (4x4)",
        bestTime5x5: "Best Time (5x5)",
        bestMoves5x5: "Best Moves (5x5)",
        bestTime6x6: "Best Time (6x6)",
        bestMoves6x6: "Best Moves (6x6)",
        bestTime7x7: "Best Time (7x7)",
        bestMoves7x7: "Best Moves (7x7)",
        bestTime8x8: "Best Time (8x8)",
        bestMoves8x8: "Best Moves (8x8)",
        bestTime9x9: "Best Time (9x9)",
        bestMoves9x9: "Best Moves (9x9)",
        bestTime10x10: "Best Time (10x10)",
        bestMoves10x10: "Best Moves (10x10)",
        worstStats: "Worst Statistics:",
        worstTime3x3: "Worst Time (3x3)",
        worstMoves3x3: "Worst Moves (3x3)",
        worstTime4x4: "Worst Time (4x4)",
        worstMoves4x4: "Worst Moves (4x4)",
        worstTime5x5: "Worst Time (5x5)",
        worstMoves5x5: "Worst Moves (5x5)",
        worstTime6x6: "Worst Time (6x6)",
        worstMoves6x6: "Worst Moves (6x6)",
        worstTime7x7: "Worst Time (7x7)",
        worstMoves7x7: "Worst Moves (7x7)",
        worstTime8x8: "Worst Time (8x8)",
        worstMoves8x8: "Worst Moves (8x8)",
        worstTime9x9: "Worst Time (9x9)",
        worstMoves9x9: "Worst Moves (9x9)",
        worstTime10x10: "Worst Time (10x10)",
        worstMoves10x10: "Worst Moves (10x10)",
        movesPerTimeGraphTitle: "Moves Per Time Interval:",
        directionalMovesGraphTitle: "Directional Moves Distribution:",
        notApplicable: "--",
        puzzleNotShuffled: "The puzzle is not shuffled yet. Please click 'Shuffle' to begin.",
        viewStatsFor: "View Stats For:",
        allSizes: "Show All",
        size3x3: "3x3",
        size4x4: "4x4",
        size5x5: "5x5",
        size6x6: "6x6",
        size7x7: "7x7",
        size8x8: "8x8",
        size9x9: "9x9",
        size10x10: "10x10",
    },
    id: {
        mainTitle: "Sliding Puzzle Interaktif",
        selectLanguage: "Pilih Bahasa:",
        selectTheme: "Pilih Tema:",
        lightTheme: "Terang",
        darkTheme: "Gelap",
        uploadPhoto: "Unggah Foto Anda:",
        orSelectSample: "Atau Pilih Gambar Contoh:",
        selectPuzzleSize: "Pilih Ukuran Puzzle:",
        selectPuzzleMode: "Pilih Mode Puzzle:",
        numberColor: "Warna Angka:",
        numberColorHint: "Pilih warna untuk angka pada potongan puzzle.",
        slidingPuzzle: "Sliding Puzzle (Default)",
        jigsaw: "Jigsaw (Tanpa Nomor)",
        moves: "Gerakan",
        time: "Waktu",
        shuffle: "Acak",
        undo: "Urungkan",
        resetPuzzle: "Reset Puzzle",
        promoText: "Ayo bermain sliding puzzle di:", // New translation for promo
        viewOriginalImage: "Lihat Gambar Asli",
        replayMoves: "Putar Ulang Gerakan",
        clickHint: "Klik potongan yang berdekatan dengan tempat kosong untuk memindahkannya.",
        moveHistoryTitle: "Riwayat Gerakan Anda:",
        noMovesYet: "Belum ada gerakan.",
        backToPuzzle: "Kembali ke Puzzle",
        cropAreaTitle: "Pilih Area Puzzle",
        confirmCrop: "Konfirmasi Potongan",
        cancel: "Batal",
        loading: "Memuat...",
        loadingImage: "Memuat gambar...",
        loadingSampleImage: "Memuat gambar contoh...",
        failedLoadImage: "Gagal memuat gambar. Pastikan ini adalah file gambar yang valid.",
        failedLoadSampleImage: "Gagal memuat gambar contoh. Silakan coba lagi atau unggah gambar Anda sendiri.",
        shufflingPuzzle: "Mengacak puzzle...",
        shuffleFail: (attempts) => `Gagal menemukan puzzle yang dapat dipecahkan setelah ${attempts} percobaan. Coba acak ulang.`,
        noUndo: "Tidak ada gerakan untuk di-undo.",
        confirmReset: "Apakah Anda yakin ingin mereset puzzle? Progres Anda akan hilang.",
        uploadImageFirst: "Silakan unggah gambar terlebih dahulu.",
        noReplayMoves: "Tidak ada gerakan untuk diputar ulang.",
        replayFinished: "Pemutaran ulang selesai.",
        puzzleSolved: (moves, time) => `Selamat! Puzzle telah selesai dalam ${moves} gerakan dan waktu ${time}!`,
        cropCancelled: "Pemotongan dibatalkan. Silakan unggah atau pilih gambar lain.",
        noImageLoaded: "Tidak ada gambar yang dimuat untuk ditampilkan.",
        pieceMoved: (pieceNumber, direction, timestamp) => `Potongan ${pieceNumber} bergerak ${direction} (${timestamp})`,
        directionRight: "Kanan",
        directionLeft: "Kiri",
        directionDown: "Bawah",
        directionUp: "Atas",
        playerStatsTitle: "Statistik Pemain:",
        totalGamesPlayed: "Total Game Dimainkan",
        totalTimePlayed: "Total Waktu Bermain",
        totalPiecesMoved: "Total Potongan Dipindahkan",
        bestStats: "Statistik Terbaik:",
        bestTime3x3: "Waktu Terbaik (3x3)",
        bestMoves3x3: "Gerakan Terbaik (3x3)",
        bestTime4x4: "Waktu Terbaik (4x4)",
        bestMoves4x4: "Gerakan Terbaik (4x4)",
        bestTime5x5: "Waktu Terbaik (5x5)",
        bestMoves5x5: "Gerakan Terbaik (5x5)",
        bestTime6x6: "Waktu Terbaik (6x6)",
        bestMoves6x6: "Gerakan Terbaik (6x6)",
        bestTime7x7: "Waktu Terbaik (7x7)",
        bestMoves7x7: "Gerakan Terbaik (7x7)",
        bestTime8x8: "Waktu Terbaik (8x8)",
        bestMoves8x8: "Gerakan Terbaik (8x8)",
        bestTime9x9: "Waktu Terbaik (9x9)",
        bestMoves9x9: "Gerakan Terbaik (9x9)",
        bestTime10x10: "Waktu Terbaik (10x10)",
        bestMoves10x10: "Gerakan Terbaik (10x10)",
        worstStats: "Statistik Terlama:",
        worstTime3x3: "Waktu Terlama (3x3)",
        worstMoves3x3: "Gerakan Terlama (3x3)",
        worstTime4x4: "Waktu Terlama (4x4)",
        worstMoves4x4: "Gerakan Terlama (4x4)",
        worstTime5x5: "Waktu Terlama (5x5)",
        worstMoves5x5: "Gerakan Terlama (5x5)",
        worstTime6x6: "Waktu Terlama (6x6)",
        worstMoves6x6: "Gerakan Terlama (6x6)",
        worstTime7x7: "Waktu Terlama (7x7)",
        worstMoves7x7: "Gerakan Terlama (7x7)",
        worstTime8x8: "Waktu Terlama (8x8)",
        worstMoves8x8: "Gerakan Terlama (8x8)",
        worstTime9x9: "Waktu Terlama (9x9)",
        worstMoves9x9: "Gerakan Terlama (9x9)",
        worstTime10x10: "Waktu Terlama (10x10)",
        worstMoves10x10: "Gerakan Terlama (10x10)",
        movesPerTimeGraphTitle: "Gerakan per Interval Waktu:",
        directionalMovesGraphTitle: "Distribusi Arah Gerakan:",
        notApplicable: "--",
        puzzleNotShuffled: "Puzzle belum diacak. Silakan klik 'Acak' untuk memulai.",
        viewStatsFor: "Lihat Statistik Untuk:",
        allSizes: "Tampilkan Semua",
        size3x3: "3x3",
        size4x4: "4x4",
        size5x5: "5x5",
        size6x6: "6x6",
        size7x7: "7x7",
        size8x8: "8x8",
        size9x9: "9x9",
        size10x10: "10x10",
    },
    zh: {
        mainTitle: "互动滑块拼图",
        selectLanguage: "选择语言:",
        selectTheme: "选择主题:",
        lightTheme: "明亮",
        darkTheme: "黑暗",
        uploadPhoto: "上传您的照片:",
        orSelectSample: "或选择示例图片:",
        selectPuzzleSize: "选择拼图大小:",
        selectPuzzleMode: "选择拼图模式:",
        numberColor: "数字颜色:",
        numberColorHint: "选择拼图块上数字的颜色。",
        slidingPuzzle: "滑块拼图（默认）",
        jigsaw: "拼图（无数字）",
        moves: "步数",
        time: "时间",
        shuffle: "打乱",
        undo: "撤销",
        resetPuzzle: "重置拼图",
        promoText: "来玩滑块拼图：", // New translation for promo
        viewOriginalImage: "查看原始图片",
        replayMoves: "重放步数",
        clickHint: "点击空白区域旁边的方块来移动它。",
        moveHistoryTitle: "您的移动历史:",
        noMovesYet: "暂无移动。",
        backToPuzzle: "返回拼图",
        cropAreaTitle: "选择拼图区域",
        confirmCrop: "确认裁剪",
        cancel: "取消",
        loading: "加载中...",
        loadingImage: "正在加载图片...",
        loadingSampleImage: "正在加载示例图片...",
        failedLoadImage: "加载图片失败。请确保它是有效的图片文件。",
        failedLoadSampleImage: "加载示例图片失败。请重试或上传您自己的图片。",
        shufflingPuzzle: "正在打乱拼图...",
        shuffleFail: (attempts) => `尝试 ${attempts} 次后未能找到可解的拼图。请再试一次打乱。`,
        noUndo: "没有可撤销的移动。",
        confirmReset: "您确定要重置拼图吗？您的进度将丢失。",
        uploadImageFirst: "请先上传一张图片。",
        noReplayMoves: "没有可重放的移动。",
        replayFinished: "重放完成。",
        puzzleSolved: (moves, time) => `恭喜！拼图在 ${moves} 步和 ${time} 内解决！`,
        cropCancelled: "裁剪已取消。请上传或选择其他图片。",
        noImageLoaded: "未加载图片以显示。",
        pieceMoved: (pieceNumber, direction, timestamp) => `方块 ${pieceNumber} 向 ${direction} 移动 (${timestamp})`,
        directionRight: "右",
        directionLeft: "左",
        directionDown: "下",
        directionUp: "上",
        playerStatsTitle: "玩家统计:",
        totalGamesPlayed: "总游戏次数",
        totalTimePlayed: "总游戏时间",
        totalPiecesMoved: "总移动方块数",
        bestStats: "最佳统计:",
        bestTime3x3: "最佳时间 (3x3)",
        bestMoves3x3: "最佳步数 (3x3)",
        bestTime4x4: "最佳时间 (4x4)",
        bestMoves4x4: "最佳步数 (4x4)",
        bestTime5x5: "最佳时间 (5x5)",
        bestMoves5x5: "最佳步数 (5x5)",
        bestTime6x6: "最佳时间 (6x6)",
        bestMoves6x6: "最佳步数 (6x6)",
        bestTime7x7: "最佳时间 (7x7)",
        bestMoves7x7: "最佳步数 (7x7)",
        bestTime8x8: "最佳时间 (8x8)",
        bestMoves8x8: "最佳步数 (8x8)",
        bestTime9x9: "最佳时间 (9x9)",
        bestMoves9x9: "最佳步数 (9x9)",
        bestTime10x10: "最佳时间 (10x10)",
        bestMoves10x10: "最佳步数 (10x10)",
        worstStats: "最差统计:",
        worstTime3x3: "最差时间 (3x3)",
        worstMoves3x3: "最差步数 (3x3)",
        worstTime4x4: "最差时间 (4x4)",
        worstMoves4x4: "最差步数 (4x4)",
        worstTime5x5: "最差时间 (5x5)",
        worstMoves5x5: "最差步数 (5x5)",
        worstTime6x6: "最差时间 (6x6)",
        worstMoves6x6: "最差步数 (6x6)",
        worstTime7x7: "最差时间 (7x7)",
        worstMoves7x7: "最差步数 (7x7)",
        worstTime8x8: "最差时间 (8x8)",
        worstMoves8x8: "最差步数 (8x8)",
        worstTime9x9: "最差时间 (9x9)",
        worstMoves9x9: "最差步数 (9x9)",
        worstTime10x10: "最差时间 (10x10)",
        worstMoves10x10: "最差步数 (10x10)",
        movesPerTimeGraphTitle: "每时间间隔移动次数:",
        directionalMovesGraphTitle: "方向移动分布:",
        notApplicable: "--",
        puzzleNotShuffled: "拼图尚未打乱。请点击“打乱”开始。",
        viewStatsFor: "查看统计:",
        allSizes: "显示所有",
        size3x3: "3x3",
        size4x4: "4x4",
        size5x5: "5x5",
        size6x6: "6x6",
        size7x7: "7x7",
        size8x8: "8x8",
        size9x9: "9x9",
        size10x10: "10x10",
    }
};

// =====================================================================
// Function to update all text content based on current language
// =====================================================================
function updateTextContent() {
    const elements = document.querySelectorAll('[data-key]');
    elements.forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[currentLanguage][key]) {
            if (typeof translations[currentLanguage][key] === 'function') {
                element.textContent = key; 
            } else {
                element.textContent = translations[currentLanguage][key];
            }
        }
    });

    // Specific updates for select options
    document.getElementById('puzzleModeSelect').querySelector('option[value="sliding"]').textContent = translations[currentLanguage].slidingPuzzle;
    document.getElementById('puzzleModeSelect').querySelector('option[value="jigsaw"]').textContent = translations[currentLanguage].jigsaw;
    
    document.getElementById('themeSelect').querySelector('option[value="light"]').textContent = translations[currentLanguage].lightTheme;
    document.getElementById('themeSelect').querySelector('option[value="dark"]').textContent = translations[currentLanguage].darkTheme;

    // Update stats filter options
    document.getElementById('statsGridSizeFilter').querySelector('option[value="all"]').textContent = translations[currentLanguage].allSizes;
    for (let i = 3; i <= 10; i++) {
        const option = document.getElementById('statsGridSizeFilter').querySelector(`option[value="${i}"]`);
        if (option) {
            option.textContent = translations[currentLanguage][`size${i}x${i}`];
        }
    }

    // Update promo text
    document.querySelector('#websitePromo p[data-key="promoText"]').textContent = translations[currentLanguage].promoText;

    // Update placeholder text for image upload
    const placeholderText = translations[currentLanguage].uploadPhoto.replace(':', '') + `\n(${gridSize}x${gridSize})`;
    const placeholderSize = fixedCanvasSize;
    // Ensure crossOrigin is set for placeholder image as well
    originalImage.crossOrigin = 'Anonymous'; 
    originalImage.src = `https://placehold.co/${placeholderSize}x${placeholderSize}/e0e7ff/4f46e5?text=${encodeURIComponent(placeholderText)}`;
    
    renderMoveHistory();
    updatePlayerStatisticsDisplay();
    drawMovesPerTimeGraph();
    drawDirectionalMovesGraph(); 
}

// =====================================================================
// Handle Language Selection Change (with Local Storage)
// =====================================================================
languageSelect.addEventListener('change', (event) => {
    currentLanguage = event.target.value;
    savePreferences();
    updateTextContent();
});

// =====================================================================
// Handle Theme Selection Change (with Local Storage)
// =====================================================================
themeSelect.addEventListener('change', (event) => {
    currentTheme = event.target.value;
    applyTheme(currentTheme);
    savePreferences();
    if (puzzleReady) {
        drawPuzzle();
    }
    drawMovesPerTimeGraph();
    drawDirectionalMovesGraph(); 
});

// Function to apply theme to the body
function applyTheme(theme) {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${theme}-theme`);
}

// =====================================================================
// Handle Number Color Picker Change (with Local Storage)
// =====================================================================
numberColorPicker.addEventListener('input', (event) => {
    numberColor = event.target.value;
    savePreferences();
    if (puzzleReady) {
        drawPuzzle(); // Redraw puzzle with new number color
    }
});

// =====================================================================
// Utility function for notifications (replaces alert())
// =====================================================================
function showMessageBox(messageKey, ...args) {
    const message = typeof translations[currentLanguage][messageKey] === 'function' 
                    ? translations[currentLanguage][messageKey](...args) 
                    : translations[currentLanguage][messageKey];

    const messageBox = document.createElement('div');
    messageBox.className = 'message-box';
    messageBox.innerHTML = `
        <p class="text-xl font-semibold mb-4">${message}</p>
        <button id="closeMessageBox" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300">Oke</button>
    `;
    const overlay = document.createElement('div');
    overlay.className = 'overlay';

    messageBoxContainer.appendChild(overlay);
    messageBoxContainer.appendChild(messageBox);

    document.getElementById('closeMessageBox').onclick = () => {
        messageBoxContainer.innerHTML = '';
    };
}

// =====================================================================
// Custom Confirmation Box
// =====================================================================
function showConfirmationBox(messageKey, onConfirmCallback) {
    const message = translations[currentLanguage][messageKey];
    const confirmationBox = document.createElement('div');
    confirmationBox.className = 'confirmation-box';
    confirmationBox.innerHTML = `
        <p class="text-xl font-semibold mb-6">${message}</p>
        <div class="flex justify-center gap-4">
            <button id="confirmButton" class="btn-green-solve text-white font-semibold py-2 px-4 rounded-md transition duration-300">${translations[currentLanguage].confirmCrop}</button>
            <button id="cancelButton" class="btn-gray text-white font-semibold py-2 px-4 rounded-md transition duration-300">${translations[currentLanguage].cancel}</button>
        </div>
    `;
    const overlay = document.createElement('div');
    overlay.className = 'overlay';

    confirmationBoxContainer.appendChild(overlay);
    confirmationBoxContainer.appendChild(confirmationBox);

    document.getElementById('confirmButton').onclick = () => {
        confirmationBoxContainer.innerHTML = '';
        onConfirmCallback();
    };
    document.getElementById('cancelButton').onclick = () => {
        confirmationBoxContainer.innerHTML = '';
    };
}

// =====================================================================
// Loading Indicator Functions
// =====================================================================
function showLoading(messageKey) {
    loadingMessage.textContent = translations[currentLanguage][messageKey];
    loadingOverlay.style.display = 'flex';
}

function hideLoading() {
    loadingOverlay.style.display = 'none';
}

// =====================================================================
// Function to check puzzle solvability
// =====================================================================
function isPuzzleSolvable(piecesArray, currentGridSize) {
    const currentOrder = Array(currentGridSize * currentGridSize).fill(0);
    const piecePositions = new Map();
    
    piecesArray.forEach(p => {
        const col = Math.round(p.currentX / pieceWidth);
        const row = Math.round(p.currentY / pieceHeight);
        const index = row * currentGridSize + col;
        currentOrder[index] = p.id;
        piecePositions.set(p.id, index);
    });
    const blankPiece = piecesArray.find(p => p.isBlank);
    const blankIndex = piecePositions.get(blankPiece.id);
    const blankRowFromTop = Math.floor(blankIndex / currentGridSize);
    const flatState = currentOrder.filter(id => id !== blankPiece.id);
    let inversions = 0;
    for (let i = 0; i < flatState.length - 1; i++) {
        for (let j = i + 1; j < flatState.length; j++) {
            if (flatState[i] > flatState[j]) {
                inversions++;
            }
        }
    }

    if (currentGridSize % 2 === 1) {
        return inversions % 2 === 0;
    } else {
        const blankRowFromBottom = currentGridSize - blankRowFromTop;
        if (blankRowFromBottom % 2 === 1) {
            return inversions % 2 === 0;
        } else {
            return inversions % 2 === 1;
        }
    }
}


// =====================================================================
// Handle Image Upload
// =====================================================================
imageUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        showLoading("loadingImage");
        const reader = new FileReader();
        reader.onload = (e) => {
            // Set crossOrigin before setting src for uploaded images too
            originalImage.crossOrigin = 'Anonymous'; 
            originalImage.onload = async () => {
                hideLoading();
                if (originalImage.width === originalImage.height) {
                    initializePuzzle(0, 0, originalImage.width, originalImage.height);
                    await instantShuffle(); 
                } else {
                    setupCroppingInterface();
                }
            };
            originalImage.onerror = () => {
                hideLoading();
                showMessageBox("failedLoadImage");
                enableAllButtons();
            };
            originalImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});
// =====================================================================
// Handle Sample Image Selection
// =====================================================================
sampleImageContainers.forEach(container => {
    container.addEventListener('click', async (event) => {
        const imageUrl = container.dataset.src;
        if (!imageUrl) return;

        if (shuffling || isProcessingClick || isReplaying) return; 

        showLoading("loadingSampleImage");
        disableAllButtons();

        // Set crossOrigin before setting src for sample images
        originalImage.crossOrigin = 'Anonymous'; 
        originalImage.onload = async () => {
            hideLoading();
            if (originalImage.width === originalImage.height) {
                initializePuzzle(0, 0, originalImage.width, originalImage.height);
                await instantShuffle(); 
            } else {
                setupCroppingInterface();
            }
        };
        originalImage.onerror = () => {
            hideLoading();
            showMessageBox("failedLoadSampleImage");
            enableAllButtons();
        };
        originalImage.src = imageUrl;
    });
});


// =====================================================================
// Handle Grid Size and Puzzle Mode Changes (with Local Storage)
// =====================================================================
gridSizeSelect.addEventListener('change', async (event) => {
    gridSize = parseInt(event.target.value);
    savePreferences();
    if (puzzleReady) {
        initializePuzzle(finalSourceX, finalSourceY, finalSourceWidth, finalSourceHeight);
        await instantShuffle(); 
    } else {
        const placeholderText = translations[currentLanguage].uploadPhoto.replace(':', '') + `\n(${gridSize}x${gridSize})`;
        const placeholderSize = fixedCanvasSize;
        // Ensure crossOrigin is set for placeholder image as well
        originalImage.crossOrigin = 'Anonymous'; 
        originalImage.src = `https://placehold.co/${placeholderSize}x${placeholderSize}/e0e7ff/4f46e5?text=${encodeURIComponent(placeholderText)}`;
    }
});

puzzleModeSelect.addEventListener('change', async (event) => {
    currentPuzzleMode = event.target.value;
    savePreferences();
    if (puzzleReady) {
        initializePuzzle(finalSourceX, finalSourceY, finalSourceWidth, finalSourceHeight);
        await instantShuffle(); 
    } else {
        drawPuzzle();
    }
});

// =====================================================================
// Initialize Puzzle (Adapts image to 1:1, sets up pieces)
// =====================================================================
function initializePuzzle(srcX, srcY, srcW, srcH) {
    finalSourceX = srcX;
    finalSourceY = srcY;
    finalSourceWidth = srcW;
    finalSourceHeight = srcH;

    puzzleCanvas.width = fixedCanvasSize;
    puzzleCanvas.height = fixedCanvasSize;
    confettiCanvas.width = fixedCanvasSize;
    confettiCanvas.height = fixedCanvasSize;

    pieceWidth = puzzleCanvas.width / gridSize;
    pieceHeight = puzzleCanvas.height / gridSize;

    puzzlePieces = [];
    const totalPieces = gridSize * gridSize;
    for (let i = 0; i < totalPieces; i++) {
        puzzlePieces.push({
            id: i,
            originalIndex: i,
            currentX: (i % gridSize) * pieceWidth,
            currentY: Math.floor(i / gridSize) * pieceHeight,
            sourceX: srcX + (srcW / gridSize) * (i % gridSize),
            sourceY: srcY + (srcH / gridSize) * Math.floor(i / gridSize),
            sourceWidth: srcW / gridSize,
            sourceHeight: srcH / gridSize,
            isBlank: false
        });
    }
    blankPieceIndex = totalPieces - 1;
    puzzlePieces[blankPieceIndex].isBlank = true;
    isShuffled = false;
    moves = 0;
    undoStack = [];
    replayMoves = [];
    initialShuffledStateForReplay = [];
    replayButton.style.display = 'none';
    moveHistory = [];
    movesPerIntervalData = [];
    lastRecordedTotalMoves = 0;
    lastGraphUpdateTime = 0;
    directionalMovesCount = { 'Up': 0, 'Down': 0, 'Left': 0, 'Right': 0 }; // Reset directional moves
    renderMoveHistory();
    updateMoveCounter();
    stopTimer();
    timerDisplay.textContent = '00:00';
    hasMadeFirstMove = false;
    drawPuzzle();
    updateProgressIndicator();
    hoveredPieceIndex = -1;

    puzzleCanvas.classList.remove('puzzle-solved-animation');
    solveStatusDisplay.textContent = '';
    stopConfetti();

    puzzleReady = true;
    enableAllButtons();

    // The toDataURL call that was causing the error. 
    // It should now work because originalImage.crossOrigin is set.
    currentBase64Image = puzzleCanvas.toDataURL('image/png'); 
    drawMovesPerTimeGraph();
    drawDirectionalMovesGraph(); // Initialize new graph
}

// =====================================================================
// Recalculate piece positions and redraw (used for resize without resetting state)
// =====================================================================
function recalculatePiecePositionsAndRedraw() {
    if (!puzzleReady) return;

    puzzleCanvas.width = fixedCanvasSize;
    puzzleCanvas.height = fixedCanvasSize;
    confettiCanvas.width = fixedCanvasSize;
    confettiCanvas.height = fixedCanvasSize;

    pieceWidth = puzzleCanvas.width / gridSize;
    pieceHeight = puzzleCanvas.height / gridSize;

    puzzlePieces.forEach((piece, index) => {
        piece.currentX = (index % gridSize) * pieceWidth;
        piece.currentY = Math.floor(index / gridSize) * pieceHeight;
    });

    drawPuzzle();
    updateProgressIndicator();
    drawMovesPerTimeGraph();
    drawDirectionalMovesGraph(); // Redraw new graph on resize
}

// =====================================================================
// Draw Puzzle on Canvas
// =====================================================================
function drawPuzzle() {
    ctx.clearRect(0, 0, puzzleCanvas.width, puzzleCanvas.height);
    puzzlePieces.forEach(piece => {
        if (!piece.isBlank) {
            ctx.drawImage(
                originalImage,
                piece.sourceX, piece.sourceY,
                piece.sourceWidth, piece.sourceHeight,
                piece.currentX, piece.currentY,
                pieceWidth, pieceHeight
            );

            const borderColor = currentTheme === 'dark' ? '#4f46e5' : '#6366f1';
            ctx.strokeStyle = borderColor;
            ctx.lineWidth = 2;
            ctx.strokeRect(piece.currentX, piece.currentY, pieceWidth, pieceHeight);

            if (currentPuzzleMode === 'sliding') {
                const fontSize = Math.min(pieceWidth, pieceHeight) * 0.3;
                ctx.font = `${fontSize}px Inter, sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                ctx.fillStyle = numberColor; // Use selected number color
                ctx.fillText(
                    piece.id + 1,
                    piece.currentX + pieceWidth / 2,
                    piece.currentY + pieceHeight / 2
                );
            }
        } else {
            const blankBgColor = currentTheme === 'dark' ? '#4a5568' : '#e0e7ff';
            const blankBorderColor = currentTheme === 'dark' ? '#4f46e5' : '#6366f1';
            ctx.fillStyle = blankBgColor;
            ctx.fillRect(piece.currentX, piece.currentY, pieceWidth, pieceHeight);
            ctx.strokeStyle = blankBorderColor;
            ctx.lineWidth = 2;
            ctx.strokeRect(piece.currentX, piece.currentY, pieceWidth, pieceHeight);
        }
    });

    if (hoveredPieceIndex !== -1 && !isProcessingClick && !solving && !shuffling && !isReplaying) {
        const hoveredPiece = puzzlePieces.find(p => p.id === hoveredPieceIndex);
        if (hoveredPiece && !hoveredPiece.isBlank) {
            const blankPiece = puzzlePieces.find(p => p.isBlank);
            const hoveredPieceCol = Math.round(hoveredPiece.currentX / pieceWidth);
            const hoveredPieceRow = Math.round(hoveredPiece.currentY / pieceHeight);
            const blankPieceCol = Math.round(blankPiece.currentX / pieceWidth);
            const blankPieceRow = Math.round(blankPiece.currentY / pieceHeight);

            const isAdjacent = (
                (Math.abs(hoveredPieceCol - blankPieceCol) === 1 && hoveredPieceRow === blankPieceRow) ||
                (Math.abs(hoveredPieceRow - blankPieceRow) === 1 && hoveredPieceCol === blankPieceCol)
            );

            if (isAdjacent) {
                ctx.strokeStyle = currentTheme === 'dark' ? '#9370DB' : '#a855f7';
                ctx.lineWidth = 4;
                ctx.shadowColor = currentTheme === 'dark' ? 'rgba(147, 112, 219, 0.7)' : 'rgba(168, 85, 247, 0.7)';
                ctx.shadowBlur = 10;
                ctx.strokeRect(hoveredPiece.currentX, hoveredPiece.currentY, pieceWidth, pieceHeight);
                ctx.shadowColor = 'transparent';
                ctx.shadowBlur = 0;
            }
        }
    }
}

// =====================================================================
// Instant Shuffle Puzzle (no animation)
// =====================================================================
async function instantShuffle() {
    if (!puzzleReady || shuffling || isReplaying) {
        return;
    }
    shuffling = true;
    showLoading("shufflingPuzzle");
    disableAllButtons();
    solveStatusDisplay.textContent = translations[currentLanguage].shufflingPuzzle;
    const originalBlankId = gridSize * gridSize - 1;
    
    // Calculate numMoves dynamically based on grid size
    // For a 3x3 grid, 9 * 50 = 450 moves. For 10x10, 100 * 50 = 5000 moves.
    const numMoves = gridSize * gridSize * 50; 
    
    let currentSolvable = false;
    let shuffleAttempts = 0;
    const maxShuffleAttempts = 10;

    let finalPuzzleOrder = null;
    let tempPieces = []; 

    while (!currentSolvable && shuffleAttempts < maxShuffleAttempts) {
        tempPieces = [];
        for (let i = 0; i < gridSize * gridSize; i++) {
            tempPieces.push({
                id: i,
                originalIndex: i,
                currentX: (i % gridSize) * pieceWidth,
                currentY: Math.floor(i / gridSize) * pieceHeight,
                isBlank: (i === originalBlankId)
            });
        }

        let currentTempBlankPiece = tempPieces.find(p => p.isBlank);

        for (let i = 0; i < numMoves; i++) {
            const blankCol = Math.round(currentTempBlankPiece.currentX / pieceWidth);
            const blankRow = Math.round(currentTempBlankPiece.currentY / pieceHeight);

            const possibleMoves = [];
            if (blankRow > 0) possibleMoves.push(tempPieces.find(p => Math.round(p.currentX / pieceWidth) === blankCol && Math.round(p.currentY / pieceHeight) === blankRow - 1));
            if (blankRow < gridSize - 1) possibleMoves.push(tempPieces.find(p => Math.round(p.currentX / pieceWidth) === blankCol && Math.round(p.currentY / pieceHeight) === blankRow + 1));
            if (blankCol > 0) possibleMoves.push(tempPieces.find(p => Math.round(p.currentX / pieceWidth) === blankCol - 1 && Math.round(p.currentY / pieceHeight) === blankRow));
            if (blankCol < gridSize - 1) possibleMoves.push(tempPieces.find(p => Math.round(p.currentX / pieceWidth) === blankCol + 1 && Math.round(p.currentY / pieceHeight) === blankRow));
            const validMoves = possibleMoves.filter(p => p && !p.isBlank);

            if (validMoves.length === 0) continue;

            const pieceToMove = validMoves[Math.floor(Math.random() * validMoves.length)];
            const tempX = pieceToMove.currentX;
            const tempY = pieceToMove.currentY;

            pieceToMove.currentX = currentTempBlankPiece.currentX;
            pieceToMove.currentY = currentTempBlankPiece.currentY;

            currentTempBlankPiece.currentX = tempX;
            currentTempBlankPiece.currentY = tempY;
            
            const pieceToMoveIndexInArray = tempPieces.indexOf(pieceToMove);
            const blankIndexInArray = tempPieces.indexOf(currentTempBlankPiece);
            [tempPieces[pieceToMoveIndexInArray], tempPieces[blankIndexInArray]] = 
            [tempPieces[blankIndexInArray], tempPieces[pieceToMoveIndexInArray]];
        }

        if (isPuzzleSolvable(tempPieces, gridSize)) {
            currentSolvable = true;
            finalPuzzleOrder = tempPieces.map(p => p.id); 
        } else {
            shuffleAttempts++;
            console.warn(`Attempt ${shuffleAttempts}: Shuffled puzzle is not solvable. Retrying...`);
        }
    }

    hideLoading();

    if (!shuffling) { 
        solveStatusDisplay.textContent = '';
        stopTimer();
        hasMadeFirstMove = false;
        enableAllButtons();
        return;
    }

    if (currentSolvable && finalPuzzleOrder) {
        let correctedPuzzlePieces = [];
        for (let i = 0; i < finalPuzzleOrder.length; i++) {
            const pieceId = finalPuzzleOrder[i];
            const originalPieceData = puzzlePieces.find(p => p.id === pieceId); 
            correctedPuzzlePieces.push({
                ...originalPieceData,
                currentX: (i % gridSize) * pieceWidth,
                currentY: Math.floor(i / gridSize) * pieceHeight,
                isBlank: (pieceId === originalBlankId)
            });
        }
        puzzlePieces = correctedPuzzlePieces;
        drawPuzzle();

        isShuffled = true;
        moves = 0;
        undoStack = [];
        replayMoves = [];
        initialShuffledStateForReplay = puzzlePieces.map(p => ({ ...p }));
        replayButton.style.display = 'none';
        moveHistory = [];
        movesPerIntervalData = [];
        lastRecordedTotalMoves = 0;
        lastGraphUpdateTime = 0;
        directionalMovesCount = { 'Up': 0, 'Down': 0, 'Left': 0, 'Right': 0 }; 
        renderMoveHistory();
        updateMoveCounter();
        hasMadeFirstMove = false;
        updateProgressIndicator();
        hoveredPieceIndex = -1;
        
        shuffling = false;
        enableAllButtons();

        solveStatusDisplay.textContent = '';
        drawMovesPerTimeGraph();
        drawDirectionalMovesGraph(); 
    } else {
        shuffling = false;
        enableAllButtons();
        solveStatusDisplay.textContent = translations[currentLanguage].shuffleFail(maxShuffleAttempts);
        showMessageBox("shuffleFail", maxShuffleAttempts);
        if (finalSourceWidth > 0 && finalSourceHeight > 0) {
            initializePuzzle(finalSourceX, finalSourceY, finalSourceWidth, finalSourceHeight);
        } else {
            const placeholderText = translations[currentLanguage].uploadPhoto.replace(':', '') + `\n(${gridSize}x${gridSize})`;
            const placeholderSize = fixedCanvasSize;
            // Ensure crossOrigin is set for placeholder image as well
            originalImage.crossOrigin = 'Anonymous'; 
            originalImage.src = `https://placehold.co/${placeholderSize}x${placeholderSize}/e0e7ff/4f46e5?text=${encodeURIComponent(placeholderText)}`;
        }
    }
}


shuffleButton.addEventListener('click', instantShuffle);
// =====================================================================
// Undo Puzzle Move
// =====================================================================
undoButton.addEventListener('click', () => {
    if (isProcessingClick || shuffling || isReplaying) return; 

    if (undoStack.length > 0) {
        const prevState = undoStack.pop();
        puzzlePieces = prevState.pieces.map(p => ({ ...p }));
        moves = prevState.moves;
        isShuffled = prevState.isShuffled;
        currentPuzzleMode = prevState.puzzleMode;

        puzzlePieces.forEach((piece, index) => {
            piece.currentX = (index % gridSize) * pieceWidth;
            piece.currentY = Math.floor(index / gridSize) * pieceHeight;
        });

        if (replayMoves.length > 0) {
            replayMoves.pop();
        }
        
        // Decrement total pieces moved
        if (playerStats.totalPiecesMoved > 0) {
            playerStats.totalPiecesMoved--;
        }
        
        // Adjust directional moves count (this is a simplification; full undo would require storing directional change in undoStack)
        if (moveHistory.length > 0) {
            const lastMove = moveHistory[0];
            const directionMatch = lastMove.text.match(/moved (Right|Left|Down|Up|Kanan|Kiri|Bawah|Atas|右|左|下|上)/); 
            if (directionMatch) {
                let matchedDirection = '';
                if (directionMatch[1] === translations.en.directionRight || directionMatch[1] === translations.id.directionRight || directionMatch[1] === translations.zh.directionRight) {
                    matchedDirection = 'Right';
                } else if (directionMatch[1] === translations.en.directionLeft || directionMatch[1] === translations.id.directionLeft || directionMatch[1] === translations.zh.directionLeft) {
                    matchedDirection = 'Left';
                } else if (directionMatch[1] === translations.en.directionDown || directionMatch[1] === translations.id.directionDown || directionMatch[1] === translations.zh.directionDown) {
                    matchedDirection = 'Down';
                } else if (directionMatch[1] === translations.en.directionUp || directionMatch[1] === translations.id.directionUp || directionMatch[1] === translations.zh.directionUp) {
                    matchedDirection = 'Up';
                }

                if (directionalMovesCount[matchedDirection]) {
                    directionalMovesCount[matchedDirection]--;
                }
            }
            moveHistory.shift();
        }

        renderMoveHistory();

        updateMoveCounter();
        drawPuzzle();
        updateProgressIndicator();
        puzzleModeSelect.value = currentPuzzleMode;
        hoveredPieceIndex = -1;
        
        if (movesPerIntervalData.length > 0) {
            const lastDataPoint = movesPerIntervalData[movesPerIntervalData.length - 1];
            if (moves < lastDataPoint.totalMovesAtTime) {
                movesPerIntervalData.pop();
                if (movesPerIntervalData.length > 0) {
                    lastRecordedTotalMoves = movesPerIntervalData[movesPerIntervalData.length - 1].totalMovesAtTime;
                    lastGraphUpdateTime = movesPerIntervalData[movesPerIntervalData.length - 1].time;
                } else {
                    lastRecordedTotalMoves = 0;
                    lastGraphUpdateTime = 0;
                }
            }
        }
        drawMovesPerTimeGraph();
        drawDirectionalMovesGraph(); 
        updatePlayerStatisticsDisplay(); 
        savePlayerStatistics();
    } else {
        showMessageBox("noUndo");
    }
});

// =====================================================================
// Reset Puzzle to Original Order
// =====================================================================
resetButton.addEventListener('click', () => {
    if (isReplaying) return;

    showConfirmationBox("confirmReset", () => {
        if (!puzzleReady) {
            showMessageBox("uploadImageFirst");
            return;
        }

        solving = false; 
        shuffling = false;

        puzzlePieces.sort((a, b) => a.originalIndex - b.originalIndex);

        puzzlePieces.forEach((piece, index) => {
            const targetCol = index % gridSize;
            const targetRow = Math.floor(index / gridSize);
            piece.currentX = targetCol * pieceWidth;
            piece.currentY = targetRow * pieceHeight;
        });

        isShuffled = false;
        moves = 0;
        undoStack = [];
        replayMoves = [];
        initialShuffledStateForReplay = [];
        replayButton.style.display = 'none';
        moveHistory = [];
        movesPerIntervalData = [];
        lastRecordedTotalMoves = 0;
        lastGraphUpdateTime = 0;
        directionalMovesCount = { 'Up': 0, 'Down': 0, 'Left': 0, 'Right': 0 }; 
        renderMoveHistory();
        updateMoveCounter();
        stopTimer();
        timerDisplay.textContent = '00:00';
        hasMadeFirstMove = false;
        drawPuzzle();
        updateProgressIndicator();
        puzzleCanvas.classList.remove('puzzle-solved-animation');
        solveStatusDisplay.textContent = '';
        stopConfetti();
        hoveredPieceIndex = -1;

        updatePlayerStatisticsDisplay();
        drawMovesPerTimeGraph();
        drawDirectionalMovesGraph(); 

        enableAllButtons();
    });
});


// =====================================================================
// Handle Puzzle Click/Touch (to move pieces)
// =====================================================================
puzzleCanvas.addEventListener('click', (event) => {
    if (!puzzleReady || !isShuffled || isProcessingClick || solving || shuffling || isReplaying) {
        if (puzzleReady && !isShuffled) {
            showMessageBox("puzzleNotShuffled");
        }
        return;
    }
    isProcessingClick = true;

    if (!hasMadeFirstMove) {
        hasMadeFirstMove = true;
        startTimer();
    }

    const rect = puzzleCanvas.getBoundingClientRect();
    const scaleX = puzzleCanvas.width / rect.width;
    const scaleY = puzzleCanvas.height / rect.height;

    const mouseX = (event.clientX - rect.left) * scaleX;
    const mouseY = (event.clientY - rect.top) * scaleY;

    const clickedCol = Math.floor(mouseX / pieceWidth);
    const clickedRow = Math.floor(mouseY / pieceHeight);
    
    const clickedPiece = puzzlePieces.find(p => 
        Math.abs(p.currentX - (clickedCol * pieceWidth)) < 1 && 
        Math.abs(p.currentY - (clickedRow * pieceHeight)) < 1
    );
    if (!clickedPiece || clickedPiece.isBlank) {
        isProcessingClick = false;
        return;
    }

    const blankPiece = puzzlePieces.find(p => p.isBlank);
    const clickedPieceCol = Math.round(clickedPiece.currentX / pieceWidth);
    const clickedPieceRow = Math.round(clickedPiece.currentY / pieceHeight);
    const blankPieceCol = Math.round(blankPiece.currentX / pieceWidth);
    const blankPieceRow = Math.round(blankPiece.currentY / pieceHeight);

    const isAdjacent = (
        (Math.abs(clickedPieceCol - blankPieceCol) === 1 && clickedPieceRow === blankPieceRow) ||
        (Math.abs(clickedPieceRow - blankPieceRow) === 1 && clickedPieceCol === blankPieceCol)
    );
    if (isAdjacent) {
        const currentStatePieces = puzzlePieces.map(p => ({ ...p }));
        undoStack.push({ pieces: currentStatePieces, moves: moves, isShuffled: isShuffled, puzzleMode: currentPuzzleMode });
        if (undoStack.length > maxUndoStates) {
            undoStack.shift();
        }

        const targetXForClicked = blankPiece.currentX;
        const targetYForClicked = blankPiece.currentY;
        const targetXForBlank = clickedPiece.currentX;
        const targetYForBlank = clickedPiece.currentY;

        const fromIndex = clickedPieceRow * gridSize + clickedCol;
        const toIndex = blankPieceRow * gridSize + blankPieceCol;
        replayMoves.push({ pieceId: clickedPiece.id, fromIndex: fromIndex, toIndex: toIndex });
        
        animatePieceMove(
            clickedPiece, targetXForClicked, targetYForClicked,
            blankPiece, targetXForBlank, targetYForBlank,
            () => {
                clickedPiece.currentX = targetXForClicked;
                clickedPiece.currentY = targetYForClicked;
                blankPiece.currentX = targetXForBlank;
                blankPiece.currentY = targetYForBlank;

                const clickedIndexInArray = puzzlePieces.indexOf(clickedPiece);
                const blankIndexInArray = puzzlePieces.indexOf(blankPiece);
                [puzzlePieces[clickedIndexInArray], puzzlePieces[blankIndexInArray]] = 
                [puzzlePieces[blankIndexInArray], puzzlePieces[clickedIndexInArray]];

                moves++;
                playerStats.totalPiecesMoved++; 
                updateMoveCounter();
                drawPuzzle();
                updateProgressIndicator();

                let direction = '';
                if (clickedPieceCol === blankPieceCol) { 
                    direction = clickedPieceRow < blankPieceRow ? 'Down' : 'Up';
                } else { 
                    direction = clickedPieceCol < blankPieceCol ? 'Right' : 'Left';
                }
                directionalMovesCount[direction]++; 
                drawDirectionalMovesGraph(); 

                addMoveToHistory(clickedPiece.id + 1, fromIndex, toIndex, gridSize);

                checkWin();
                isProcessingClick = false;
                updatePlayerStatisticsDisplay(); 
                savePlayerStatistics();
            }
        );
    } else {
        isProcessingClick = false;
    }
});

// =====================================================================
// Handle mouse/touch events for hover effect
// =====================================================================
puzzleCanvas.addEventListener('mousemove', (event) => {
    if (!puzzleReady || !isShuffled || isProcessingClick || solving || shuffling || isReplaying) {
        if (hoveredPieceIndex !== -1) {
            hoveredPieceIndex = -1;
            drawPuzzle();
        }
        return;
    }

    const rect = puzzleCanvas.getBoundingClientRect();
    const scaleX = puzzleCanvas.width / rect.width;
    const scaleY = puzzleCanvas.height / rect.height;

    const mouseX = (event.clientX - rect.left) * scaleX;
    const mouseY = (event.clientY - rect.top) * scaleY;

    const currentHoveredCol = Math.floor(mouseX / pieceWidth);
    const currentHoveredRow = Math.floor(mouseY / pieceHeight);
    
    const currentHoveredPiece = puzzlePieces.find(p => 
        Math.abs(p.currentX - (currentHoveredCol * pieceWidth)) < 1 && 
        Math.abs(p.currentY - (currentHoveredRow * pieceHeight)) < 1
    );

    let newHoveredIndex = -1;
    if (currentHoveredPiece && !currentHoveredPiece.isBlank) {
        const blankPiece = puzzlePieces.find(p => p.isBlank);
        const hoveredPieceCol = Math.round(currentHoveredPiece.currentX / pieceWidth);
        const hoveredPieceRow = Math.round(currentHoveredPiece.currentY / pieceHeight);
        const blankPieceCol = Math.round(blankPiece.currentX / pieceWidth);
        const blankPieceRow = Math.round(blankPiece.currentY / pieceHeight);

        const isAdjacent = (
            (Math.abs(hoveredPieceCol - blankPieceCol) === 1 && hoveredPieceRow === blankPieceRow) ||
            (Math.abs(hoveredPieceRow - blankPieceRow) === 1 && hoveredPieceCol === blankPieceCol)
        );
        if (isAdjacent) {
            newHoveredIndex = currentHoveredPiece.id;
        }
    }

    if (newHoveredIndex !== hoveredPieceIndex) {
        hoveredPieceIndex = newHoveredIndex;
        drawPuzzle();
    }
});

puzzleCanvas.addEventListener('mouseout', () => {
    if (hoveredPieceIndex !== -1) {
        hoveredPieceIndex = -1;
        drawPuzzle();
    }
});

// =====================================================================
// Piece Movement Animation Function (for manual & auto-solve moves)
// =====================================================================
function animatePieceMove(piece1, targetX1, targetY1, piece2, targetX2, targetY2, callback) {
    const startX1 = piece1.currentX;
    const startY1 = piece1.currentY;
    const startX2 = piece2.currentX;
    const startY2 = piece2.currentY;

    let startTime = null;
    function animate(currentTime) {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / animationDuration, 1);
        piece1.currentX = startX1 + (targetX1 - startX1) * progress;
        piece1.currentY = startY1 + (targetY1 - startY1) * progress;
        piece2.currentX = startX2 + (targetX2 - startX2) * progress;
        piece2.currentY = startY2 + (targetY2 - startY2) * progress;
        
        drawPuzzle();
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            callback();
        }
    }
    requestAnimationFrame(animate);
}

// =====================================================================
// Update Move Counter
// =====================================================================
function updateMoveCounter() {
    moveCounterDisplay.textContent = moves;
}

// =====================================================================
// Timer Functions
// =====================================================================
function startTimer() {
    stopTimer();
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function updateTimer() {
    const elapsedTime = Date.now() - startTime;
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    timerDisplay.textContent = `${formattedMinutes}:${formattedSeconds}`;

    if (totalSeconds >= lastGraphUpdateTime + graphUpdateInterval || (totalSeconds === 0 && moves > 0 && movesPerIntervalData.length === 0)) {
        const movesInInterval = moves - lastRecordedTotalMoves;
        movesPerIntervalData.push({ time: totalSeconds, moves: movesInInterval, totalMovesAtTime: moves });
        lastRecordedTotalMoves = moves;
        lastGraphUpdateTime = totalSeconds;
        drawMovesPerTimeGraph();
    }
}

// =====================================================================
// Check Win Condition & Display Win Animation
// =====================================================================
function checkWin() {
    if (!isShuffled) return;
    let solved = true;
    for (let i = 0; i < puzzlePieces.length; i++) {
        const piece = puzzlePieces[i];
        const currentPieceCol = Math.round(piece.currentX / pieceWidth);
        const currentPieceRow = Math.round(piece.currentY / pieceHeight);
        const currentPieceIndex = currentPieceRow * gridSize + currentPieceCol;
        if (piece.id !== currentPieceIndex) {
            solved = false;
            break;
        }
    }

    if (solved) {
        isShuffled = false;
        stopTimer();
        hasMadeFirstMove = false;

        const blankPiece = puzzlePieces.find(p => p.isBlank);
        const blankPieceCurrentIndexInArray = puzzlePieces.indexOf(blankPiece);
        const lastCorrectArrayPosition = puzzlePieces.length - 1;
        if (blankPieceCurrentIndexInArray !== lastCorrectArrayPosition) {
            const pieceAtLastPosition = puzzlePieces[lastCorrectArrayPosition];
            puzzlePieces[lastCorrectArrayPosition] = blankPiece;
            puzzlePieces[blankPieceCurrentIndexInArray] = pieceAtLastPosition;

            blankPiece.currentX = (lastCorrectArrayPosition % gridSize) * pieceWidth;
            blankPiece.currentY = Math.floor(lastCorrectArrayPosition / gridSize) * pieceHeight;
            pieceAtLastPosition.currentX = (blankPieceCurrentIndexInArray % gridSize) * pieceWidth;
            pieceAtLastPosition.currentY = Math.floor(blankPieceCurrentIndexInArray / gridSize) * pieceHeight;
        }
        
        drawPuzzle();
        puzzleCanvas.classList.add('puzzle-solved-animation');
        startConfetti();
        
        showMessageBox("puzzleSolved", moves, timerDisplay.textContent);
        
        enableAllButtons();
        solving = false;
        shuffling = false;
        isProcessingClick = false;
        hoveredPieceIndex = -1;

        if (replayMoves.length > 0) {
            replayButton.style.display = 'inline-block';
        }

        updatePlayerStatistics(moves, Math.floor((Date.now() - startTime) / 1000));
        updateProgressIndicator();
    }
}

// =====================================================================
// Disable all interactive buttons
// =====================================================================
function disableAllButtons() {
    shuffleButton.disabled = true;
    undoButton.disabled = true;
    resetButton.disabled = false;
    imageUpload.disabled = true;
    gridSizeSelect.disabled = true;
    puzzleModeSelect.disabled = true;
    numberColorPicker.disabled = true;
    viewOriginalImageButton.disabled = true;
    replayButton.disabled = true;
    sampleImageContainers.forEach(container => container.style.pointerEvents = 'none');
    sampleImageContainers.forEach(container => container.style.opacity = '0.5');
    languageSelect.disabled = true;
    themeSelect.disabled = true;
    statsGridSizeFilter.disabled = true; 
}

// =====================================================================
// Enable all interactive buttons
// =====================================================================
function enableAllButtons() {
    shuffleButton.disabled = false;
    undoButton.disabled = false;
    resetButton.disabled = false;
    imageUpload.disabled = false;
    gridSizeSelect.disabled = false;
    puzzleModeSelect.disabled = false;
    numberColorPicker.disabled = false;
    viewOriginalImageButton.disabled = false;
    replayButton.disabled = false;
    sampleImageContainers.forEach(container => container.style.pointerEvents = 'auto');
    sampleImageContainers.forEach(container => container.style.opacity = '1');
    languageSelect.disabled = false;
    themeSelect.disabled = false;
    statsGridSizeFilter.disabled = false; 
}

// =====================================================================
// Replay Functionality
// =====================================================================
replayButton.addEventListener('click', async () => {
    if (replayMoves.length === 0 || shuffling || isProcessingClick) { 
        showMessageBox("noReplayMoves");
        return;
    }

    isReplaying = true;
    disableAllButtons();
    stopTimer();
    solveStatusDisplay.textContent = translations[currentLanguage].replayFinished;

    puzzlePieces = initialShuffledStateForReplay.map(p => ({ ...p }));
    puzzlePieces.forEach((piece, index) => {
        piece.currentX = (index % gridSize) * pieceWidth;
        piece.currentY = Math.floor(index / gridSize) * pieceHeight;
    });
    moves = 0;
    playerStats.totalPiecesMoved = 0; 
    updateMoveCounter();
    drawPuzzle();
    updateProgressIndicator();
    puzzleCanvas.classList.remove('puzzle-solved-animation');
    stopConfetti();
    hoveredPieceIndex = -1;
    moveHistory = [];
    movesPerIntervalData = [];
    lastRecordedTotalMoves = 0;
    lastGraphUpdateTime = 0;
    directionalMovesCount = { 'Up': 0, 'Down': 0, 'Left': 0, 'Right': 0 }; 
    renderMoveHistory();
    drawMovesPerTimeGraph();
    drawDirectionalMovesGraph(); 

    for (const move of replayMoves) {
        if (!isReplaying) break;

        const pieceToMove = puzzlePieces.find(p => p.id === move.pieceId);
        const blankPiece = puzzlePieces.find(p => p.isBlank);

        if (!pieceToMove || !blankPiece) {
            console.error("Error during replay: Piece or blank not found.");
            break;
        }

        const pieceToMoveCurrentIndex = puzzlePieces.indexOf(pieceToMove);
        const blankPieceCurrentIndex = puzzlePieces.indexOf(blankPiece);

        const targetXForMovedPiece = (move.toIndex % gridSize) * pieceWidth;
        const targetYForMovedPiece = Math.floor(move.toIndex / gridSize) * pieceHeight;
        const targetXForBlank = (move.fromIndex % gridSize) * pieceWidth;
        const targetYForBlank = Math.floor(move.fromIndex / gridSize) * pieceHeight;

        await new Promise(resolve => {
            animatePieceMove(
                pieceToMove, targetXForMovedPiece, targetYForMovedPiece,
                blankPiece, targetXForBlank, targetYForBlank,
                () => {
                    pieceToMove.currentX = targetXForMovedPiece;
                    pieceToMove.currentY = targetYForMovedPiece;
                    blankPiece.currentX = targetXForBlank;
                    blankPiece.currentY = targetYForBlank;

                    const newPieceToMoveIndex = puzzlePieces.indexOf(pieceToMove);
                    const newBlankPieceIndex = puzzlePieces.indexOf(blankPiece);
                    [puzzlePieces[newPieceToMoveIndex], puzzlePieces[newBlankPieceIndex]] =
                    [puzzlePieces[newBlankPieceIndex], puzzlePieces[newPieceToMoveIndex]];

                    moves++;
                    playerStats.totalPiecesMoved++; 
                    updateMoveCounter();
                    drawPuzzle();
                    updateProgressIndicator();
                    resolve();
                }
            );
        });
        await new Promise(resolve => setTimeout(resolve, 300));
    }

    isReplaying = false;
    solveStatusDisplay.textContent = translations[currentLanguage].replayFinished;
    checkWin();
    enableAllButtons();
});


// =====================================================================
// Handle Window Resize Responsiveness
// =====================================================================
window.addEventListener('resize', async () => {
    if (!puzzleReady) return;

    solving = false;
    isProcessingClick = false;
    isReplaying = false;
    
    enableAllButtons();
    solveStatusDisplay.textContent = '';
    puzzleCanvas.classList.remove('puzzle-solved-animation');
    stopConfetti();
    hoveredPieceIndex = -1;

    recalculatePiecePositionsAndRedraw();
});
// =====================================================================
// Local Storage Functions for Preferences and Player Stats
// =====================================================================
function savePreferences() {
    localStorage.setItem('puzzleGridSize', gridSizeSelect.value);
    localStorage.setItem('puzzleMode', puzzleModeSelect.value);
    localStorage.setItem('puzzleLanguage', currentLanguage);
    localStorage.setItem('puzzleTheme', currentTheme);
    localStorage.setItem('numberColor', numberColorPicker.value);
    localStorage.setItem('currentStatsView', currentStatsView); 
}

function loadPreferences() {
    const savedGridSize = localStorage.getItem('puzzleGridSize');
    const savedPuzzleMode = localStorage.getItem('puzzleMode');
    const savedLanguage = localStorage.getItem('puzzleLanguage');
    const savedTheme = localStorage.getItem('puzzleTheme');
    const savedNumberColor = localStorage.getItem('numberColor');
    const savedStatsView = localStorage.getItem('currentStatsView'); 

    if (savedGridSize) {
        gridSizeSelect.value = savedGridSize;
        gridSize = parseInt(savedGridSize);
    }
    if (savedPuzzleMode) {
        puzzleModeSelect.value = savedPuzzleMode;
        currentPuzzleMode = savedPuzzleMode;
    }
    if (savedLanguage && translations[savedLanguage]) {
        currentLanguage = savedLanguage;
        languageSelect.value = savedLanguage;
    } else {
        currentLanguage = 'id'; 
        languageSelect.value = 'id';
    }
    if (savedTheme) {
        currentTheme = savedTheme;
        themeSelect.value = savedTheme;
    } else {
        currentTheme = 'light';
        themeSelect.value = 'light';
    }
    if (savedNumberColor) {
        numberColor = savedNumberColor;
        numberColorPicker.value = savedNumberColor;
    } else {
        numberColor = '#000000';
        numberColorPicker.value = '#000000';
    }
    if (savedStatsView) {
        currentStatsView = savedStatsView;
        statsGridSizeFilter.value = savedStatsView; 
    } else {
        currentStatsView = '3'; 
        statsGridSizeFilter.value = '3';
    }
    applyTheme(currentTheme);
}

function loadPlayerStatistics() {
    const savedStats = localStorage.getItem('playerStats');
    if (savedStats) {
        const parsedStats = JSON.parse(savedStats);
        playerStats = {
            ...playerStats, 
            ...parsedStats,
            bestTimes: { ...playerStats.bestTimes, ...parsedStats.bestTimes },
            bestMoves: { ...playerStats.bestMoves, ...parsedStats.bestMoves },
            worstTimes: { ...playerStats.worstTimes, ...parsedStats.worstTimes },
            worstMoves: { ...playerStats.worstMoves, ...parsedStats.worstMoves }
        };

        for (const key in playerStats.bestTimes) {
            if (playerStats.bestTimes[key] === null || playerStats.bestTimes[key] === 0) {
                playerStats.bestTimes[key] = Infinity;
            }
        }
        for (const key in playerStats.bestMoves) {
            if (playerStats.bestMoves[key] === null || playerStats.bestMoves[key] === 0) {
                playerStats.bestMoves[key] = Infinity;
            }
        }
    }
}

function savePlayerStatistics() {
    localStorage.setItem('playerStats', JSON.stringify(playerStats));
}

function updatePlayerStatistics(currentMoves, currentTimeSeconds) {
    playerStats.totalGamesPlayed++;
    playerStats.totalTimePlayedSeconds += currentTimeSeconds;

    const currentGridSizeStr = String(gridSize);

    if (currentTimeSeconds < playerStats.bestTimes[currentGridSizeStr]) {
        playerStats.bestTimes[currentGridSizeStr] = currentTimeSeconds;
    }
    if (currentMoves < playerStats.bestMoves[currentGridSizeStr]) {
        playerStats.bestMoves[currentGridSizeStr] = currentMoves;
    }

    if (currentTimeSeconds > playerStats.worstTimes[currentGridSizeStr]) {
        playerStats.worstTimes[currentGridSizeStr] = currentTimeSeconds;
    }
    if (currentMoves > playerStats.worstMoves[currentGridSizeStr]) {
        playerStats.worstMoves[currentGridSizeStr] = currentMoves;
    }
    
    savePlayerStatistics();
    updatePlayerStatisticsDisplay();
}

function formatTime(totalSeconds) {
    if (totalSeconds === Infinity) return translations[currentLanguage].notApplicable;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

function formatTimeShort(totalSeconds) {
    if (totalSeconds === Infinity) return translations[currentLanguage].notApplicable;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}

function updatePlayerStatisticsDisplay() {
    statTotalGames.textContent = playerStats.totalGamesPlayed;
    statTotalTime.textContent = formatTime(playerStats.totalTimePlayedSeconds);
    statTotalPiecesMoved.textContent = playerStats.totalPiecesMoved;

    const statItems = document.querySelectorAll('.stat-item');
    const statHeaders = document.querySelectorAll('.stat-header');

    statHeaders.forEach(header => header.style.display = 'block'); 

    statItems.forEach(item => {
        const itemGridSize = item.getAttribute('data-grid-size');
        if (currentStatsView === 'all' || itemGridSize === currentStatsView) {
            item.style.display = 'list-item';
        } else {
            item.style.display = 'none';
        }
    });

    for (let i = 3; i <= 10; i++) { 
        const size = String(i);
        document.getElementById(`statBestTime${size}x${size}`).textContent = formatTimeShort(playerStats.bestTimes[size]);
        document.getElementById(`statBestMoves${size}x${size}`).textContent = playerStats.bestMoves[size] === Infinity ? translations[currentLanguage].notApplicable : playerStats.bestMoves[size];
        document.getElementById(`statWorstTime${size}x${size}`).textContent = formatTimeShort(playerStats.worstTimes[size]);
        document.getElementById(`statWorstMoves${size}x${size}`).textContent = playerStats.worstMoves[size] === 0 ? translations[currentLanguage].notApplicable : playerStats.worstMoves[size];
    }
}

// =====================================================================
// Handle Stats Grid Size Filter Change
// =====================================================================
statsGridSizeFilter.addEventListener('change', (event) => {
    currentStatsView = event.target.value;
    savePreferences();
    updatePlayerStatisticsDisplay();
});


// =====================================================================
// Handle "View Original Image" Button
// =====================================================================
viewOriginalImageButton.addEventListener('click', () => {
    if (originalImage.src) {
        mainContent.classList.add('main-content-hidden');
        originalImageDisplayContainer.classList.add('show');
        fullImageDisplay.src = originalImage.src;
        originalImageDisplayContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        showMessageBox("noImageLoaded");
    }
});
backToPuzzleButton.addEventListener('click', () => {
    originalImageDisplayContainer.classList.remove('show');
    mainContent.classList.remove('main-content-hidden');
    puzzleCanvas.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

// =====================================================================
// Image Cropper Logic
// =====================================================================
function setupCroppingInterface() {
    mainContent.classList.add('main-content-hidden');
    imageCropperContainer.style.display = 'flex';

    const maxWidth = cropperCanvas.parentElement.clientWidth * 0.9;
    const maxHeight = window.innerHeight * 0.7;
    
    let imgRatio = originalImage.width / originalImage.height;
    let canvasWidth = originalImage.width;
    let canvasHeight = originalImage.height;

    if (canvasWidth > maxWidth) {
        canvasWidth = maxWidth;
        canvasHeight = canvasWidth / imgRatio;
    }
    if (canvasHeight > maxHeight) {
        canvasHeight = maxHeight;
        canvasWidth = canvasHeight * imgRatio;
    }

    cropperCanvas.width = canvasWidth;
    cropperCanvas.height = canvasHeight;

    const minDim = Math.min(cropperCanvas.width, cropperCanvas.height);
    cropRect.size = minDim * 0.8;
    cropRect.x = (cropperCanvas.width / 2) - (cropRect.size / 2);
    cropRect.y = (cropperCanvas.height / 2) - (cropRect.size / 2);

    drawCropper();

    confirmCropButton.disabled = false;
    cancelCropButton.disabled = false;
}

function drawCropper() {
    cropperCtx.clearRect(0, 0, cropperCanvas.width, cropperCanvas.height);
    cropperCtx.drawImage(originalImage, 0, 0, cropperCanvas.width, cropperCanvas.height);

    cropperCtx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    cropperCtx.fillRect(0, 0, cropperCanvas.width, cropperCanvas.height);
    cropperCtx.globalCompositeOperation = 'destination-out';
    cropperCtx.fillRect(cropRect.x, cropRect.y, cropRect.size, cropRect.size);
    cropperCtx.globalCompositeOperation = 'source-over';

    cropperCtx.strokeStyle = '#fff';
    cropperCtx.lineWidth = 2;
    cropperCtx.strokeRect(cropRect.x, cropRect.y, cropRect.size, cropRect.size);

    const handleColor = currentTheme === 'dark' ? '#a78bfa' : '#6366f1';
    cropperCtx.fillStyle = handleColor;
    cropperCtx.fillRect(cropRect.x - resizeHandleSize / 2, cropRect.y - resizeHandleSize / 2, resizeHandleSize, resizeHandleSize);
    cropperCtx.fillRect(cropRect.x + cropRect.size - resizeHandleSize / 2, cropRect.y - resizeHandleSize / 2, resizeHandleSize, resizeHandleSize);
    cropperCtx.fillRect(cropRect.x - resizeHandleSize / 2, cropRect.y + cropRect.size - resizeHandleSize / 2, resizeHandleSize, resizeHandleSize);
    cropperCtx.fillRect(cropRect.x + cropRect.size - resizeHandleSize / 2, cropRect.y + cropRect.size - resizeHandleSize / 2, resizeHandleSize, resizeHandleSize);
}

function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) * (canvas.width / rect.width),
        y: (evt.clientY - rect.top) * (canvas.height / rect.height)
    };
}

function getTouchPos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    const touch = evt.touches[0];
    return {
        x: (touch.clientX - rect.left) * (canvas.width / rect.width),
        y: (touch.clientY - rect.top) * (canvas.height / rect.height)
    };
}

cropperCanvas.addEventListener('mousedown', handleCropStart);
cropperCanvas.addEventListener('mousemove', handleCropMove);
cropperCanvas.addEventListener('mouseup', handleCropEnd);
cropperCanvas.addEventListener('mouseleave', handleCropEnd);

cropperCanvas.addEventListener('touchstart', (e) => { e.preventDefault(); handleCropStart(e.touches[0]); }, { passive: false });
cropperCanvas.addEventListener('touchmove', (e) => { e.preventDefault(); handleCropMove(e.touches[0]); }, { passive: false });
cropperCanvas.addEventListener('touchend', handleCropEnd);

function handleCropStart(e) {
    const pos = e.touches ? getTouchPos(cropperCanvas, e) : getMousePos(cropperCanvas, e);
    dragStartX = pos.x;
    dragStartY = pos.y;

    if (pos.x > cropRect.x + cropRect.size - resizeHandleSize && pos.x < cropRect.x + cropRect.size + resizeHandleSize &&
        pos.y > cropRect.y + cropRect.size - resizeHandleSize && pos.y < cropRect.y + cropRect.size + resizeHandleSize) {
        isResizing = true;
    } else if (pos.x > cropRect.x && pos.x < cropRect.x + cropRect.size &&
               pos.y > cropRect.y && pos.y < cropRect.y + cropRect.size) {
        isDragging = true;
    }
}

function handleCropMove(e) {
    if (!isDragging && !isResizing) return;

    const pos = e.touches ? getTouchPos(cropperCanvas, e) : getMousePos(cropperCanvas, e);
    const dx = pos.x - dragStartX;
    const dy = pos.y - dragStartY;

    if (isDragging) {
        cropRect.x += dx;
        cropRect.y += dy;

        cropRect.x = Math.max(0, Math.min(cropRect.x, cropperCanvas.width - cropRect.size));
        cropRect.y = Math.max(0, Math.min(cropRect.y, cropperCanvas.height - cropRect.size));
    } else if (isResizing) {
        let newSize = Math.max(20, cropRect.size + dx);
        newSize = Math.max(newSize, cropRect.size + dy);

        newSize = Math.min(newSize, cropperCanvas.width - cropRect.x);
        newSize = Math.min(newSize, cropperCanvas.height - cropRect.y);

        cropRect.size = newSize;
    }

    dragStartX = pos.x;
    dragStartY = pos.y;

    drawCropper();
}

function handleCropEnd() {
    isDragging = false;
    isResizing = false;
}

confirmCropButton.addEventListener('click', async () => {
    const scaleX = originalImage.width / cropperCanvas.width;
    const scaleY = originalImage.height / cropperCanvas.height;

    finalSourceX = cropRect.x * scaleX;
    finalSourceY = cropRect.y * scaleY;
    finalSourceWidth = cropRect.size * scaleX;
    finalSourceHeight = cropRect.size * scaleY;

    imageCropperContainer.style.display = 'none';
    mainContent.classList.remove('main-content-hidden');
    
    initializePuzzle(finalSourceX, finalSourceY, finalSourceWidth, finalSourceHeight);
    await instantShuffle(); 
    enableAllButtons();
});

cancelCropButton.addEventListener('click', () => {
    imageCropperContainer.style.display = 'none';
    mainContent.classList.remove('main-content-hidden');
    showMessageBox("cropCancelled");
    if (!puzzleReady) {
        const placeholderText = translations[currentLanguage].uploadPhoto.replace(':', '') + `\n(${gridSize}x${gridSize})`;
        const placeholderSize = fixedCanvasSize;
        // Ensure crossOrigin is set for placeholder image as well
        originalImage.crossOrigin = 'Anonymous'; 
        originalImage.src = `https://placehold.co/${placeholderSize}x${placeholderSize}/e0e7ff/4f46e5?text=${encodeURIComponent(placeholderText)}`;
    }
    enableAllButtons();
});

// =====================================================================
// Move History Functionality (Updated to include Timestamp)
// =====================================================================
function getDirectionSVG(direction) {
    const color = currentTheme === 'dark' ? '#8b5cf6' : '#6366f1';
    const size = 16;
    let transform = '';

    switch (direction) {
        case translations[currentLanguage].directionRight: transform = 'rotate(90)'; break;
        case translations[currentLanguage].directionLeft: transform = 'rotate(-90)'; break;
        case translations[currentLanguage].directionDown: transform = 'rotate(180)'; break;
        case translations[currentLanguage].directionUp: transform = 'rotate(0)'; break;
        default: return '';
    }

    return `
        <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transform: ${transform};">
            <line x1="12" y1="19" x2="12" y2="5"></line>
            <polyline points="5 12 12 5 19 12"></polyline>
        </svg>
    `;
}

function addMoveToHistory(pieceNumber, fromIndex, toIndex, currentGridSize) {
    const fromRow = Math.floor(fromIndex / currentGridSize);
    const fromCol = fromIndex % currentGridSize;
    const toRow = Math.floor(toIndex / currentGridSize);
    const toCol = toIndex % currentGridSize;

    let directionKey = '';
    if (fromRow === toRow) {
        directionKey = fromCol < toCol ? 'directionRight' : 'directionLeft';
    } else {
        directionKey = fromRow < toRow ? 'directionDown' : 'directionUp';
    }

    const timestamp = timerDisplay.textContent; 
    const moveText = translations[currentLanguage].pieceMoved(pieceNumber, translations[currentLanguage][directionKey], timestamp);
    const moveObject = { 
        text: moveText, 
        direction: translations[currentLanguage][directionKey],
        timestamp: timestamp
    };
    
    moveHistory.unshift(moveObject);
    if (moveHistory.length > maxMoveHistory) {
        moveHistory.pop();
    }
    renderMoveHistory();
}

function renderMoveHistory() {
    moveHistoryList.innerHTML = '';
    if (moveHistory.length === 0) {
        moveHistoryList.innerHTML = `<li class="text-center text-secondary">${translations[currentLanguage].noMovesYet}</li>`;
        return;
    }
    moveHistory.forEach(move => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${getDirectionSVG(move.direction)} ${move.text}`;
        moveHistoryList.appendChild(listItem);
    });
}

// =====================================================================
// Draw Moves Per Time Graph
// =====================================================================
function drawMovesPerTimeGraph() {
    movesPerTimeGraphSVG.innerHTML = '';
    if (movesPerIntervalData.length < 1) {
        return;
    }

    const svgWidth = movesPerTimeGraphSVG.clientWidth;
    const svgHeight = movesPerTimeGraphSVG.clientHeight;
    const padding = 20;

    const times = movesPerIntervalData.map(d => d.time);
    const movesInIntervals = movesPerIntervalData.map(d => d.moves);

    const maxTime = Math.max(...times);
    const maxMoves = Math.max(...movesInIntervals);
    const minMoves = Math.min(...movesInIntervals);

    const xScale = (svgWidth - 2 * padding) / (maxTime || 1);
    const yScale = (svgHeight - 2 * padding) / (maxMoves - minMoves || 1);

    let pathData = '';
    if (movesPerIntervalData.length > 0) {
        const points = movesPerIntervalData.map(d => {
            const x = padding + d.time * xScale;
            const y = svgHeight - padding - (d.moves - minMoves) * yScale;
            return { x, y };
        });

        pathData = `M ${points[0].x} ${points[0].y}`;
        for (let i = 1; i < points.length; i++) {
            pathData += ` L ${points[i].x} ${points[i].y}`;
        }

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", pathData);
        path.setAttribute("class", "moves-graph-line");
        movesPerTimeGraphSVG.appendChild(path);

        points.forEach(point => {
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", point.x);
            circle.setAttribute("cy", point.y);
            circle.setAttribute("class", "moves-graph-point");
            movesPerTimeGraphSVG.appendChild(circle);
        });
    }
}

// =====================================================================
// Draw Directional Moves Graph (Bar Chart)
// =====================================================================
function drawDirectionalMovesGraph() {
    directionalMovesGraphSVG.innerHTML = ''; 
    const svgWidth = directionalMovesGraphSVG.clientWidth;
    const svgHeight = directionalMovesGraphSVG.clientHeight;
    const padding = 20;

    const totalMoves = directionalMovesCount.Up + directionalMovesCount.Down + directionalMovesCount.Left + directionalMovesCount.Right;

    if (totalMoves === 0) {
        return; 
    }

    const maxMovesInAnyDirection = Math.max(...Object.values(directionalMovesCount));

    const barWidth = (svgWidth - 2 * padding) / directions.length / 1.5; 
    const gap = (svgWidth - 2 * padding - (barWidth * directions.length)) / (directions.length + 1); 

    const yScale = (svgHeight - 2 * padding) / (maxMovesInAnyDirection || 1); 

    directions.forEach((dir, index) => {
        const count = directionalMovesCount[dir];
        const barHeight = count * yScale;
        const x = padding + (index * (barWidth + gap)) + gap;
        const y = svgHeight - padding - barHeight;

        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", x);
        rect.setAttribute("y", y);
        rect.setAttribute("width", barWidth);
        rect.setAttribute("height", barHeight);
        rect.setAttribute("class", "bar-chart-bar");
        rect.setAttribute("rx", "4"); 
        rect.setAttribute("ry", "4");
        directionalMovesGraphSVG.appendChild(rect);

        const labelText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        labelText.setAttribute("x", x + barWidth / 2);
        labelText.setAttribute("y", svgHeight - padding + 15); 
        labelText.setAttribute("text-anchor", "middle");
        labelText.setAttribute("class", "bar-chart-label");
        labelText.textContent = translations[currentLanguage][`direction${dir}`];
        directionalMovesGraphSVG.appendChild(labelText);

        if (count > 0) {
            const countText = document.createElementNS("http://www.w3.org/2000/svg", "text");
            countText.setAttribute("x", x + barWidth / 2);
            countText.setAttribute("y", y - 5); 
            countText.setAttribute("text-anchor", "middle");
            countText.setAttribute("class", "bar-chart-label");
            countText.textContent = count;
            directionalMovesGraphSVG.appendChild(countText);
        }
    });
}


// =====================================================================
// Progress Indicator Functions
// =====================================================================
function updateProgressIndicator() {
    let correctPieces = 0;
    const totalPieces = gridSize * gridSize;
    for (let i = 0; i < puzzlePieces.length; i++) {
        const piece = puzzlePieces[i];
        const currentPieceCol = Math.round(piece.currentX / pieceWidth);
        const currentPieceRow = Math.round(piece.currentY / pieceHeight);
        const currentPieceIndex = currentPieceRow * gridSize + currentPieceCol;
        if (piece.id === currentPieceIndex) {
            correctPieces++;
        }
    }
    const progressPercentage = Math.floor((correctPieces / totalPieces) * 100);
    progressBar.style.width = `${progressPercentage}%`;
    progressText.textContent = `${progressPercentage}%`;
}

// =====================================================================
// Confetti Animation Functions
// =====================================================================
function randomColor() {
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#9e9e9e', '#607d8b'];
    return colors[Math.floor(Math.random() * colors.length)];
}

class ConfettiParticle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = {
            x: (Math.random() - 0.5) * 10,
            y: (Math.random() - 0.5) * 10 - 5
        };
        this.alpha = 1;
        this.gravity = 0.3;
        this.friction = 0.99;
    }

    update() {
        this.velocity.x *= this.friction;
        this.velocity.y *= this.friction;
        this.velocity.y += this.gravity;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.01;
    }

    draw() {
        confettiCtx.save();
        confettiCtx.globalAlpha = this.alpha;
        confettiCtx.beginPath();
        confettiCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        confettiCtx.fillStyle = this.color;
        confettiCtx.fill();
        confettiCtx.restore();
    }
}

function startConfetti() {
    stopConfetti();
    confettiParticles = [];
    const numberOfParticles = 100;
    const centerX = confettiCanvas.width / 2;
    const centerY = confettiCanvas.height / 2;

    for (let i = 0; i < numberOfParticles; i++) {
        confettiParticles.push(new ConfettiParticle(
            centerX + (Math.random() - 0.5) * 100,
            centerY + (Math.random() - 0.5) * 100,
            Math.random() * 5 + 2,
            randomColor()
        ));
    }

    function animateConfetti() {
        confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        for (let i = confettiParticles.length - 1; i >= 0; i--) {
            const particle = confettiParticles[i];
            particle.update();
            particle.draw();

            if (particle.alpha <= 0.1 || particle.y > confettiCanvas.height) {
                confettiParticles.splice(i, 1);
            }
        }

        if (confettiParticles.length > 0) {
            confettiAnimationId = requestAnimationFrame(animateConfetti);
        } else {
            stopConfetti();
        }
    }
    animateConfetti();
}

function stopConfetti() {
    if (confettiAnimationId) {
        cancelAnimationFrame(confettiAnimationId);
        confettiAnimationId = null;
    }
    confettiParticles = [];
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
}

// =====================================================================
// Initial Page Load Setup
// =====================================================================
window.onload = async () => {
    loadPreferences();
    loadPlayerStatistics();
    updateTextContent();
    updatePlayerStatisticsDisplay();

    originalImage.onload = async () => {
        if (originalImage.width === originalImage.height) {
            initializePuzzle(0, 0, originalImage.width, originalImage.height);
        } else {
            setupCroppingInterface();
        }
    };
    originalImage.onerror = () => {
        showMessageBox("failedLoadImage");
        const placeholderText = translations[currentLanguage].uploadPhoto.replace(':', '') + `\n(${gridSize}x${gridSize})`;
        const placeholderSize = fixedCanvasSize;
        // Ensure crossOrigin is set for placeholder image as well
        originalImage.crossOrigin = 'Anonymous'; 
        originalImage.src = `https://placehold.co/${placeholderSize}x${placeholderSize}/e0e7ff/4f46e5?text=${encodeURIComponent(placeholderText)}`;
        enableAllButtons();
    };
    const placeholderText = translations[currentLanguage].uploadPhoto.replace(':', '') + `\n(${gridSize}x${gridSize})`;
    const placeholderSize = fixedCanvasSize; 
    // Ensure crossOrigin is set for placeholder image as well
    originalImage.crossOrigin = 'Anonymous'; 
    originalImage.src = `https://placehold.co/${placeholderSize}x${placeholderSize}/e0e7ff/4f46e5?text=${encodeURIComponent(placeholderText)}`; 
};


