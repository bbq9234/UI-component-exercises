class Carousel {
  constructor(config) {
    this.config = Carousel.mergeConfig(config);

    this.carousel = document.querySelector(".carousel");
    this.container = this.carousel.querySelector(".carousel-item-container");
    this.item = this.carousel.querySelector(".carousel-item");
    this.items = this.carousel.querySelectorAll(".carousel-item");

    this.prev = this.carousel.querySelector(".prev");
    this.next = this.carousel.querySelector(".next");

    this.itemWidth = this.item.offsetWidth;
    this.itemHeight = this.item.offsetHeight;
    this.itemLength = this.items.length;

    this.offset = 0;
    this.currentItem = 1;

    this.init();
    this.attachEvent();
  }

  static mergeConfig(config) {
    const defaultConfig = {
      selector: ".carousel",
      duration: 200,
      easing: "ease-out",
      infinite: true
    };

    return { ...defaultConfig, ...config };
  }

  init() {
    this.carousel.style.width = this.item.offsetWidth + "px";
    this.carousel.style.height = this.item.offsetHeight + "px";

    if (this.config.infinite) {
      this.insertClone();
      this.offset = -this.itemWidth;
      this.moveWithoutAnimation();
    } else {
      this.checkMovable();
    }

    this.carousel.style.opacity = 1;
  }

  attachEvent() {
    this.prev.addEventListener("click", this.moveToPrev.bind(this));
    this.next.addEventListener("click", this.moveToNext.bind(this));

    this.container.addEventListener(
      "transitionend",
      () => (this.isTransiting = false)
    );
  }

  insertClone() {
    const firstItem = this.items[0];
    const lastItem = this.items[this.items.length - 1];

    this.container.insertBefore(
      lastItem.cloneNode(true),
      this.container.firstChild
    );
    this.container.appendChild(firstItem.cloneNode(true));
  }

  moveToPrev() {
    if (this.isTransiting) return;

    this.offset += this.itemWidth;
    this.move();
    this.currentItem--;

    if (this.config.infinite) {
      if (this.isClone()) {
        this.offset -= this.itemLength * this.itemWidth;
        setTimeout(() => this.moveWithoutAnimation(), this.config.duration);
        this.currentItem = this.currentItem + this.itemLength;
      }
    } else {
      this.checkMovable();
    }
  }

  moveToNext() {
    if (this.isTransiting) return;

    this.offset -= this.itemWidth;
    this.move();
    this.currentItem++;

    if (this.config.infinite) {
      if (this.isClone()) {
        this.offset += this.itemLength * this.itemWidth;
        setTimeout(() => this.moveWithoutAnimation(), this.config.duration);
        this.currentItem = this.currentItem - this.itemLength;
      }
    } else {
      this.checkMovable();
    }
  }

  isClone() {
    return this.currentItem === 0 || this.currentItem === this.itemLength + 1;
  }

  move() {
    this.container.style.transition = `transform ${this.config.duration}ms ${
      this.config.easing
    }`;
    this.container.style.transform = `translate3D(${this.offset}px, 0, 0)`;
  }

  moveWithoutAnimation() {
    this.container.style.transition = "none";
    this.container.style.transform = `translate3D(${this.offset}px, 0, 0)`;
  }

  checkMovable() {
    if (this.currentItem === 1) {
      this.prev.disabled = true;
      this.prev.classList.add("disabled");
    } else {
      this.prev.disabled = false;
      this.prev.classList.remove("disabled");
    }

    if (this.currentItem === this.itemLength) {
      this.next.disabled = true;
      this.next.classList.add("disabled");
    } else {
      this.next.disabled = false;
      this.next.classList.remove("disabled");
    }
  }
}

window.onload = function() {
  // const carousel = new Carousel();
  const carousel = new Carousel({ duration: 1000 });
};
