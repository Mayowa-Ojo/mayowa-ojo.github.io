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

class DOM {
  constructor(hamburger, heroButton, navMenu) {
    this.hamburger = hamburger;
    this.heroButton = heroButton;
    this.navMenu = navMenu;
    this.toggleMenu();
    this.rotateIcon();
  }

  toggleMobileMenu(e) {
    let navMenu;
    if(e.target.tagName == 'A') {
      navMenu = e.target.parentElement.parentElement.children[1];
    } else

    if(e.target.tagName == 'SPAN') {
      navMenu = e.target.parentElement.parentElement.parentElement.children[1];
    }

    navMenu.classList.toggle('is-active');
  }

  toggleMenu() {
    this.hamburger.addEventListener('click', this.handleToggle);
    this.hamburger.addEventListener('click', this.toggleMobileMenu);
  }

  handleToggle(e) {
    // console.log('clicked ', e.target)
    if(e.target.tagName == 'A') {
      e.target.classList.toggle('is-active');
    } else

    if(e.target.tagName == 'SPAN') {
      e.target.parentElement.classList.toggle('is-active');
    }
  }

  handleRotate(e) {
    const heroButtonIcon = document.querySelector('.btn-container i.fas');
    const hasClass = heroButtonIcon.classList.contains('fa-rotate-90');
    if(hasClass) {
      heroButtonIcon.classList.remove('fa-rotate-90');
    } else {
      heroButtonIcon.classList.add('fa-rotate-90');
    }
    // console.log(heroButtonIcon)
  }

  rotateIcon() {
    this.heroButton.addEventListener('mouseenter', this.handleRotate)
    this.heroButton.addEventListener('mouseleave', this.handleRotate)
  }

}

window.onload = () => {
  const elements = document.querySelectorAll('.text-rotate');
  const hamburger = document.querySelector('.navbar-burger');
  const heroButton = document.querySelector('.btn-container');
  const navMenu = document.querySelector('.navbar-menu');

  new DOM(hamburger, heroButton, navMenu);

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
