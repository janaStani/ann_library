export class Perceptron {
    constructor(inputLength) {
        this.learningRate = 0.05;
        this.bias = Math.random() * 2 - 1;
        this.weights = [];
        for (let i = 0; i < inputLength; i++) {
            this.weights.push(Math.random() * 2 - 1);
        }
        this.activationFunction = ActivationFunction.sign;
        this.loss = LossFunction.absoluteError;
    }
    predOne(input) {
        const weightedSum = this.weightedSum(input);
        return this.activationFunction(weightedSum);
    }
    weightedSum(input) {
        let sum = (1 * this.bias);
        for (let i = 0; i < input.length; i++) {
            sum += (input[i] * this.weights[i]);
        }
        return sum;
    }
    fitOne(input, label) {
        const prediction = this.predOne(input);
        const error = this.loss(prediction, label);
        this.adjustWeights(input, error);
        return error;
    }
    adjustWeights(input, error) {
        this.bias += (1 * error * this.learningRate);
        for (let i = 0; i < this.weights.length; i++) {
            this.weights[i] += (input[i] * error * this.learningRate);
        }
    }
}
class ActivationFunction {
}
ActivationFunction.sign = (ws) => {
    if (ws >= 0) {
        return 1;
    }
    else {
        return -1;
    }
};
export class LossFunction {
}
LossFunction.absoluteError = (pred, goal) => {
    return goal - pred;
};
