import { mapByElt, multiplyByElement, oneMatrix, subtractMatrices } from "./matrix.js";
export class ActivationFunction {
}
ActivationFunction.sigmoid = (m) => {
    //1 - (1 * Math.exp(-x))
    return mapByElt(m, el => 1 / (1 + Math.exp(-el)));
};
ActivationFunction.relu = (m) => {
    return mapByElt(m, el => Math.max(0, el));
};
export class DerivativeFunction {
}
DerivativeFunction.sigmoid = (m) => {
    const sig = ActivationFunction.sigmoid(m);
    const one = oneMatrix(m.getCols(), m.getRows());
    const oneMinusSig = subtractMatrices(one, sig);
    return multiplyByElement(sig, oneMinusSig);
};
DerivativeFunction.relu = (m) => {
    return mapByElt(m, el => el > 0 ? 1 : 0);
};
export function getDerivative(func) {
    if (func == ActivationFunction.sigmoid) {
        return DerivativeFunction.sigmoid;
    }
    if (func == ActivationFunction.relu) {
        return DerivativeFunction.relu;
    }
    throw new Error("Can't find the derivative");
}
