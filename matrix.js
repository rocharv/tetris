'use strict';

export class Matrix {
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.matrix = [];

        for (let x = 0; x < rows; x++) {
            this.matrix[x] = [];
            for (let y = 0; y < columns; y++) {
                this.matrix[x][y] = 0;
            }
        }
    }

    isValidCoordinates(x, y) {
        return (
            x >= 0 &&
            x < this.columns &&
            y >= 0 &&
            y < this.rows
        );
    }

    setValue(x, y, value) {
        if (!this.isValidCoordinates(x, y)) {
            return;
        }
        this.matrix[y][x] = value;
    }

    getValue(x, y) {
        if (!this.isValidCoordinates(x, y)) {
            return;
        }
        return this.matrix[y][x];
    }

    setFromArray(arr) {
        this.matrix = JSON.parse(JSON.stringify(arr));
    }

    get() {
        return this.matrix;
    }
}
