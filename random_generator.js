'use strict';

export class RandomGenerator {
    constructor(firstNumber, bagSize, minimumBagsInMemory = 2) {
        this.array = [];
        this.bagSize = bagSize ;
        this.firstNumber = firstNumber;
        this.minimumBagsInMemory = minimumBagsInMemory;

        this.pushBags(minimumBagsInMemory);
    }

    pushBags(numberOfBags) {
        if (numberOfBags < 1) {
            return;
        }

        let bagArray = [];
        for (let i = 0; i < this.bagSize; i++) {
            bagArray[i] = this.firstNumber + i;
        }

        while (bagArray.length > 0) {
            let randomNumberInBag = Math.trunc(Math.random() * bagArray.length);
            this.array.push(bagArray.splice(randomNumberInBag, 1)[0]);
        }

        this.pushBags(numberOfBags - 1);
    }

    getNextNumber() {
        const nextNumber = this.array.shift();

        if (this.array.length < this.minimumBagsInMemory * this.bagSize) {
            this.pushBags(1);
        }

        return nextNumber;
    }

    showNextNumbers(numbers) {
        if (numbers > this.minimumBagsInMemory * this.bagSize) {
            return;
        }

        const cloneArray = [...this.array];
        return cloneArray.slice(0, numbers);
    }
}
