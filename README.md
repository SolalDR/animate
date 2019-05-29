# Animate

[![Maintainability](https://api.codeclimate.com/v1/badges/af311063cdf1cb9552c3/maintainability)](https://codeclimate.com/github/SolalDR/animate/maintainability)

A lightweight JS library for animation.
No abstraction of DOM is provide, this lib just interpolate values through time with a evenmential system.

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

// Start the global animate raf 
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
import animate, {Easing} from "@solaldr/animate";

animate.start();

// Default 1000ms interpolate from 0 to 1
animate.add().on('progress', ({ advancement }) => {
  const myEasingValue = Easing.easeInQuad(advancement);
});
```

### Custom animation manager
``` javascript
import {Animate} from "@solaldr/animate";

const myAnimationManager = new Animate();
myAnimationManager.start();
myAnimationManager.add({ ... });
```

## License

[MIT](LICENSE).
