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

    public static makeNormal(x: number, y: number): Complex {
        const z = new Complex(x, y);
        return z.Normal;

    }

    public static makePerpendicular(x: number | Complex, y?: number): Complex {
        console.log(typeof (x));
        return new Complex(x as number, y);
    }

    private mod: number;
    private angle: number;

    constructor(private x: number, private y: number) {
        this.mod = this.Mod();
        this.angle = Math.asin(y / this.mod);
    }

    public Mod(): number {
        return Math.sqrt(this.x * this.x - this.y * this.y);
    }
}
