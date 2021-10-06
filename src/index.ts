import { Application, Loader, Sprite, Point, Graphics } from 'pixi.js';
import Track from './track';

const resources = Loader.shared.resources;

export const app = new Application({
    width: window.innerWidth,
    height: window.innerHeight,
    resolution: window.devicePixelRatio,
    antialias: true
});

document.body.appendChild(app.view);

Loader.shared
    .add('assets/cat.png')
    .load(setup);

function setup() {
    const objs = [...Array(6)].map(() => {
        const obj = new Sprite(resources['assets/cat.png'].texture);
        app.stage.addChild(obj);
        obj.anchor.x = obj.anchor.y = 0.5;
        return obj;
    })

    const points = [
        new Point(100, 100),
        new Point(250, 100),
        new Point(400, 100),
        new Point(400, 250),
        new Point(400, 400),
        new Point(250, 400),
        new Point(100, 400),
        new Point(100, 250),
    ]

    const track = new Track(points);

    setInterval(() => {
        track.move(1 / objs.length, (t) => {
            objs.forEach((obj, i) => {
                const { x, y } = track.getTrackPosition(t + i / objs.length);
                obj.position.set(x, y);
            });
        });
    }, 2000);
}