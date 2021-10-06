# Pixi Bezier
Simple quadratic bezier curves for animating pixi objects around a track.

The Track takes a list of points and creates an array of midpoints between them. It then uses each midpoint with the next point as a control point and the next midpoint as the end point to do a quadratic lerp. This creates a smooth line going through all the midpoints of the points provided.
## Setup
```
npm run start	// Install packages and serve
```
## Usage
```
npm run serve	// Run local build
npm run lint
npm run buid
```