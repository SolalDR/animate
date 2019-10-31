

const a = new Animation({ duration: 1000, delay: 100 }) // attend 100ms puis lance une anim "A" de 1000ms (RETURN A)
  .then({ duration: 500, delay: 50 }) // à la fin de l'anime A, attend 50ms puis lance une anim "B" d'une durée de 500ms (RETURN B)
  .then({ duration: 1000, delay: -50 }) // à la fin de l'anime B, lance une anim "C" ayant une avance de 50ms sur la durée de d'une durée de son animation (RETURN C)
  .add({ duration: 100, delay: 30 }) // au début de l'anime C, attend 30ms et lance une animation D de 100ms (RETURN D)
  .reach({ threshold: 0.5, duration: 200 }) // a 50% de l'anim D lance une anime E d'une durée de 200ms
  .stagger({ staggering: 100 });



const a = new Animation({ duration: 1000, delay: 100 })
  .on('progress', () => {})
  .then({ duration: 500, delay: 50 })
  .on('progress', () => {}) 

const b = new Animation({ duration: 1000, delay: 100 })
  .on('progress', () => {})
  .then({ duration: 500, delay: 50 })
  .on('progress', () => {}) 

const c = new Animation({ duration: 1000, delay: 100 })
  .then([a, b])
  .and({ duration: 100, delay: 30 }) 
  .reach({ threshold: 0.5, duration: 200 })
  .then({ duration: 200 })
  .and({ staggering: 100, count: 5 })
    .on('progress', {value, rank, advancement })
    .on('end')

class AnimationGroup extends Animation {

}


const a  = new AnimationGroup();
for(var i=0; i<5; i++) {
  a.add(new Animation({
    delay: i*100
  }))
}



  


var a = new Array();
var b = a.filter()
var c = b.filter().reduce()

tl
  .fromTo("#id", 1, {x: 0}, {x: 1}, 1, 1)
  .fromTo("#id", 2, {x: 0}, {x: 2}, 0, 0)
  .to("#id", 32, {x: 0})
  .staggerTo(['#ids'], 32, {x: 0})
  .start()
