'use strict';

import { Speed } from './speed.js';

export class Score {
    constructor(speed) {
        this.lines = 0;
        this.points = 0;
        this.speed = speed;
    }

    updateScore(linesAtOnce){
        this.lines += linesAtOnce;
        let level = this.getLevel();

        const scorePerLinesAtOnce = [40, 100, 300, 1200];
        this.points += scorePerLinesAtOnce[linesAtOnce - 1] * (level + 1);

        this.speed.updateLevel(level);
    }

    getPoints(){
        return this.points;
    }

    getLevel() {
        return Math.trunc(this.lines / 10);
    }
}