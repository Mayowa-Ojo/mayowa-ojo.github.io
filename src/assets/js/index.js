class RotateText {
  constructor(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.text = '';
    this.isDeleting = false;
    this.tick();
  }

  tick() {
    const i = this.loopNum % this.toRotate.length;
    const fullText = this.toRotate[i];

    if(this.isDeleting) {
      this.text = fullText.substring(0, this.text.length - 1);
    } else {
      this.text = fullText.substring(0, this.text.length + 1);
    }

    this.el.innerHTML = `<span class="wrap">${this.text}</span>`;

    const self = this;
    let delta = 300 - Math.random() * 100;

    if(this.isDeleting) {
      delta /= 2;
    }

    if(!this.isDeleting && this.text === fullText) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.text === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(function() {
      self.tick();
    }, delta);
  }
}

window.onload = () => {
  const elements = document.querySelectorAll('.text-rotate');

  for(let i = 0; i < elements.length; i++) {
    const toRotate = elements[i].getAttribute('data-rotate');
    const period = elements[i].getAttribute('data-period');

    if(toRotate) {
      new RotateText(elements[i], JSON.parse(toRotate), period);
    }
  }

  // Add CSS
  const css = document.createElement('style');
  css.type = 'text/css';
  css.innerHTML = '.text-rotate > .wrap { border-right: 0.08em solid #fff }';
  document.body.appendChild(css);
}
