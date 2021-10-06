import gsap from 'gsap';
import { Point, Graphics } from 'pixi.js';
import { app } from '.';

export default class Track {
    private points: Point[];
    private halfPoints: Point[];
    private progress: number;

    constructor(points: Point[]) {
        this.points = points;
        this.halfPoints = points.map((point, i) => new Point(
            (point.x + points[(i + 1) % points.length].x) / 2,
            (point.y + points[(i + 1) % points.length].y) / 2
        ));
        this.progress = 0;
        this.drawDebug();
    }

    public move(t: number, update: (t: number) => void) {
        gsap.to(this, {
            progress: '+=' + t,
            duration: 1,
            ease: 'sine.inOut',
            onUpdate: () => update(this.progress)
        });
    }

    public getTrackPosition(t: number) {
        const n = this.points.length;
        const i = Math.floor(t * n) % n;
        const a = this.halfPoints[(i + n - 1) % n];
        const b = this.points[i];
        const c = this.halfPoints[i];
        return this.quadraticLerp(a, b, c, (t * n) % 1);
    }

    private quadraticLerp(a: Point, b: Point, c: Point, t: number) {
        return new Point(
            Math.pow(1 - t, 2) * a.x + 2 * (1 - t) * t * b.x + Math.pow(t, 2) * c.x,
            Math.pow(1 - t, 2) * a.y + 2 * (1 - t) * t * b.y + Math.pow(t, 2) * c.y
        );
    }

    private drawDebug() {
        const line = new Graphics();
        app.stage.addChild(line);
        line.lineStyle({ width: 2, color: 0xffffff });

        const { x, y } = this.halfPoints[0];
        line.moveTo(x, y);
        this.halfPoints.forEach((_, i) => {
            const i2 = (i + 1) % this.points.length
            const b = this.points[i2];
            const c = this.halfPoints[i2];
            line.quadraticCurveTo(b.x, b.y, c.x, c.y);
        });

        const dots = new Graphics();
        app.stage.addChild(dots);
        dots.beginFill(0xff0000);

        this.points.forEach((p) => {
            dots.drawCircle(p.x, p.y, 5);
        })

        const dots2 = new Graphics();
        app.stage.addChild(dots2);
        dots2.beginFill(0x0000ff);

        this.halfPoints.forEach((p) => {
            dots2.drawCircle(p.x, p.y, 5);
        })
    }
}
