import Emitter from "@solaldr/emitter";
import Easing from "./Easing";
import Animation from "./Animation";

class Animate extends Emitter {
    
  constructor() {
    super();
		this.animations = new Map();
    this.speed = 1;
    this.rate = null;
    this.delta = 0;

    this._enqueuedAnim = null;
    this._now = Date.now();
    this._last = Date.now();
  }

  /**
   * Getter for performance
   * @return {Number} The frame rate
   */
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
    this._enqueuedAnim = a;
    return a;
	}
	
  /**
   * Remove an animation
   * @param  {Animation} animation Remove an animation of the animations' stack. It will not fire an event "end".
   * @return {void}
   */
  remove(animation) {
    this.animations.delete(animation.id);
  }
  
  /**
   * Start the RAF method
   * @return {void}
   */
  start({
    speed = 1,
    fps = null,
    auto = true,
  } = {}) {
    this.speed = speed;
    this.fps = fps;
    this._interval = this.fps ? 1000/this.fps : 1;  
    this.auto = auto;
    if (this.auto) this.loop();
  }
  
  /**
   * @private
   */
	loop() {
    this._now = Date.now();
    this.delta = this._now - this._last;

    if (this.delta > this._interval) {
      this.render((this.delta - (this.delta % this._interval)) * this.speed);
      this._last = this._now;
    }
    
    if(this.auto) requestAnimationFrame(this.loop.bind(this));
  }

  /**
   * Render all the animations
   * @private
   * @param {int} delta
   */
  render(delta) {
    this.animations.forEach(a => a.render(delta))
  }
}

export { Animation, Animate, Easing }
export default new Animate();
