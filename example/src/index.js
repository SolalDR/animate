import animate, {Easing} from "./../../dist/index.umd.js";
animate.start();

window.addEventListener('load', ()=>{
  var element = document.querySelector('#easing-test-patern');
  element.removeAttribute('id');

  console.log(element);
  Object.keys(Easing).forEach(key => {
    console.log(element);
    var node = element.cloneNode(true);
    element.parentNode.appendChild(node);

    var rangeNode = node.querySelector('input');
    var textNode = node.querySelector('p');
    
    var anim = null;
    node.addEventListener('mouseenter', () => {
      if (anim) return;
      anim = animate.add({
        to: 100,
        duration: 1000,
        timingFunction: key
      }).on('progress', ({value})=>{
        rangeNode.value = value;
      }).on('end', () => {
        anim = null;
      })
    });

    node.addEventListener("mouseleave", () => {
      anim = null;
    })

    textNode.innerHTML = key;
  })

  element.style.display = 'none';

  animate.add({
    duration: 1000,
    timingFunction: 'easeInOutQuad',
  })
  .on('progress', (e) => {
    console.log(e);
  })
  .on('end', (e) => {
    console.log(e);
  })
})
