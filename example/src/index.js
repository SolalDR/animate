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
      var a = 0;
      anim = animate.add({
        to: 100,
        duration: 1000,
        timingFunction: key
      }).on('progress', ({value})=>{
        rangeNode.value = value;
        a++;
      }).on('end', () => {
        anim = null;
        console.log(a);
      })
    });

    node.addEventListener("mouseleave", () => {
      anim = null;
    })

    textNode.innerHTML = key;
  })

  element.style.display = 'none';


  var square = document.querySelector('#square');
  animate.add({
    from: 0,
    to: 500,
  }).on('progress', ({value})=>{
    square.style.top = value + 'px';
  })
  
  animate.then({
    from: 500,
    to: 0,
  }).on('progress', ({value}) => {
    square.style.top = value + 'px';
  })
})
