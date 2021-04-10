'use strict';

import { Matrix } from './matrix.js';

export class Board {
    constructor(context, rows, columns) {
        this.context = context;
        this.matrix = new Matrix(rows, columns);
    }

    clearCompleteLines() {
        for (let y = 0; y < this.matrix.rows; y++) {
            for (let x = 0; x < this.matrix.columns; x++) {
                cellState = this.matrix.getValue(x, y);
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
            }
        };

        let mainColor = cellColorSet[cellColor].main;
        let shadedColor = cellColorSet[cellColor].shaded;
        let illuminatedColor = cellColorSet[cellColor].illuminated;

        const pixel = this.context.getImageData(boardX * cellWidth + 2, boardY * cellHeight + 2, 1, 1);
        const pixelColor = `rgba(${pixel.data[0]}, ${pixel.data[1]}, ${pixel.data[2]}, ${pixel.data[3] / 255})`;
        if (pixelColor != mainColor) {
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

    draw() {
        let cellWidth = (this.context.canvas.width / this.matrix.columns) >> 0;
        let cellHeight = (this.context.canvas.height / this.matrix.rows) >> 0;
        let cellState;

        for (let y = 0; y < this.matrix.rows; y++) {
            for (let x = 0; x < this.matrix.columns; x++) {
                cellState = this.matrix.getValue(x, y);
                this.drawCell(x, y, cellWidth, cellHeight, cellState);
            }
        }
    }
}
