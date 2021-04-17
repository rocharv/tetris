'use strict';

import { Board } from './board.js';
import { Piece } from './piece.js';
import { RandomGenerator } from './random_generator.js';

let board;
let canvas;
let currentPiece;
let context;
let lastTime;
let move;
let randomGenerator;

window.onload = init;

function draw() {
    board.draw();
}

function gameLoop(timeStamp) {
    if (!update(timeStamp)) {
        gameOver();
        return;
    }

    draw();
    window.requestAnimationFrame(gameLoop);
}

function gameOver() {
    if (confirm("Game Over!\n\nDo you want to play again?")) {
        init();
    } else {
        return;
    }
}

function init() {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    board = new Board(context, 20, 10);

    randomGenerator = new RandomGenerator(1, 7, 2);

    document.onkeydown = logKey;

    nextPiece();

    lastTime = 0;

    window.requestAnimationFrame(gameLoop);
}

function logKey(k) {
    move = currentPiece.tryMove(k.code);
    if (!move && k.code == 'ArrowDown' || k.code == 'Space') {
        nextPiece();
    }
}

function nextPiece() {
    board.clearCompleteRows();

    currentPiece = new Piece(board, randomGenerator.getNextNumber());
    if (!currentPiece.successfullyPlaced) {
        return false;
    }

    return true;
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
