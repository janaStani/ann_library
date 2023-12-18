var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { generatePoints } from "./data.js";
import { initGfx, setDrawables } from "./gfx.js";
import { ArtificialNeuralNetwork, Layer } from "./ann.js";
import { ActivationFunction } from "./util.js";
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        initGfx();
        const points = generatePoints(500);
        console.table(points);
        setDrawables(points);
        const model = new ArtificialNeuralNetwork(2, 0.03, [
            new Layer(50, ActivationFunction.sigmoid),
            new Layer(50, ActivationFunction.sigmoid),
            new Layer(2, ActivationFunction.sigmoid),
        ]);
        const epochs = 10;
        for (let e = 0; e < epochs; e++) {
            console.log("Epoch: ", e);
            for (let i = 0; i < points.length; i++) {
                const inputVector = [points[i].x, points[i].y];
                //one hot encoding
                const targets = [0, 0];
                targets[points[i].label] = 1;
                model.fitOne(inputVector, targets);
                if (i % 25 == 0) {
                    predictAll(model, points);
                }
                yield sleep(1);
            }
        }
    });
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
