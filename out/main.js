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
            new Layer(10, ActivationFunction.sigmoid),
            new Layer(5, ActivationFunction.sigmoid),
            new Layer(15, ActivationFunction.sigmoid),
            new Layer(3, ActivationFunction.sigmoid),
        ]);
        const inputVector = [points[0].x, points[0].y];
        console.log(model.predOne(inputVector));
        /*const model = new Perceptron(2)
        for(const pt of points){
            const inputVector = [pt.x, pt.y]
            model.fitOne(inputVector,pt.label)
            predictAll(model,points)
            await sleep (100)
        }*/
    });
}
function predictAll(model, data) {
    for (const pt of data) {
        const inputVector = [pt.x, pt.y];
        const prediction = model.predOne(inputVector);
        pt.guessed = (prediction == pt.label);
    }
}
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};
window.onload = main;
