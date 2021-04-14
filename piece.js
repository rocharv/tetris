'use strict';

import { Matrix } from './matrix.js';

export class Piece {
    constructor(board, pieceId) {
        this.board = board;
        this.pieceId = pieceId;
        this.pieceShadowId = pieceId + 10;
        this.shadowY = 0;
        this.successfullyPlaced = true;
        this.x = 3;
        this.y = 0;

        const pieceSet = [
            [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0]
            ],
            [
                [0, 0, 2],
                [0, 0, 2],
                [0, 2, 2]
            ],
            [
                [3, 0, 0],
                [3, 0, 0],
                [3, 3, 0]
            ],
            [
                [0, 0, 0],
                [0, 4, 4],
                [4, 4, 0]
            ],
            [
                [0, 0, 0],
                [5, 5, 0],
                [0, 5, 5]
            ],
            [
                [0, 0, 0],
                [0, 6, 0],
                [6, 6, 6]
            ],
            [
                [7, 7],
                [7, 7]
            ]
        ];
        const pieceSetIndex = this.pieceId - 1;

        const invalidPieceId = (this.pieceId < 1 || this.pieceId > pieceSet.length);
        if (invalidPieceId) {
            return;
        }

        this.pieceSize = pieceSet[pieceSetIndex].length;
        this.matrix = new Matrix(this.pieceSize, this.pieceSize);
        this.matrix.setFromArray(pieceSet[pieceSetIndex]);

        let addedToBoardFirstTime = this.tryTranslate(this.x, this.y);
        if (!addedToBoardFirstTime) {
            this.successfullyPlaced = false;
        }
    }

    addShadowToBoard() {
        this.shadowY = this.y;

        while (this.isFree(this.matrix, this.x, this.shadowY + 1)) {
            this.shadowY++;
        }

        this.addToBoardAndDraw(this.x, this.shadowY, this.pieceShadowId);
        this.addToBoardAndDraw(this.x, this.y, this.pieceId);
    }

    addToBoardAndDraw(newX, newY, value) {
        for (let py = 0; py < this.pieceSize; py++) {
            for (let px = 0; px < this.pieceSize; px++) {
                if (this.matrix.getValue(px, py) != 0) {
                    this.board.matrix.setValue(
                        newX + px,
                        newY + py,
                        value
                    );
                }
            }
        }
        this.board.draw();
    }

    drop() {
        this.removeFromBoard(this.x, this.y);
        this.removeFromBoard(this.x, this.shadowY);
        let tempY = this.y;
        while (this.isFree(this.matrix, this.x, tempY + 1)) {
            tempY++;
        }

        this.y = tempY;
        this.addToBoardAndDraw(this.x, this.y, this.pieceId);

        return true;
    }

    isFree(pieceMatrix, x, y) {
        let free = true;
        for (let py = 0; py < this.pieceSize; py++) {
            if (!free){
                break;
            }
            for (let px = 0; px < this.pieceSize; px++) {
                if (pieceMatrix.getValue(px, py) != 0 &&
                    (this.board.matrix.getValue(x + px, y + py) != 0 ||
                    x + px < 0 ||
                    y + py < 0 ||
                    x + px > this.board.matrix.columns -1 ||
                    y + py > this.board.matrix.rows - 1)) {
                    free = false;
                    break;
                }
            }
        }
        return free;
    }

    removeFromBoard(x, y) {
        this.addToBoardAndDraw(x, y, 0);
    }

    tryMove(keyPressed) {
        this.removeFromBoard(this.x, this.y);
        this.removeFromBoard(this.x, this.shadowY);

        switch(keyPressed) {
            case 'ArrowDown':
                return this.tryTranslate(this.x, this.y + 1);
            case 'ArrowLeft':
                return this.tryTranslate(this.x - 1, this.y);
            case 'ArrowRight':
                return this.tryTranslate(this.x + 1, this.y);
            case 'ArrowUp':
                return this.tryRotate(true);
            case 'KeyB':
                return this.tryRotate(true);
            case 'KeyV':
                return this.tryRotate(false);
            case 'Space':
                return this.drop();
            default:
                this.addShadowToBoard();
                return false;
        }
    }

    tryRotate(isClockWise) {
        let tempMatrix = new Matrix(this.pieceSize, this.pieceSize);

        for (let py = 0; py < this.pieceSize; py++) {
            for (let px = 0; px < this.pieceSize; px++) {
                if (isClockWise) {
                    tempMatrix.setValue(
                        px,
                        py,
                        this.matrix.getValue(py, this.pieceSize - 1 - px)
                        );
                    } else {
                        tempMatrix.setValue(
                            px,
                            py,
                            this.matrix.getValue(this.pieceSize - 1 - py, px)
                            );
                        }
                    }
                }

        if (!this.isFree(tempMatrix, this.x, this.y)) {
            this.addShadowToBoard();
            this.addToBoardAndDraw(this.x, this.y, this.pieceId);
            return false;
        }

        this.matrix.setFromArray(tempMatrix.get());
        this.addShadowToBoard();
        this.addToBoardAndDraw(this.x, this.y, this.pieceId);

        return true;
    }

    tryTranslate(newX, newY) {
        if (!this.isFree(this.matrix, newX, newY)) {
            this.addShadowToBoard();
            this.addToBoardAndDraw(this.x, this.y, this.pieceId);
            return false;
        }

        this.x = newX;
        this.y = newY;

        this.addShadowToBoard();
        this.addToBoardAndDraw(this.x, this.y, this.pieceId);

        return true;
    }
}
