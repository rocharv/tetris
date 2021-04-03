'use strict';

class Piece {
    constructor(pieceId) {
        this.pieceId = pieceId;

        const pieces = [
            [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0]
            ],
            [
                [0, 2, 0, 0],
                [0, 2, 0, 0],
                [2, 2, 0, 0],
                [0, 0, 0, 0]
            ],
            [
                [0, 3, 0, 0],
                [0, 3, 0, 0],
                [0, 3, 3, 0],
                [0, 0, 0, 0]
            ],
            [
                [0, 0, 0, 0],
                [0, 4, 4, 0],
                [4, 4, 0, 0],
                [0, 0, 0, 0]
            ],
            [
                [0, 0, 0, 0],
                [5, 5, 0, 0],
                [0, 5, 5, 0],
                [0, 0, 0, 0]
            ],
            [
                [0, 0, 0, 0],
                [0, 6, 0, 0],
                [6, 6, 6, 0],
                [0, 0, 0, 0]
            ],
            [
                [7, 7, 0, 0],
                [7, 7, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ]
        ];

        const invalidPieceId = (this.pieceId < 1 || this.pieceId > pieces.length);
        if (invalidPieceId) {
            return;
        }

        this.matrix = pieces[this.pieceId - 1];
        this.pieceHeight = this.matrix.length;
        this.pieceWidth =  this.matrix[0].length;
        console.log(this.matrix);
    }

    rotate(isClockWise) {
        let temp = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];

        const oPiece = this.pieceId == 7;
        if (oPiece) {
            return
        }

        for (let py = 0; py < this.pieceHeight; py++) {
            for (let px = 0; px < this.pieceWidth; px++) {
                if (isClockWise) {
                    temp[py][px] = this.matrix[3-px][py];
                } else {
                    temp[py][px] = this.matrix[px][3-py];
                }
            }
        }
        this.matrix = temp;
    }

    put(Board, x, y){
        for (let py = 0; py < this.pieceWidth; py++) {
            for (let px = 0; px < this.pieceWidth; px++) {
                Board.setState(x + px, y + py, this.matrix[py][px])
            }
        }
    }
}

class Board {
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.buildMatrix();
    }

    buildMatrix() {
        this.matrix = [];
        for (let x = 0; x < this.rows; x++) {
            this.matrix[x] = [];
            for (let y = 0; y < this.columns; y++) {
                this.matrix[x][y] = 0;
            }
        }
    }

    isValidCoordinates(x, y) {
        return (
            x >= 0 &&
            x < this.columns &&
            y >= 0 &&
            y < this.rows
        );
    }

    setState(x, y, state) {
        if (!this.isValidCoordinates(x, y)) {
            return;
        }
        this.matrix[y][x] = state;
    }

    getState(coordX, coordY) {
        if (!this.isValidCoordinates(coordX, coordY)) {
            return;
        }
        return this.matrix[coordY][coordX];
    }

    drawCell(boardX, boardY, cellWidth, cellHeight, cellState) {
        const colorState = {
            1: {
                main: '#00bfbf',
                shaded: '#007f7f',
                illuminated: '#00ffff'
            },
            2: {
                main: '#0000bf',
                shaded: '#00007f',
                illuminated: '#0000ff'
            },
            3: {
                main: '#bf7f00',
                shaded: '#7f3f00',
                illuminated: '#ffbf00'
            },
            4: {
                main: '#00bf00',
                shaded: '#007f00',
                illuminated: '#00ff00'
            },
            5: {
                main: '#bf0000',
                shaded: '#7f0000',
                illuminated: '#ff0000'
            },
            6: {
                main: '#bf00bf',
                shaded: '#7f007f',
                illuminated: '#ff00ff'
            },
            7: {
                main: '#bfbf00',
                shaded: '#7f7f00',
                illuminated: '#ffff00'
            }
        };

        let mainColor = colorState[cellState].main;
        let shadedColor = colorState[cellState].shaded;
        let illuminatedColor = colorState[cellState].illuminated;

        context.fillStyle = mainColor;
        context.fillRect(boardY * cellWidth + 2, boardX * cellHeight + 2, cellWidth - 2, cellHeight - 2);

        context.fillStyle = shadedColor;
        context.fillRect(boardY * cellWidth + 2, boardX * cellHeight + cellHeight - 2, cellWidth - 2, 2);
        context.fillRect(boardY * cellWidth + cellWidth - 2, boardX * cellHeight + 2, 2, cellHeight - 2);

        context.fillStyle = illuminatedColor;
        context.fillRect(boardY * cellWidth + 2, boardX * cellHeight + 2, cellWidth - 2, 2);
        context.fillRect(boardY * cellWidth + 2, boardX * cellHeight + 2, 2, cellHeight - 2);
}

    draw(context) {
        let cellWidth = (context.canvas.width / this.columns) >> 0;
        let cellHeight = (context.canvas.height / this.rows) >> 0;
        let cellState;

        for (let y = 0; y < this.columns; y++) {
            for (let x = 0; x < this.rows; x++) {
                cellState = this.getState(y, x);
                if (cellState != 0) {
                    this.drawCell(x, y, cellWidth, cellHeight, cellState);
                }
            }
        }
    }
}

let board = new Board(20, 10);
board.matrix = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0 ,0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0 ,0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0 ,0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0 ,0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0 ,0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0 ,0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0 ,0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0 ,0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0 ,0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0 ,0],
    [0, 0, 3, 3, 0, 0, 0, 0, 0 ,0],
    [2, 2, 2, 3, 0, 3, 3, 3, 3 ,3],
    [3, 0, 2, 3, 0, 3, 0, 0, 6 ,3],
    [3, 6, 6, 6, 0, 2, 2, 6, 6 ,3],
    [3, 3, 6, 0, 0, 2, 5, 5, 6 ,0],
    [2, 2, 0, 0, 0, 2, 5, 5, 5 ,1],
    [2, 7, 7, 1, 0, 5, 5, 4, 4 ,1],
    [2, 7, 7, 1, 0, 5, 4, 4, 0 ,1],
    [7, 7, 0, 1, 0, 0, 6, 5, 5 ,1],
    [7, 7, 0, 1, 0, 6, 6, 6, 5 ,5]
];

let canvas;
let context;

let currentPiece = new Piece(1);
currentPiece.rotate(true);


window.onload = init;

function init(){
    // Get a reference to the canvas
    canvas = document.getElementById('board');
    context = canvas.getContext('2d');

    // Start the first frame request
    window.requestAnimationFrame(gameLoop);

}

function draw() {
    board.draw(context);
}

function update() {
}

function gameLoop(timeStamp) {
    currentPiece.put(board, 0, 0);
    draw();

    // window.requestAnimationFrame(gameLoop);
}
