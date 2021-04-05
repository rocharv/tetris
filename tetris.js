'use strict';

import { Board } from './board.js';
import { Piece } from './piece.js';

let board;
let canvas;
let currentPiece;
let context;

window.onload = init;

function logKey(k) {
    currentPiece.move(k.code);
}

function init(){
    // Get a reference to the canvas
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    // Board initial state
    board = new Board(context, 20, 10);
    board.matrix.setFromArray([
        [0, 0, 0, 0, 0, 0, 0, 0, 0 ,0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0 ,0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0 ,0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0 ,0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0 ,0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0 ,0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0 ,0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0 ,0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0 ,0],
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
    ]);

    // Keypress event listener
    document.onkeydown = logKey;

    // First piece is taken
    currentPiece = new Piece(board, 6);

    // Start the first frame request
    window.requestAnimationFrame(gameLoop);

}


function draw() {
    board.draw();
}

function update(timeStamp) {
}

function gameLoop(timeStamp) {
    draw();

    window.requestAnimationFrame(gameLoop);
}
