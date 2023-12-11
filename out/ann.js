import { Matrix, addMatrices, multiply, randomMatrix, transpose } from "./matrix.js";
export class Layer {
    constructor(layerSize, activation) {
        this.layerSize = layerSize;
        this.activationFunction = activation;
    }
    initWeights(inputSize) {
        this.weights = randomMatrix(inputSize, this.layerSize);
        this.biases = randomMatrix(1, this.layerSize);
        return this.layerSize;
    }
    feedForward(input) {
        if (!this.weights || !this.biases) {
            throw new Error("Weights or biases not initialized");
        }
        const mult = multiply(this.weights, input);
        const weightesSum = addMatrices(mult, this.biases);
        return this.activationFunction(weightesSum);
    }
}
export class ArtificialNeuralNetwork {
    constructor(inputSize, learningRate, layers) {
        this.inputSize = inputSize;
        this.learningRate = learningRate;
        this.layers = layers;
        for (const layer of layers) {
            inputSize = layer.initWeights(inputSize);
        }
    }
    predOne(input) {
        let inputVector = transpose(new Matrix([input]));
        for (const layer of this.layers) {
            inputVector = layer.feedForward(inputVector);
        }
        return transpose(inputVector).getValues()[0];
    }
}
