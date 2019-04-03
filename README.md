# Animate

A lightweight JS library for animation.

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
import animate, {Animate, Animation, Easing} from "@solaldr/animate";

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

## License

[MIT](LICENSE).
