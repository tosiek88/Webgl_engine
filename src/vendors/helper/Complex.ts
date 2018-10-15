export default class Complex {

    public set X(value: number) {
        this.x = value;
    }

    public get X() {
        return this.x;
    }

    public get Y() {
        return this.y;
    }

    public set Y(value: number) {
        this.y = value;
    }

    // i radians
    public get Angle() {
        return Math.atan2(this.y, this.x);
    }

    public get Normal(): Complex {
        return new Complex(Math.cos(this.angle), Math.sin(this.angle));
    }

    public get Perpendicular(): Complex {
        return new Complex(-this.y, this.x);
    }

    public static makeNormal(x: number, y: number): Complex {
        const z = new Complex(x, y);
        return z.Normal;

    }

    public static Substract(v1: Complex, v2: Complex): Complex {
        return new Complex(v1.x - v2.x, v1.y - v2.y);
    }

    public static Add(v1: Complex, v2: Complex): Complex {
        return new Complex(v1.x + v2.x, v1.y + v2.y);
    }

    public static makePerpendicular(x: number | Complex, y?: number): Complex {

        if (typeof (y) === "undefined") {
            x = x as Complex;
            const newX = -x.Y;
            const newY = x.X;
            return new Complex(newX, newY);

        } else {
            const newX = -y as number;
            const newY = x as number;
            return new Complex(newX, newY);
        }

    }

    private mod: number;
    private angle: number;

    constructor(private x: number, private y: number) {
        this.mod = this.Mod;
        this.angle = this.Angle;
    }

    public get Mod(): number {
        return Math.sqrt(Math.abs(this.x * this.x + this.y * this.y));
    }

    public toString(): string {
        return `
        X: ${this.x} Y:${this.y} \n
        Angle: ${this.Angle} in deg ${this.Angle * 180 / Math.PI} \n
        Mod: ${this.Mod} mod: ${this.mod}
        `;
    }
}
