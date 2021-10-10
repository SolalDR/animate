// import "./styles/main.scss"
import animate, {Easing} from "./../../dist/index.umd.js";
import RangeExample from "./scripts/RangeExample";

animate.start({
  auto: false
});


var customLoop = () => {
  animate.loop();
  requestAnimationFrame(customLoop);
}
customLoop();


// const a = animate
//   .add()
//   .on('progress', ({value}) => {
//     console.log('up', value);
//   })
//   .then({from: 1, to: 0})
//   .on('progress', ({value}) => {
//     console.log('down', value);
//   })
//   .and({from: 0, to: 1.5})
//   .on('progress', ({value}) => {
//     console.log('up (bis)', value);
//   })

const fzeoifj = animate
  .add({
    from: 200,
    to: 0.05
  })
  .on('progress', ({value}) => {
    console.log('up', value);
  })

window.addEventListener('load', ()=>{
  Object.keys(Easing).forEach(key => {
    const example = new RangeExample();
    example.setTitle(key);
    
    var anim = null;
    example.$element.addEventListener('mouseenter', () => {
      if (anim) return;
      var a = 0;
      anim = animate.add({
        to: 100,
        duration: 600,
        delay: 500,
        timingFunction: key
      }).on('progress', (event)=>{
        example.update(event);
      }).on('end', () => {
        anim = null;
      })
    });
  })
})
