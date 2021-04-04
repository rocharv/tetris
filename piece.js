'use strict';

import { Matrix } from './matrix.js';

export class Piece {
    constructor(pieceId) {
        this.pieceId = pieceId;
        this.matrix = new Matrix(4, 4);

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

        this.matrix.setFromArray(pieces[this.pieceId - 1]);
        this.height = this.matrix.rows;
        this.width =  this.matrix.columns;
    }

    rotate(isClockWise) {
        let tempMatrix = new Matrix(this.height, this.width);

        const oPiece = this.pieceId == 7;
        if (oPiece) {
            return
        }

        for (let py = 0; py < this.height; py++) {
            for (let px = 0; px < this.width; px++) {
                if (isClockWise) {
                    // temp[py][px] = this.matrix[3-px][py];
                    tempMatrix.setValue(
                        px,
                        py,
                        this.matrix.getValue(py, 3-px)
                    );
                } else {
                    // temp[py][px] = this.matrix[px][3-py];
                    tempMatrix.setValue(
                        px,
                        py,
                        this.matrix.getValue(3-py, px)
                    );
                }
            }
        }
        this.matrix.setFromArray(tempMatrix.get());
    }

    put(board, x, y){
        for (let py = 0; py < this.height; py++) {
            for (let px = 0; px < this.width; px++) {
                board.matrix.setValue(
                    x + px,
                    y + py,
                    this.matrix.getValue(px, py)
                )
            }
        }
    }
}
