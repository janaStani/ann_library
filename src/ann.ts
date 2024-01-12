import { Matrix, addMatrices, multiply, multiplyByElement, multiplyScalar, randomMatrix, subtractMatrices, transpose } from "./matrix.js";
import { getDerivative } from "./util.js";

export class Layer{
    private layerSize: number;
    private activationFunction: (m:Matrix) => Matrix;
    
    private weights: Matrix | undefined; 
    private biases: Matrix | undefined; 

    private lastInput: Matrix | undefined;
    private lastOutput: Matrix | undefined;

    constructor(layerSize: number, activation: (m: Matrix) => Matrix){
        this.layerSize = layerSize;
        this.activationFunction = activation;
    }

    public initWeights(inputSize: number): number{
        this.weights = randomMatrix(inputSize, this.layerSize);
        this.biases = randomMatrix(1, this.layerSize);
        return this.layerSize;
    }

    public feedForward(input: Matrix): Matrix{
        if(!this.weights || !this.biases){
            throw new Error("Weights or biases not initialized");
        }
        this.lastInput = input;

        const mult = multiply(this.weights,input);
        const weightesSum = addMatrices(mult,this.biases);

        this.lastOutput = weightesSum;

        return this.lastOutput;
    }

    public backPropagation(outErrors:Matrix, lr: number):Matrix{
        if(!this.weights || !this.biases){
            throw new Error("Weights or biases not initialized");
        }
        if(!this.lastInput || !this.lastOutput){
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


export class ArtificialNeuralNetwork{
    
    private learningRate: number;
    private inputSize: number;
    private layers: Layer[];

    constructor(inputSize: number, learningRate:number, layers: Layer[]){
        this.inputSize = inputSize;
        this.learningRate = learningRate;
        this.layers = layers;
        for (const layer of layers){
            inputSize = layer.initWeights(inputSize);
        }
    }

    public predOne(input: number[]): number[]{
        let inputVector = transpose(new Matrix([input]));
        for(const layer of this.layers){
            inputVector = layer.feedForward(inputVector);
        }
        return transpose(inputVector).getValues()[0];
    }

    public fitOne(inputs: number[], targets: number[]){
        const predictions = this.predOne(inputs);
        const predictionMatrix = new Matrix([predictions]);
        const targetMatrix = new Matrix([targets]);

        let errors = transpose(subtractMatrices(targetMatrix, predictionMatrix));

        for(let i = this.layers.length-1; i >= 0; i--){
            errors = this.layers[i].backPropagation(errors, this.learningRate);
        }
    }
}