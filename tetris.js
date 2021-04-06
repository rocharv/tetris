'use strict';

import { Board } from './board.js';
import { Piece } from './piece.js';

let board;
let canvas;
let currentPiece;
let context;
let lastTime;
let move;

window.onload = init;

function logKey(k) {
    move = currentPiece.tryMove(k.code);
    if (!move && k.code == 'ArrowDown') {
        nextPiece();
    }
}

function nextPiece() {
    currentPiece = new Piece(board, Math.ceil(Math.random() * 6) + 1);
    if (!currentPiece.succeed) {
        return false;
    }
    return true;
}

function init(){
    // Get a reference to the canvas
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    // Board initial state
    board = new Board(context, 20, 10);

    // Keypress event listener
    document.onkeydown = logKey;

    // First piece is taken
    nextPiece();

    // Reset clock
    lastTime = 0;

    // Start the first frame request
    window.requestAnimationFrame(gameLoop);

}

function draw() {
    board.draw();
}

function update(timeStamp) {
    let isDescentTime = (timeStamp - lastTime) > 1000;
    if (isDescentTime) {
        move = currentPiece.tryMove('ArrowDown');
        lastTime = timeStamp;
        if (!move) {
            return nextPiece();
        }
    }
    return true;
}

function gameLoop(timeStamp) {
    if (!update(timeStamp)) {
        alert("Game Over!");
        init();
    }

    draw();
    window.requestAnimationFrame(gameLoop);
}
