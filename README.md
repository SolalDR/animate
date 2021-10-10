# animate

[![Maintainability](https://api.codeclimate.com/v1/badges/af311063cdf1cb9552c3/maintainability)](https://codeclimate.com/github/SolalDR/animate/maintainability)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@solaldr/animate)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@solaldr/animate)

A lighter library for animation.
No DOM abstraction, just animate your values with a cool easing.
Agnostic, works fine on node server or web-workers.

## Getting started

Clone this repository and install its dependencies:

With npm:
```
npm install @solaldr/animate
```

With yarn:
```
yarn add @solaldr/animate
```

## How to use

``` javascript
import animate from "@solaldr/animate";

// Start the main timeline 
animate.start();

animate.add({
  from: 0,
  to: 1000,
  duration: 5000, // default 1000 (ms)
  timingFunction: "easeInOutQuad", // default "linear"
})
.on('progress', ({ value, advancement }) => {
  // Easing value between 0 and 1000
  console.log(value); 
  // Easing value between 0 and 1
  console.log(advancement); 
})
.on('end', () => {
  // Triggered at the end of the anim
})
```

### Object syntax
``` javascript
import animate, {Animation} from "@solaldr/animate";

animate.start();
animate.add(new Animation({
  ... options here
}))
```

### Easings

You may want to use different Easing method inside the same animation

``` javascript
import animate, { Easing } from "@solaldr/animate";

animate.start();

// Default 1000ms interpolate from 0 to 1
animate.add().on('progress', ({ advancement }) => {
  const myEasingValue = Easing.easeInQuad(advancement);
});
```

Use bezier functions

``` javascript
import animate, { Easing } from "@solaldr/animate";
import { Bezier } from "@solaldr/esm/Bezier.js"
animate.start();

const timingFunction = Bezier(0.25, 0.1, 0.28, 0.51)
animate.add({
  timingFunction
});
```


### Advanced use

`and()` method allow you to run multiple animation at the same time
``` javascript
animate
.add({ from: 0, to: 100 }).on('progress', someProgressCB))
.and({ from: 100, to: 0}).on('progress', reverseProgressCB)
```

`then()` method allow you to run chain animation
``` javascript
animate
.add({ from: 0, to: 100 }).on('progress', someProgressCB))
.then({ from: 100, to: 0}).on('progress', reverseProgressCB)
```

`promise()` Use promise
``` javascript
async function() {
  await animate.add({ from: 0, to: 100 })
    .on('progress', someProgressCB))
    .promise()
  
  alert("Run after this animation")
} 
```


### Custom timeline
``` javascript
import { Timeline } from "@solaldr/animate";

const timeline = new Timeline();
timeline.start();
timeline.add({ ... });
```

### Size comparison

| Package          | Version | Minified | Minified + GZIP |
|------------------|---------|----------|-----------------|
| @solaldr/animate | 0.4.0   | 4.8 kB   | 1.5 kB          |
| animejs          | 3.2.1   | 17.4 kB  | 6.9 kB          |
| gsap             | 3.8.0   | 60.4 kB  | 23.5 kB         |

## License

[MIT](LICENSE).
