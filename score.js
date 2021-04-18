'use strict';

export class Score {
    constructor(scoreElementId, levelElementId, linesElementId, speed) {
        this.levelElementId = levelElementId;
        this.lines = 0;
        this.linesElementId = linesElementId;
        this.points = 0;
        this.scoreElementId = scoreElementId;
        this.speed = speed;

        this.updateHtmlElements();
    }

    getLevel() {
        return Math.trunc(this.lines / 10);
    }

    getPoints() {
        return this.points;
    }

    updateScore(linesAtOnce) {
        this.lines += linesAtOnce;
        let level = this.getLevel();

        const scorePerLinesAtOnce = [40, 100, 300, 1200];
        this.points += scorePerLinesAtOnce[linesAtOnce - 1] * (level + 1);

        this.speed.updateLevel(level);

        this.updateHtmlElements();
    }

    updateHtmlElements() {
        document.getElementById(this.scoreElementId).innerHTML = this.points;
        document.getElementById(this.levelElementId).innerHTML = this.getLevel();
        document.getElementById(this.linesElementId).innerHTML = this.lines;

    }
}