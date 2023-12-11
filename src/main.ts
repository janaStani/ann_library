import { generatePoints } from "./data.js";
import { initGfx, setDrawables } from "./gfx.js";
import { Perceptron } from "./perceptron.js";
import { Point } from "./data.js";
import { ArtificialNeuralNetwork, Layer } from "./ann.js";
import { ActivationFunction } from "./util.js";

async function main(){
    initGfx();
    const points = generatePoints(500);
    console.table(points)
    setDrawables(points);


    const model = new ArtificialNeuralNetwork(2,0.03,[
        new Layer(10,ActivationFunction.sigmoid),
        new Layer(5,ActivationFunction.sigmoid),
        new Layer(15,ActivationFunction.sigmoid),
        new Layer(3,ActivationFunction.sigmoid),
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
    
}

function predictAll(model: Perceptron, data: Point[]){
    for(const pt of data){
        const inputVector = [pt.x, pt.y]
        const prediction = model.predOne(inputVector)
        pt.guessed = (prediction == pt.label)
    }
}

const sleep = (ms:number) =>{
    return new Promise(resolve => setTimeout(resolve,ms))
}

window.onload = main;