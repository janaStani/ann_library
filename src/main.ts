import { generatePoints } from "./data.js";
import { initGfx, setDrawables } from "./gfx.js";
import { Point } from "./data.js";
import { ArtificialNeuralNetwork, Layer } from "./ann.js";
import { ActivationFunction } from "./util.js";

async function main(){
    initGfx();
    const points = generatePoints(500);
    console.table(points)
    setDrawables(points);


    const model = new ArtificialNeuralNetwork(2,0.03,[
        new Layer(50,ActivationFunction.sigmoid),
        new Layer(50,ActivationFunction.sigmoid),
        new Layer(2,ActivationFunction.sigmoid),
    ]);

    for(let i = 0; i < points.length; i++){
        const inputVector = [points[i].x, points[i].y];
        //one hot encoding
        const targets = [0,0];
        targets[points[i].label] = 1;
        
        model.fitOne(inputVector, targets);
    }
  
}

function predictAll(model: ArtificialNeuralNetwork, data: Point[]){
    for(const pt of data){
        const inputVector = [pt.x, pt.y]
        const prediction = model.predOne(inputVector); //(0.1, 0.8)
        
        const actualPrediction = argMax(prediction);
        
        pt.guessed = (actualPrediction == pt.label)
    }
}

function argMax(elts: number[]):number {
    let max = 0
    for(let i = 0; i < elts.length; i++){
        if(elts[i] > elts[max]){
            max = i;
        }
    }
    return max;
}

const sleep = (ms:number) =>{
    return new Promise(resolve => setTimeout(resolve,ms))
}

window.onload = main;


