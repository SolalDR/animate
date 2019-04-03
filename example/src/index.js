import animate from "./../../dist/index.umd.js";

animate.add({
  duration: 1000
})
.on('progress', (e) => {
  console.log(e);
})
.on('end', (e) => {
  console.log(e);
})

console.log(animate.animations)