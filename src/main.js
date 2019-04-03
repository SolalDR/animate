import Emitter from "@solaldr/emitter";
import Easing from "./Easing";
import Animation from "./Animation";

var now = Date.now();
var last = Date.now();


class Animate extends Emitter {
    
  constructor() {
    super();
		this.animations = new Map();
		this.time = 0;
  }

  get stat() {
    return this.delta/1000;
  }

  /**
   * Add an animation
   * @param {Object|Animation} animation You can pass an object that describe the animation or directly an Animation object
   * @returns {Animation}
   */
  add(animation) {
		const a = animation instanceof Animation 
			? animation
			: new Animation(animation);
		
    a.once("end", () => this.remove(a.id));
    this.animations.set(a.id, a);
    return a;
	}
	
  remove(animation) {
    this.animations.delete(animation.id);
  }
  
  start() {
    this.time = 0;
    this.loop();
  }
  
  /**
   * @private
   */
	loop() {
    now = Date.now();
    this.delta = now - last;
		this.render(this.delta);
		last = now;
		requestAnimationFrame(this.loop.bind(this));
	}

  /**
   * Render all the animations
   * @private
   * @param {int} delta
   */
  render(delta) {
    this.animations.forEach(animation => {
      animation.render(delta);
    })
  }
}

export { Animation, Animate, Easing }
export default new Animate();
