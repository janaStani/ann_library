import { generatePoints } from "./data.js";
import { initGfx, setDrawables } from "./gfx.js";
import { Perceptron } from "./perceptron.js";
import { Point } from "./data.js";

async function main(){
    initGfx();
    const points = generatePoints(500);
    console.table(points)
    setDrawables(points);


    const model = new Perceptron(2)
    //const testPred = model.predOne([points[0].x, points[0].y])
    //console.log(testPred)

    for(const pt of points){
        const inputVector = [pt.x, pt.y]
        model.fitOne(inputVector,pt.label)
        predictAll(model,points)
        await sleep (100)
    }
    
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