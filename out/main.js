var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ArtificialNeuralNetwork, Layer } from "./ann.js";
import { ActivationFunction } from "./util.js";
import { getDataset } from "./mnist_handwritten.js";
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("loading data...");
        const dataset = getDataset();
        const [train, test] = splitDataset(dataset);
        const model = new ArtificialNeuralNetwork(784, 0.0001, [
            new Layer(128, ActivationFunction.relu),
            new Layer(64, ActivationFunction.relu),
            new Layer(2, ActivationFunction.sigmoid),
        ]); //[0.1, 0.3]
        console.log("Training" + train.length);
        let count = 0;
        let progress = 0;
        const percent = train.length * 0.01;
        for (let i = 0; i < train.length; i++) {
            const digit = train[i];
            const inputVector = digit.image;
            const outputVector = [0, 0];
            outputVector[digit.label] = 1; //set the corr answ
            model.fitOne(inputVector, outputVector);
            //log progress
            if (count > percent) {
                count = 0;
                progress++;
                console.log(progress + "%");
            }
            count++;
        }
        testModel(model, test);
    });
}
function testModel(model, data) {
    console.log("Test:" + data.length + "**************");
    console.time("test");
    let correct = 0;
    let confusionMatrix = [
        [0, 0],
        [0, 0]
    ];
    for (const digit of data) {
        const predictionVector = model.predOne(digit.image);
        //[0.1, 0.8] => 1
        //[0.9, 0.3] => 0
        const pred = argMax(predictionVector);
        if (pred == digit.label) {
            correct++;
        }
        confusionMatrix[digit.label][pred]++;
    }
    const accuracy = Math.round(correct / data.length * 100);
    console.log("Accuracy" + accuracy + "%");
    console.table(confusionMatrix);
    console.timeEnd("test");
    console.log("Test end");
}
function splitDataset(data) {
    const shuffled = data.sort(() => 0.5 - Math.random());
    const splitPoint = Math.floor(shuffled.length * 0.8);
    const train = shuffled.slice(0, splitPoint);
    const test = shuffled.slice(splitPoint);
    return [train, test];
}
function predictAll(model, data) {
    for (const pt of data) {
        const inputVector = [pt.x, pt.y];
        const prediction = model.predOne(inputVector); //(0.1, 0.8)
        const actualPrediction = argMax(prediction);
        pt.guessed = (actualPrediction == pt.label);
    }
}
function argMax(elts) {
    let max = 0;
    for (let i = 0; i < elts.length; i++) {
        if (elts[i] > elts[max]) {
            max = i;
        }
    }
    return max;
}
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};
window.onload = main;
