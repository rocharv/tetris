'use strict';

class Piece {
    constructor(pieceId) {
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

        const invalidPieceId = (pieceId < 0 || pieceId > pieces.length - 1);
        if (invalidPieceId) {
            return;
        }

        this.matrix = pieces[pieceId - 1];
        this.pieceHeight = this.matrix.length;
        this.pieceWidth =  this.matrix[0].length;
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


    drawCell(x, y, cellWidth, cellHeight) {
        context.fillStyle = '#0000FF';
        context.fillRect(y * cellWidth + 2, x * cellHeight + 2, cellWidth - 2, cellHeight - 2);

        context.fillStyle = '#0000AA';
        context.fillRect(y * cellWidth + 2, x * cellHeight + cellHeight - 2, cellWidth - 2, 2);
        context.fillRect(y * cellWidth + cellWidth - 2, x * cellHeight + 2, 2, cellHeight - 2);

        context.fillStyle = '#0044FF';
        context.fillRect(y * cellWidth + 2, x * cellHeight + 2, cellWidth - 2, 2);
        context.fillRect(y * cellWidth + 2, x * cellHeight + 2, 2, cellHeight - 2);
}

    draw(context) {
        let cellWidth = (context.canvas.width / this.columns) >> 0;
        let cellHeight = (context.canvas.height / this.rows) >> 0;

        for (let y = 0; y < this.columns; y++) {
            for (let x = 0; x < this.rows; x++) {
                if (this.getState(y, x) != 0) {
                    this.drawCell(x, y, cellWidth, cellHeight);
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

    [0, 0, 0, 0, 0, 0, 0, 0, 0 ,0],
    [1, 1, 1, 1, 0, 1, 1, 1, 1 ,1],
    [1, 1, 1, 1, 0, 1, 1, 1, 1 ,1],
    [1, 1, 1, 1, 0, 1, 1, 1, 1 ,1],
    [1, 1, 1, 1, 0, 1, 1, 1, 1 ,1],

    [1, 1, 1, 1, 0, 1, 1, 1, 1 ,1],
    [1, 1, 1, 1, 0, 1, 1, 1, 1 ,1],
    [1, 1, 1, 1, 0, 1, 1, 1, 1 ,1],
    [1, 1, 1, 1, 0, 1, 1, 1, 1 ,1],
    [1, 1, 1, 1, 0, 1, 1, 1, 1 ,1]

];

let canvas;
let context;

let currentPiece = new Piece(1);

window.onload = init;

function init(){
    // Get a reference to the canvas
    canvas = document.getElementById('board');
    context = canvas.getContext('2d');

    // Start the first frame request
    window.requestAnimationFrame(gameLoop);

}

function draw() {
    currentPiece.put(board, 0, 0);
    board.draw(context);
}

function update() {
}

function gameLoop(timeStamp) {
    draw();

    // window.requestAnimationFrame(gameLoop);
}
