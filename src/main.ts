import { generatePoints } from "./data.js";
import { initGfx, setDrawables } from "./gfx.js";

function main(){
    initGfx();
    const points = generatePoints(50);
    console.table(points)
    setDrawables(points);
}

window.onload = main;