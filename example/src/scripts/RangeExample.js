export default class RangeExample {
  constructor() {
    const $pattern = document.querySelector('#easing-test-patern');
    this.$parent = $pattern.parentNode;
    this.$element = $pattern.cloneNode(true);
    this.$element.removeAttribute('id')
    document.body.appendChild(this.$element);

    this.$elements = {
      bar: this.$element.querySelector('.example__bar'),
      title: this.$element.querySelector('.example__title'),
      description: this.$element.querySelector('.example__description'),
      value: this.$element.querySelector('.example__value'),
      advancement: this.$element.querySelector('.example__advancement'),
    }
  }

  setTitle(title) {
    this.$elements.title.innerHTML = title;
  }

  setDescription(description) {
    this.$elements.description.innerHTML = description;
  }

  update({ value, advancement }) {
    this.$elements.bar.style.setProperty('--progress', value + '%');
    this.$elements.value.innerHTML = `value: <span>${Math.floor(value * 1000) / 1000}</span>`;
    this.$elements.advancement.innerHTML = `progress: <span>${Math.floor(advancement * 1000) / 1000}</span>`;
  }
}