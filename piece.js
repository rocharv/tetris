'use strict';

import { Matrix } from './matrix.js';

export class Piece {
    constructor(board, pieceId) {
        this.board = board;
        this.pieceId = pieceId;
        this.x = 3;
        this.y = 0;

        const pieces = [
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

        const invalidPieceId = (this.pieceId < 1 || this.pieceId > pieces.length);
        if (invalidPieceId) {
            return;
        }

        this.matrix = new Matrix(pieces[this.pieceId - 1].length, pieces[this.pieceId - 1][0].length);
        this.matrix.setFromArray(pieces[this.pieceId - 1]);
        this.height = this.matrix.rows;
        this.width =  this.matrix.columns;
    }

    rotate(isClockWise) {
        let tempMatrix = new Matrix(this.height, this.width);

        const oPiece = this.pieceId == 7;
        if (oPiece) {
            return;
        }

        for (let py = 0; py < this.height; py++) {
            for (let px = 0; px < this.width; px++) {
                if (isClockWise) {
                    // temp[py][px] = this.matrix[3-px][py];
                    tempMatrix.setValue(
                        px,
                        py,
                        this.matrix.getValue(py, this.height-1-px)
                    );
                } else {
                    // temp[py][px] = this.matrix[px][3-py];
                    tempMatrix.setValue(
                        px,
                        py,
                        this.matrix.getValue(this.width-1-py, px)
                    );
                }
            }
        }

        this.removeFromBoard(this.x, this.y);

        if (this.isFree(tempMatrix, this.x, this.y)) {
            this.matrix.setFromArray(tempMatrix.get());
        }

        this.addToBoard(this.x, this.y);

    }

    isFree(pieceMatrix, x, y) {
        let free = true;
        for (let py = 0; py < this.height; py++) {
            if (!free){
                break;
            }
            for (let px = 0; px < this.width; px++) {
                if (pieceMatrix.getValue(px, py) !=0 &&
                    (this.board.matrix.getValue(x+px, y+py) != 0 ||
                    x+px < 0 ||
                    y+py < 0)) {
                    free = false;
                    break;
                }
            }
        }
        return free;
    }

    addToBoard(x, y) {
        this.removeFromBoard(this.x, this.y);

        if (!this.isFree(this.matrix, x, y)) {
            this.addToBoard(this.x, this.y);
            return;
        }

        for (let py = 0; py < this.height; py++) {
            for (let px = 0; px < this.width; px++) {
                if (this.matrix.getValue(px, py) != 0) {
                    this.board.matrix.setValue(
                        x + px,
                        y + py,
                        this.matrix.getValue(px, py)
                    );
                }
            }
        }

        this.x = x;
        this.y = y;
    }

    removeFromBoard(x, y) {
        for (let py = 0; py < this.height; py++) {
            for (let px = 0; px < this.width; px++) {
                if (this.matrix.getValue(px, py) != 0) {
                    this.board.matrix.setValue(
                       x + px,
                        y + py,
                        0
                    );
                }
            }
        }
    }

    move(keyPressed) {
        const newMove = {
            'ArrowDown': {
                'x': this.x,
                'y': this.y + 1,
            },
            'ArrowLeft': {
                'x': this.x - 1,
                'y': this.y,
            },
            'ArrowRight': {
                'x': this.x + 1,
                'y': this.y
            }
        }

        if (keyPressed == 'ArrowUp') {
            this.rotate(true);
            return;
        }

        if (!(keyPressed in newMove)) {
            return;
        }

        this.addToBoard(newMove[keyPressed].x, newMove[keyPressed].y);
        this.board.draw();
    }
}
