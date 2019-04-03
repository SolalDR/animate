/*
 * Easing Functions - inspired from http://gizma.com/easing/
 * only considering the t value for the range [0, 1] => [0, 1]
 */
export default {
  linear: function (t) { return t },
  easeInQuad: function (t) { return t*t },
  easeInQeight: function (t) { return t*t*t*t },
  easeOutQuad: function (t) { return t*(2-t) },
  easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
  easeInCubic: function (t) { return t*t*t },
  easeOutCubic: function (t) { return (--t)*t*t+1 },
  easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
  easeInQuart: function (t) { return t*t*t*t },
  easeOutQuart: function (t) { return 1-(--t)*t*t*t },
  easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
  easeInQuint: function (t) { return t*t*t*t*t },
  easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
  easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }, 
  easeInSine: function(t) { return -Math.cos(t * (Math.PI/2)) + 1 },
  easeOutSine: function(t) { return Math.sin(t * (Math.PI/2))},
  easeInOutSine: function(t) { return (-0.5 * (Math.cos(Math.PI*t) -1)) },
  easeInExpo: function(t) { return (t===0) ? 0 : Math.pow(2, 10 * (t - 1)) },
  easeOutExpo: function(t) { return (t===1) ? 1 : -Math.pow(2, -10 * t) + 1 },
  easeInOutExpo: function(poms) {
    if(t===0) return 0;
    if(t===1) return 1;
    if((t/=0.5) < 1) return 0.5 * Math.pow(2,10 * (t-1));
    return 0.5 * (-Math.pow(2, -10 * --t) + 2);
  },

  easeInCirc: function(t) { return -(Math.sqrt(1 - (t*t)) - 1) },
  easeOutCirc: function(t) { return Math.sqrt(1 - Math.pow((t-1), 2)) },

  easeInOutCirc: function(t) {
    if((t/=0.5) < 1) return -0.5 * (Math.sqrt(1 - t*t) - 1);
    return 0.5 * (Math.sqrt(1 - (t-=2)*t) + 1);
  },

  easeOutBounce: function(t) {
    if ((t) < (1/2.75)) {
      return (7.5625*t*t);
    } else if (t < (2/2.75)) {
      return (7.5625*(t-=(1.5/2.75))*t + 0.75);
    } else if (t < (2.5/2.75)) {
      return (7.5625*(t-=(2.25/2.75))*t + 0.9375);
    } else {
      return (7.5625*(t-=(2.625/2.75))*t + 0.984375);
    }
  },

  easeInBack: function(t) {
    var s = 1.70158;
    return (t)*t*((s+1)*t - s);
  },

  easeOutBack: function(t) {
    var s = 1.70158;
    return (t=t-1)*t*((s+1)*t + s) + 1;
  },

  easeInOutBack: function(t) {
    var s = 1.70158;
    if((t/=0.5) < 1) return 0.5*(t*t*(((s*=(1.525))+1)*t -s));
    return 0.5*((t-=2)*t*(((s*=(1.525))+1)*t +s) +2);
  },

  elastic: function(t) { return -1 * Math.pow(4,-8*t) * Math.sin((t*6-1)*(2*Math.PI)/2) + 1; },

  swingFromTo: function(t) {
    var s = 1.70158;
    return ((t/=0.5) < 1) ? 0.5*(t*t*(((s*=(1.525))+1)*t - s)) :
    0.5*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2);
  },

  swingFrom: function(t) {
    var s = 1.70158;
    return t*t*((s+1)*t - s);
  },

  swingTo: function(t) {
    var s = 1.70158;
    return (t-=1)*t*((s+1)*t + s) + 1;
  },

  bounce: function(t) {
    if (t < (1/2.75)) {
      return (7.5625*t*t);
    } else if (t < (2/2.75)) {
      return (7.5625*(t-=(1.5/2.75))*t + 0.75);
    } else if (t < (2.5/2.75)) {
      return (7.5625*(t-=(2.25/2.75))*t + 0.9375);
    } else {
      return (7.5625*(t-=(2.625/2.75))*t + 0.984375);
    }
  },

  bouncePast: function(t) {
    if (t < (1/2.75)) {
      return (7.5625*t*t);
    } else if (t < (2/2.75)) {
      return 2 - (7.5625*(t-=(1.5/2.75))*t + 0.75);
    } else if (t < (2.5/2.75)) {
      return 2 - (7.5625*(t-=(2.25/2.75))*t + 0.9375);
    } else {
      return 2 - (7.5625*(t-=(2.625/2.75))*t + 0.984375);
    }
  },

  easeFromTo: function(t) {
    if ((t/=0.5) < 1) return 0.5*Math.pow(t,4);
    return -0.5 * ((t-=2)*Math.pow(t,3) - 2);
  },

  easeFrom: function(t) { return Math.pow(t,4); },
  easeTo: function(t) { return Math.pow(t,0.25); }
}
