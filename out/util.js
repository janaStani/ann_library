import { mapByElt, multiplyByElement, oneMatrix, subtractMatrices } from "./matrix.js";
export class ActivationFunction {
}
ActivationFunction.sigmoid = (m) => {
    //1 - (1 * Math.exp(-x))
    return mapByElt(m, el => 1 / (1 + Math.exp(-el)));
};
export class DerivativeFunction {
}
DerivativeFunction.sigmoid = (m) => {
    const sig = ActivationFunction.sigmoid(m);
    const one = oneMatrix(m.getRows(), m.getCols());
    const oneMinusSig = subtractMatrices(one, sig);
    return multiplyByElement(sig, oneMinusSig);
};
export function getDerivative(func) {
    if (func == ActivationFunction.sigmoid) {
        return DerivativeFunction.sigmoid;
    }
    throw new Error("Can't find the derivative");
}
