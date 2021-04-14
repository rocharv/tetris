'use strict';

import { Matrix } from './matrix.js';

export class Board {
    constructor(context, rows, columns) {
        this.context = context;
        this.matrix = new Matrix(rows, columns);
    }

    clearCompleteRows() {
        let completeRows = this.getCompleteRows();
        if (completeRows.length > 0) {
            this.compactRowsDown(completeRows);
        }
    }

    compactRowsDown(completeRows) {
        let tempMatrix = new Matrix(this.matrix.rows, this.matrix.columns);
        let ty = this.matrix.rows;

        for (let y = this.matrix.rows; y >= 0; y--) {
            if (!completeRows.includes(y)) {
                for (let x = 0; x < this.matrix.columns; x++) {
                    tempMatrix.setValue(
                        x,
                        ty,
                        this.matrix.getValue(x, y)
                    );
                }
                ty--;
            }
        }
        this.matrix.setFromArray(tempMatrix.get());
    }

    draw() {
        let cellHeight = (this.context.canvas.height / this.matrix.rows) >> 0;
        let cellWidth = (this.context.canvas.width / this.matrix.columns) >> 0;
        let cellState;

        for (let y = 0; y < this.matrix.rows; y++) {
            for (let x = 0; x < this.matrix.columns; x++) {
                cellState = this.matrix.getValue(x, y);
                this.drawCell(x, y, cellWidth, cellHeight, cellState);
            }
        }
    }

    drawCell(boardX, boardY, cellWidth, cellHeight, cellColor) {
        const cellColorSet = {
            0: {
                'main': 'rgba(15, 15, 15, 1)',
                'shaded': 'rgba(0, 0, 0, 1)',
                'illuminated': 'rgba(31, 31, 31, 1)'
            },
            1: {
                'main': 'rgba(0, 191, 191, 1)',
                'shaded': 'rgba(0, 127, 127, 1)',
                'illuminated': 'rgba(0, 255, 255, 1)'
            },
            2: {
                'main': 'rgba(0, 0, 191, 1)',
                'shaded': 'rgba(0, 0, 127, 1)',
                'illuminated': 'rgba(0, 0, 255, 1)'
            },
            3: {
                'main': 'rgba(191, 127, 0, 1)',
                'shaded': 'rgba(127, 63, 0, 1)',
                'illuminated': 'rgba(255, 191, 0, 1)'
            },
            4: {
                'main': 'rgba(0, 191, 0, 1)',
                'shaded': 'rgba(0, 127, 0, 1)',
                'illuminated': 'rgba(0, 255, 0, 1)'
            },
            5: {
                'main': 'rgba(191, 0, 0, 1)',
                'shaded': 'rgba(127, 0, 0, 1)',
                'illuminated': 'rgba(255, 0, 0, 1)'
            },
            6: {
                'main': 'rgba(191, 0, 191, 1)',
                'shaded': 'rgba(127, 0, 127, 1)',
                'illuminated': 'rgba(255, 0, 255, 1)'
            },
            7: {
                'main': 'rgba(191, 191, 0, 1)',
                'shaded': 'rgba(127, 127, 0, 1)',
                'illuminated': 'rgba(255, 255, 0, 1)'
            },
            11: {
                'main': 'rgba(0, 95, 95, 1)',
                'shaded': 'rgba(0, 63, 63, 1)',
                'illuminated': 'rgba(0, 127, 127, .1)'
            },
            12: {
                'main': 'rgba(0, 0, 95, 1)',
                'shaded': 'rgba(0, 0, 63, 1)',
                'illuminated': 'rgba(0, 0, 127, .1)'
            },
            13: {
                'main': 'rgba(95, 63, 0, 1)',
                'shaded': 'rgba(63, 31, 0, 1)',
                'illuminated': 'rgba(127, 95, 0, .1)'
            },
            14: {
                'main': 'rgba(0, 95, 0, 1)',
                'shaded': 'rgba(0, 63, 0, 1)',
                'illuminated': 'rgba(0, 127, 0, .1)'
            },
            15: {
                'main': 'rgba(95, 0, 0, 1)',
                'shaded': 'rgba(63, 0, 0, 1)',
                'illuminated': 'rgba(127, 0, 0, .1)'
            },
            16: {
                'main': 'rgba(95, 0, 95, 1)',
                'shaded': 'rgba(63, 0, 63, 1)',
                'illuminated': 'rgba(127, 0, 127, .1)'
            },
            17: {
                'main': 'rgba(95, 95, 0, 1)',
                'shaded': 'rgba(63, 63, 0, 1)',
                'illuminated': 'rgba(127, 127, 0, .1)'
            }
        };
        let illuminatedColor = cellColorSet[cellColor].illuminated;
        let mainColor = cellColorSet[cellColor].main;
        let shadedColor = cellColorSet[cellColor].shaded;

        const pixel = this.context.getImageData(boardX * cellWidth + 2, boardY * cellHeight + 2, 1, 1);
        const pixelColor = `rgba(${pixel.data[0]}, ${pixel.data[1]}, ${pixel.data[2]}, ${pixel.data[3] / 255})`;
        if (pixelColor != illuminatedColor) {

            this.context.fillStyle = mainColor;
            this.context.fillRect(boardX * cellWidth + 2, boardY * cellHeight + 2, cellWidth - 2, cellHeight - 2);

            this.context.fillStyle = shadedColor;
            this.context.fillRect(boardX * cellWidth + 2, boardY * cellHeight + cellHeight - 2, cellWidth - 2, 2);
            this.context.fillRect(boardX * cellWidth + cellWidth - 2, boardY * cellHeight + 2, 2, cellHeight - 2);

            this.context.fillStyle = illuminatedColor;
            this.context.fillRect(boardX * cellWidth + 2, boardY * cellHeight + 2, cellWidth - 2, 2);
            this.context.fillRect(boardX * cellWidth + 2, boardY * cellHeight + 2, 2, cellHeight - 2);
        }
    }

    getCompleteRows() {
        let cellState;
        let isFullRow;
        let fullRows = [];
        for (let y = 0; y < this.matrix.rows; y++) {
            isFullRow = true;
            for (let x = 0; x < this.matrix.columns; x++) {
                cellState = this.matrix.getValue(x, y);
                if (cellState == 0) {
                    isFullRow = false;
                    break;
                }
            }
            if (isFullRow) {
                fullRows.push(y);
            }
        }

        return fullRows;
    }
}
