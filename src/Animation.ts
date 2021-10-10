import Emitter from "@solaldr/emitter"
import { Easing } from "./Easing"
import { Timeline } from "./Timeline"

export type EasingFunction = (advancement: number) => number

export interface AnimationConstructor {
  from?: number
  to?: number
  duration?: number
  delay?: number
  timingFunction: EasingFunction | string
  auto?: number
  timeline?: any
}

export class Animation extends Emitter {
  /** @ignore */
  id: Symbol
  playing: boolean = false
  current: number = 0
  from: number = 0
  to: number = 0
  delay: number = 0
  duration: number = 0
  advancement: number = 0
  value: number = 0
  timingFunction: EasingFunction
  timeline: Timeline | null

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
    this.from = from;
    this.to = to;
    this.delay = delay;
    this.duration = duration;
    this.timingFunction = typeof timingFunction === 'function' 
      ? timingFunction 
      : Easing[timingFunction];
    this.timeline = timeline;
    
    if (auto) this.start();
  }

  private startAnimation(animation) {
    if (this.timeline) {
      animation.timeline = this.timeline;
      animation.start();
      this.timeline.add(animation);
    }
  }

  /**
   * Run the defined animation after the current one
   * @param AnimationConstructor params 
   */
  then(params): Animation {
    const animation = params instanceof Animation 
      ? params 
      : new Animation({ ...params, auto: false });

    this.once('end', () => this.startAnimation(animation))

    return animation;
  }

  promise(): Promise<Animation> {
    var resolver = null;
    return new Promise((resolve, reject) => {
      resolver = resolve;
      this.once('end', () => {
        resolver();
      })
    })
  }
  
  and(params): Animation {
    const animation = params instanceof Animation 
      ? params 
      : new Animation({ ...params, auto: false });

    if (this.playing && this.timeline) {
      animation.timeline = this.timeline;
      animation.start();
      this.timeline.add(animation);
    } else {
      this.once('start', () => this.startAnimation(animation))
    }

    return animation;
  }

  start(): Animation {
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

  stop(): void {
    this.playing = false;
    this.current = 0;
    this.emit("stop", this);
    this.emit("end", this);
  }

  render(delta: number): void {
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