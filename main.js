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
                [0, 0, 0, 0]
                [0, 6, 0, 0]
                [6, 6, 6, 0]
                [0, 0, 0, 0]
            ],
            [
                [7, 7, 0, 0],
                [7, 7, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ]
        ];

        if (pieceId < 0 || pieceId > pieces.length - 1) {
            return;
        }
        this.piece = piece[pieceId];
    }

    draw(){

    }
}

class Board {
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.matrix = [];
        for (let i = 0; i < rows; i++) {
            this.matrix[i] = [];
            for (let j = 0; j < columns; j++) {
                this.matrix[i][j] = 0;
            }
        }
    }

    draw(context) {
        let cellWidth = (context.canvas.width / this.columns) >> 0;
        let cellHeight = (context.canvas.height / this.rows) >> 0;
        for (let row = 0; row < this.rows; row++) {
            for (let column = 0; column < this.columns; column++) {
                if (this.matrix[row][column] != 0) {
                    context.fillStyle = '#0000FF';
                    context.fillRect(column * cellWidth + 2, row * cellHeight + 2, cellWidth - 2, cellHeight - 2);

                    context.fillStyle = '#0000AA';
                    context.fillRect(column * cellWidth + 2, row * cellHeight + cellHeight - 2, cellWidth - 2, 2);
                    context.fillRect(column * cellWidth + cellWidth - 2, row * cellHeight + 2, 2, cellHeight - 2);

                    context.fillStyle = '#0044FF';
                    context.fillRect(column * cellWidth + 2, row * cellHeight + 2, cellWidth - 2, 2);
                    context.fillRect(column * cellWidth + 2, row * cellHeight + 2, 2, cellHeight - 2);
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

let rectX = 0;
let rectY = 0;

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
    draw();

    // window.requestAnimationFrame(gameLoop);
}