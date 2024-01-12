import { Matrix, mapByElt, multiplyByElement, oneMatrix, subtractMatrices } from "./matrix.js";

export class ActivationFunction{
    static sigmoid = (m: Matrix):Matrix =>{
        //1 - (1 * Math.exp(-x))
        return mapByElt(m,el => 1 / (1+Math.exp(-el)));
    }
    static relu = (m:Matrix):Matrix =>{
        return mapByElt (m,el => Math.max(0,el));
    }
}

export class DerivativeFunction{
    static sigmoid = (m: Matrix):Matrix =>{
        const sig = ActivationFunction.sigmoid(m);
        const one = oneMatrix(m.getCols(),m.getRows());
        const oneMinusSig = subtractMatrices(one,sig);
        return multiplyByElement(sig,oneMinusSig);
    }
    static relu = (m:Matrix):Matrix => {
        return mapByElt(m,el => el > 0 ? 1 : 0)
    }
}

export function getDerivative(func:(x:Matrix) => Matrix): (x:Matrix) => Matrix{
    if(func == ActivationFunction.sigmoid){
        return DerivativeFunction.sigmoid;
    }
    if(func == ActivationFunction.relu){
        return DerivativeFunction.relu;
    }
    throw new Error("Can't find the derivative");
}