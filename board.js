'use strict';

import { Matrix } from './matrix.js';

export class Board {
    constructor(context, rows, columns) {
        this.context = context;
        this.matrix = new Matrix(rows, columns);
    }

    drawCell(boardX, boardY, cellWidth, cellHeight, cellState) {
        const colorState = {
            0: {
                'main': '#111111',
                'shaded': '#000000',
                'illuminated': '#222222'
            },
            1: {
                'main': '#00bfbf',
                'shaded': '#007f7f',
                'illuminated': '#00ffff'
            },
            2: {
                'main': '#0000bf',
                'shaded': '#00007f',
                'illuminated': '#0000ff'
            },
            3: {
                'main': '#bf7f00',
                'shaded': '#7f3f00',
                'illuminated': '#ffbf00'
            },
            4: {
                'main': '#00bf00',
                'shaded': '#007f00',
                'illuminated': '#00ff00'
            },
            5: {
                'main': '#bf0000',
                'shaded': '#7f0000',
                'illuminated': '#ff0000'
            },
            6: {
                'main': '#bf00bf',
                'shaded': '#7f007f',
                'illuminated': '#ff00ff'
            },
            7: {
                'main': '#bfbf00',
                'shaded': '#7f7f00',
                'illuminated': '#ffff00'
            }
        };

        let mainColor = colorState[cellState].main;
        let shadedColor = colorState[cellState].shaded;
        let illuminatedColor = colorState[cellState].illuminated;

        this.context.fillStyle = mainColor;
        this.context.fillRect(boardY * cellWidth + 2, boardX * cellHeight + 2, cellWidth - 2, cellHeight - 2);

        this.context.fillStyle = shadedColor;
        this.context.fillRect(boardY * cellWidth + 2, boardX * cellHeight + cellHeight - 2, cellWidth - 2, 2);
        this.context.fillRect(boardY * cellWidth + cellWidth - 2, boardX * cellHeight + 2, 2, cellHeight - 2);

        this.context.fillStyle = illuminatedColor;
        this.context.fillRect(boardY * cellWidth + 2, boardX * cellHeight + 2, cellWidth - 2, 2);
        this.context.fillRect(boardY * cellWidth + 2, boardX * cellHeight + 2, 2, cellHeight - 2);
}

    draw() {
        let cellWidth = (this.context.canvas.width / this.matrix.columns) >> 0;
        let cellHeight = (this.context.canvas.height / this.matrix.rows) >> 0;
        let cellState;

        for (let y = 0; y < this.matrix.columns; y++) {
            for (let x = 0; x < this.matrix.rows; x++) {
                cellState = this.matrix.getValue(y, x);
                this.drawCell(x, y, cellWidth, cellHeight, cellState);
            }
        }
    }
}
