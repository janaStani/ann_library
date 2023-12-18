export class Point {
    constructor(x, y, label) {
        this.x = x;
        this.y = y;
        this.guessed = true;
        this.label = label;
    }
    draw(ctx, cw, ch) {
        const drawX = this.x * cw;
        const drawY = this.y * ch;
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(drawX, drawY, 10, 0, 2 * Math.PI);
        if (this.label == 1) {
            ctx.fill();
        }
        else {
            ctx.stroke();
        }
        if (this.guessed) {
            ctx.fillStyle = "green";
        }
        else {
            ctx.fillStyle = "red";
        }
        ctx.beginPath();
        ctx.arc(drawX, drawY, 10, 0, 2 * Math.PI);
        ctx.fill();
    }
}
export function generatePoints(count) {
    const points = [];
    for (let i = 0; i < count; i++) {
        const x = Math.random();
        const y = Math.random();
        let label = 1;
        if (x < y) {
            label = 0;
        }
        points.push(new Point(x, y, label));
    }
    return points;
}
