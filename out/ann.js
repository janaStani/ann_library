import { Matrix, addMatrices, multiply, multiplyByElement, multiplyScalar, randomMatrix, subtractMatrices, transpose } from "./matrix.js";
import { getDerivative } from "./util.js";
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
        this.lastInput = input;
        const mult = multiply(this.weights, input);
        const weightesSum = addMatrices(mult, this.biases);
        this.lastOutput = weightesSum;
        return this.lastOutput;
    }
    backPropagation(outErrors, lr) {
        if (!this.weights || !this.biases) {
            throw new Error("Weights or biases not initialized");
        }
        if (!this.lastInput || !this.lastOutput) {
            throw new Error("Inputs and outputs not stored");
        }
        //clc errors of prev layer
        const transposedWeights = transpose(this.weights);
        const prevLayerErrors = multiply(transposedWeights, outErrors);
        //calc gradient
        const derivative = getDerivative(this.activationFunction);
        const outGradient = derivative(this.lastOutput);
        const gradient = multiplyByElement(outGradient, outErrors);
        //bias deltas - changes
        const biasDeltas = multiplyScalar(gradient, lr);
        this.biases = addMatrices(this.biases, biasDeltas);
        //weights deltas - changes
        const inputsTransposed = transpose(this.lastInput);
        const weightsDeltas = multiply(biasDeltas, inputsTransposed);
        this.weights = addMatrices(this.weights, weightsDeltas);
        return prevLayerErrors;
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
    fitOne(inputs, targets) {
        const predictions = this.predOne(inputs);
        const predictionMatrix = new Matrix([predictions]);
        const targetMatrix = new Matrix([targets]);
        let errors = transpose(subtractMatrices(targetMatrix, predictionMatrix));
        for (let i = this.layers.length - 1; i >= 0; i--) {
            errors = this.layers[i].backPropagation(errors, this.learningRate);
        }
    }
}
