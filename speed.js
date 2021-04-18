'use strict';
export class Speed {

    constructor() {
        this.delay = 1000;
    }

    updateLevel(level) {
        const millisecondsPerMove = [
            1000,
            793,
            617.8,
            472.73,
            355.20,
            262.00,
            189.68,
            134.73,
            93.88,
            64.15,
            42.98,
            28.22,
            18.15,
            11.44,
            7.06,
            4.26,
            2.52,
            1.46,
            0.82,
            0.46
        ];
        this.delay = millisecondsPerMove[level];
    }

    getDelay() {
        return this.delay;
    }
}