'use strict';

import { Board } from './board.js';
import { Piece } from './piece.js';
import { RandomGenerator } from './random_generator.js';
import { Score } from './score.js';
import { Speed } from './speed.js';

let board;
let boardCanvas;
let boardContext;
let currentPiece;
let isGameOver = false;
let lastTime;
let move;
let nextPiece;
let nextPieceBoard;
let nextPieceBoardCanvas;
let nextPieceBoardContext;
let randomGenerator;
let score;
let speed;

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
        isGameOver = true;
        return;
    }
}

function init() {

    speed = new Speed();
    score = new Score('scoreParagraph', 'levelParagraph', 'linesParagraph', speed);

    boardCanvas = document.getElementById('boardCanvas');
    boardContext = boardCanvas.getContext('2d');
    board = new Board(boardContext, 20, 10, score);

    nextPieceBoardCanvas = document.getElementById('nextPieceBoardCanvas');
    nextPieceBoardContext = nextPieceBoardCanvas.getContext('2d');
    nextPieceBoard = new Board(nextPieceBoardContext, 4, 4, score);

    nextPiece = new Piece(nextPieceBoard, 1, 0, 0, false);

    randomGenerator = new RandomGenerator(1, 7, 2);


    document.onkeydown = logKey;

    newPiece();

    lastTime = 0;

    window.requestAnimationFrame(gameLoop);
}

function logKey(k) {
    move = currentPiece.tryMove(k.code);
    if (!isGameOver &&
        (!move && k.code == 'ArrowDown'
        || k.code == 'Space')) {
        newPiece();
    }
}

function newPiece() {
    board.clearCompleteRows();

    currentPiece = new Piece(board, randomGenerator.getNextNumber(), 3, 0);
    if (!currentPiece.successfullyPlaced) {
        return false;
    }

    return true;
}

function update(timeStamp) {
    let isDescentTime = (timeStamp - lastTime) > speed.getDelay();
    if (isDescentTime) {
        move = currentPiece.tryMove('ArrowDown');
        lastTime = timeStamp;
        if (!move) {
            return newPiece();
        }
    }

    return true;
}
