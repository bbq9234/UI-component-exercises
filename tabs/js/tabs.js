class Tab {
  constructor(tabsData) {
    this.tabsData = tabsData;

    // generate tab-group element with tabsData object
    this.renderTabs();

    this.$tabs = document.querySelectorAll(".tab");
    this.$tabContents = document.querySelectorAll(".tab-content");

    // show tab-content element having same index of tab element with class 'active'
    this.showContent(this.tabsData.findIndex(({ active }) => active));

    // add evnet handler
    document
      .querySelector(".tab-group")
      .addEventListener("click", this.changeTab.bind(this));
  }

  // generate tab-group element with tabsData object
  renderTabs() {
    const html = `<ul class="tab-group">${this.tabsData
      .map(
        tab =>
          `<li class="tab${tab.active ? " active" : ""}">
            <i class="icon ${tab.iconClass}"></i>${tab.title}
          </li>`
      )
      .join("")}</ul>
      <div class="tab-content-group">
        ${this.tabsData
          .map(tab => `<div class="tab-content">${tab.content}</div>`)
          .join("")}
      </div>`;

    document.querySelector(".tabs").insertAdjacentHTML("beforeend", html);
  }

  // event handler
  changeTab({ target }) {
    // if icon element clicked, change target to the parent element (tab element)
    target = target.classList.contains("icon") ? target.parentNode : target;

    // if clicked element is not tab element or already having active class, skip it
    if (
      !target.classList.contains("tab") ||
      target.classList.contains("active")
    )
      return;

    // remove active class of non-target elements and add active class to the target element
    this.$tabs.forEach((tab, i) => {
      if (tab === target) {
        // pass the index of target element
        this.showContent(i);
        target.classList.add("active");
      } else {
        tab.classList.remove("active");
      }
    });
  }

  // show tab-content element having same index of tab element with class 'active'
  showContent(index) {
    this.$tabContents.forEach((content, i) => {
      content.style.display = i === index ? "block" : "none";
    });
  }
}

window.onload = function() {
  const tab = new Tab([
    {
      title: "HTML",
      active: true,
      iconClass: "fab fa-html5",
      content: `<strong>HTML(HyperText Markup Language)</strong> is the most basic building block of the Web.
        It describes and defines the content of a webpage along with the basic layout of the webpage.
        Other technologies besides HTML are generally used to describe a web page's
        appearance/presentation(CSS) or functionality/ behavior(JavaScript).`
    },
    {
      title: "CSS",
      active: false,
      iconClass: "fab fa-css3",
      content: `<strong>Cascading Style Sheets(CSS)</strong> is a stylesheet language used to describe
        the presentation of a document written in HTML or XML (including XML dialects
        such as SVG, MathML or XHTML). CSS describes how elements should be rendered on screen,
        on paper, in speech, or on other media.`
    },
    {
      title: "HTML",
      active: false,
      iconClass: "fab fa-js-square",
      content: `<strong>JavaScript(JS)</strong> is a lightweight interpreted or JIT-compiled programming
        language with first-class functions. While it is most well-known as the scripting
        language for Web pages, many non-browser environments also use it, such as Node.js,
        Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm,
        dynamic language, supporting object-oriented, imperative, and declarative
        (e.g. functional programming) styles.`
    }
  ]);
};
