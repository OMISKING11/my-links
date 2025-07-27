const chessboard = document.getElementById('chessboard');
let currentTurn = 'white'; // Track whose turn it is
let originalSquare; // Track the original square of the dragged piece
let whiteKingMoved = false; // Track if the white king has moved
let blackKingMoved = false; // Track if the black king has moved
let whiteRookMoved = [false, false]; // Track if the white rooks have moved
let blackRookMoved = [false, false]; // Track if the black rooks have moved

// Create the chessboard squares
for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
        const square = document.createElement('div');
        square.classList.add('square');
        // Alternate colors
        if ((row + col) % 2 === 0) {
            square.classList.add('white');
        } else {
            square.classList.add('black');
        }
        chessboard.appendChild(square);
    }
}

const pieces = {
    'white_pawn': 'images/white_pawn.png',
    'black_pawn': 'images/black_pawn.png',
    'white_rook': 'images/white_rook.png',
    'black_rook': 'images/black_rook.png',
    'white_knight': 'images/white_knight.png',
    'black_knight': 'images/black_knight.png',
    'white_bishop': 'images/white_bishop.png',
    'black_bishop': 'images/black_bishop.png',
    'white_queen': 'images/white_queen.png',
    'black_queen': 'images/black_queen.png',
    'white_king': 'images/white_king.png',
    'black_king': 'images/black_king.png',
};

// Function to place pieces on the board
function placePieces() {
    // Place pawns
    for (let i = 0; i < 8; i++) {
        const whitePawn = createPiece('white_pawn');
        document.querySelectorAll('.square')[6 * 8 + i].appendChild(whitePawn); // 2nd row for white pawns

        const blackPawn = createPiece('black_pawn');
        document.querySelectorAll('.square')[1 * 8 + i].appendChild(blackPawn); // 7th row for black pawns
    }

    // Place rooks
    document.querySelectorAll('.square')[0].appendChild(createPiece('black_rook'));
    document.querySelectorAll('.square')[7].appendChild(createPiece('black_rook'));
    document.querySelectorAll('.square')[56].appendChild(createPiece('white_rook'));
    document.querySelectorAll('.square')[63].appendChild(createPiece('white_rook'));

    // Place knights
    document.querySelectorAll('.square')[1].appendChild(createPiece('black_knight'));
    document.querySelectorAll('.square')[6].appendChild(createPiece('black_knight'));
    document.querySelectorAll('.square')[57].appendChild(createPiece('white_knight'));
    document.querySelectorAll('.square')[62].appendChild(createPiece('white_knight'));

    // Place bishops
    document.querySelectorAll('.square')[2].appendChild(createPiece('black_bishop'));
    document.querySelectorAll('.square')[5].appendChild(createPiece('black_bishop'));
    document.querySelectorAll('.square')[58].appendChild(createPiece('white_bishop'));
    document.querySelectorAll('.square')[61].appendChild(createPiece('white_bishop'));

    // Place queens
    document.querySelectorAll('.square')[3].appendChild(createPiece('black_queen'));
    document.querySelectorAll('.square')[59].appendChild(createPiece('white_queen'));

    // Place kings
    document.querySelectorAll('.square')[4].appendChild(createPiece('black_king'));
    document.querySelectorAll('.square')[60].appendChild(createPiece('white_king'));
}

// Function to create a piece
function createPiece(type) {
    const piece = document.createElement('img');
    piece.src = pieces[type];
    piece.draggable = true;
    piece.addEventListener('dragstart', dragStart);
    return piece;
}

// Drag and drop functions
function dragStart(event) {
    originalSquare = event.target.parentNode; // Track the original square
    event.dataTransfer.setData('text/plain', event.target.src);
}

document.querySelectorAll('.square').forEach(square => {
    square.addEventListener('drop', event => {
        event.preventDefault();
        const pieceSrc = event.dataTransfer.getData('text/plain');
        const pieceType = pieceSrc.includes('white') ? 'white' : 'black';

        // Check if the square contains an opponent's piece
        const existingPiece = square.querySelector('img');
        if (existingPiece && existingPiece.src.includes(pieceType === 'white' ? 'black' : 'white')) {
            square.removeChild(existingPiece); // Capture the opponent's piece
        }

        // Validate move based on current turn
        if ((currentTurn === 'white' && pieceType === 'white') || (currentTurn === 'black' && pieceType === 'black')) {
            const img = document.createElement('img');
            img.src = pieceSrc;
            img.draggable = true;
            img.addEventListener('dragstart', dragStart);
            square.appendChild(img);
            currentTurn = currentTurn === 'white' ? 'black' : 'white'; // Switch turn

            // Remove the original piece
            const originalSquare = document.querySelector(`img[src="${pieceSrc}"]`).parentNode;
            originalSquare.removeChild(document.querySelector(`img[src="${pieceSrc}"]`));
        }
    });
});


// Call the function to place pieces
placePieces();
