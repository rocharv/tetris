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

    get() {
        return this.matrix;
    }

    getValue(x, y) {
        if (!this.isValidCoordinate(x, y)) {
            return;
        }
        return this.matrix[y][x];
    }

    isValidCoordinate(x, y) {
        return (
            x >= 0 &&
            x < this.columns &&
            y >= 0 &&
            y < this.rows
        );
    }

    setFromArray(arr) {
        this.matrix = JSON.parse(JSON.stringify(arr));
    }

    setValue(x, y, value) {
        if (!this.isValidCoordinate(x, y)) {
            return;
        }
        this.matrix[y][x] = value;
    }
}
