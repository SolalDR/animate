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
		this.loop();
  }

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
	
	loop() {
		now = Date.now();
		this.render(now - last);
		last = now;
		requestAnimationFrame(this.loop.bind(this));
	}

  /**
   * Render all the animations
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
