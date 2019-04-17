class Accordion {
  constructor(options) {
    // merge default options and user custom options
    this.config = Accordion.mergeConfig(options);
    this.$accordion = document.querySelector(this.config.selector);

    this.init();
    // 'this' in event handler binds to currentTarget
    this.$accordion.addEventListener("click", this.toogle.bind(this));
  }

  static mergeConfig(options) {
    // default option
    const config = {
      selector: "#accordion",
      multi: true
    };

    return { ...config, ...options };
  }

  init() {
    // li element having active class
    const $ActiveSubmenu = this.$accordion.querySelector(".active .submenu");
    // show li element having active class
    if ($ActiveSubmenu)
      $ActiveSubmenu.style.height = $ActiveSubmenu.scrollHeight + "px";
  }

  toogle(event) {
    if (!event.target.classList.contains("menu")) return;
    // li element which is parent element of <div class="menu"> which invoked click event
    const $targetItem = event.target.parentNode;

    // close all submenus when multi open not allowed
    if (!this.config.multi) {
      [].filter
        .call(
          this.$accordion.childNodes,
          li =>
            li.nodeType === Node.ELEMENT_NODE &&
            li !== $targetItem &&
            li.classList.contains("active")
        )
        .forEach(li => {
          li.classList.remove("active");
          li.querySelector(".submenu").style.height = "0";
        });
    }

    // toggle active class of target li element
    $targetItem.classList.toggle("active");
    // submenu of target li element
    const $submenu = $targetItem.querySelector(".submenu");
    // toggle submenu of target li element
    $submenu.style.height = $targetItem.classList.contains("active")
      ? $submenu.scrollHeight + "px"
      : "0";
  }
}

window.onload = function() {
  const accordion = new Accordion({ multi: false });
  // const accordion = new Accordion();
};
