import Emitter from "@solaldr/emitter"
import Easing from "./Easing"

class Animation extends Emitter {
  constructor({
    from = 0,
    to = 1,
    duration = 1000,
    delay = 0,
    timingFunction = "linear",
    auto = true,
    timeline = null
  } = {}){
    super();
    this.id = Symbol('animation');
    this.playing = false;
    this.current = 0;
    this.from = from;
    this.to = to;
    this.delay = delay;
    this.duration = duration;
    this.timingFunction = Easing[timingFunction];
    this.timeline = timeline;
    
    if (auto) this.start();
  }

  then(params) {
    const animation = params instanceof Animation 
      ? params 
      : new Animation({ ...params, auto: false });

    this.once('end', () => {
      if (this.timeline) {
        animation.timeline = this.timeline;
        animation.start();
        this.timeline.add(animation);
      }
    })

    return animation;
  }

  promise() {
    var resolver = null;
    return new Promise((resolve, reject) => {
      resolver = resolve;
      this.once('end', () => {
        resolver();
      })
    })
  }
  
  and(params) {
    const animation = params instanceof Animation 
      ? params 
      : new Animation({ ...params, auto: false });

    if (this.playing && this.timeline) {
      animation.timeline = this.timeline;
      animation.start();
      this.timeline.add(animation);
    } else {
      this.once('start', () => {
        if (this.timeline) {
          animation.timeline = this.timeline;
          animation.start();
          this.timeline.add(animation);
        }
      })
    }

    return animation;
  }

  start() {
    if (this.delay > 0) {
      setTimeout(() => {
        this.playing = true;
        this.emit("start", this);
      }, this.delay);
      return this;
    }

    if (this.delay < 0) this.current = -this.delay;

    this.playing = true;
    this.emit("start", this);
    return this;
  }

  stop() {
    this.playing = false;
    this.current = 0;
    this.emit("end", this);
  }

  

  render(delta) {
    if (!this.playing) return;

    this.current = Math.min(this.duration, this.current + delta);
    this.advancement = this.current / this.duration;
    this.value = this.from + (this.to - this.from) * this.timingFunction(this.advancement);

    this.emit("progress", this);

    if( this.advancement >= 1 ) {
      this.playing = false;

      if (this.value !== this.to) {
        this.value = this.to;
        this.emit("progress", this);
      }

      this.emit("end", this);
    }
  }
}

export default Animation;