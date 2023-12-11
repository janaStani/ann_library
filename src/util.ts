import { Matrix, mapByElt, multiplyByElement, oneMatrix, subtractMatrices } from "./matrix.js";

export class ActivationFunction{
    static sigmoid = (m: Matrix):Matrix =>{
        //1 - (1 * Math.exp(-x))
        return mapByElt(m,el => 1 / (1+Math.exp(-el)));
    }
}

export class DerivativeFunction{
    static sigmoid = (m: Matrix):Matrix =>{
        const sig = ActivationFunction.sigmoid(m);
        const one = oneMatrix(m.getRows(),m.getCols());
        const oneMinusSig = subtractMatrices(one,sig);
        return multiplyByElement(sig,oneMinusSig);
    }
}

export function getDerivative(func:(x:Matrix) => Matrix): (x:Matrix) => Matrix{
    if(func == ActivationFunction.sigmoid){
        return DerivativeFunction.sigmoid;
    }
    throw new Error("Can't find the derivative");
}