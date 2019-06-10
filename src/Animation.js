import Emitter from "@solaldr/emitter"
import Easing from "./Easing"

class Animation extends Emitter {
  constructor({
    from = 0,
    to = 1,
    duration = 1000,
    delay = 0,
    timingFunction = "linear",
    auto = true
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
    
    if (auto) this.start();
  }

  start() {
    if (this.delay > 0) {
      setTimeout(() => {
        this.playing = true;
        this.emit("start", this);
      }, this.delay);
      return this;
    }

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
    this.advancement = (this.current + 1) / this.duration;
    this.value = this.from + (this.to - this.from) * this.timingFunction(this.advancement);

    this.emit("progress", this);

    if( this.advancement >= 1 ) {
      this.playing = false;
      this.emit("end", this);
    }
  }
}

export default Animation;