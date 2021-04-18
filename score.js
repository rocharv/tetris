'use strict';

export class Score {
    constructor() {
        this.lines = 0;
        this.points = 0;
    }

    updateScore(linesAtOnce){
        this.lines += linesAtOnce;
        let level = this.getLevel();

        const scorePerLinesAtOnce = [40, 100, 300, 1200];
        this.points += scorePerLinesAtOnce[linesAtOnce - 1] * (level + 1);
    }

    getPoints(){
        return this.points;
    }

    getLevel() {
        return Math.trunc(this.lines / 10);
    }
}