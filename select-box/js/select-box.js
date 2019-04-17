class SelectBox {
  constructor(config) {
    this.config = config;

    this.$selectBox = document.querySelector(this.config.selector);
    this.$selectBox.classList.add("select-box");

    // create select-box
    // determine data to generate select box list using promise or array passed via option
    this.getData()
      .then(data => {
        console.log(data);
        // render select box using promise or array passed via option
        this.render(data);

        this.$input = this.$selectBox.querySelector("input[type=text]");
        this.$ul = this.$selectBox.querySelector("ul");
        this.$item = document.querySelector(".selected-item");

        this.$input.onfocus = this.show.bind(this);

        this.$ul.onmouseover = function(e) {
          if (e.target.nodeName !== "LI") return;
          [...this.childNodes].forEach(el =>
            el.nodeName === "LI" ? el.classList.remove("selected") : ""
          );
          e.target.classList.add("selected");
        };

        this.$ul.onclick = function(e) {
          if (e.target.nodeName !== "LI") return;
          this.setValue(e.target.textContent);
          this.renderValue(e.target.textContent);
          this.hide();
        }.bind(this);

        // only one event handler can be binded to event handler property
        // addEventHandler can add multiple event handler to one event
        document.addEventListener(
          "click",
          function(e) {
            // close list if element invoked event is not a child element of $selectBox
            if (!this.$selectBox.contains(e.target)) this.hide();
          }.bind(this)
        );
      })
      .catch(error => console.log(error));
  }

  // determine data to generate select box list using promise or array passed via option
  getData() {
    return new Promise((resolve, reject) => {
      const { data, promise } = this.config;

      if (!data && !promise) reject(new Error("No data!"));

      if (promise) {
        promise.then(res => resolve(res));
      } else {
        resolve(data);
      }
    });
  }

  // render select box using passed array via option
  render(data) {
    const html = `
        <input type="text" readonly placeholder="${this.config.placeholder}">
        <ul class="${this.visible ? "show" : ""}">
        ${data.map(v => `<li>${v}</li>`).join("")}
        </ul>`;

    this.$selectBox.innerHTML = html;
  }

  show() {
    this.$selectBox.classList.add("show");
  }

  hide() {
    this.$selectBox.classList.remove("show");
  }

  setValue(val) {
    this.$input.value = val;
  }

  renderValue(val) {
    this.$item.textContent = val;
  }
}

// generate birth date
function range(from, to) {
  return new Array(to - from + 1).fill("").map((e, i) => i + from + "");
}

// retrieve github repo data using github API
function getGithubRepo() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.github.com/users/bbq9234/repos");
    xhr.send();

    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.response).map(res => res.name));
        } else {
          reject(new Error(xhr.status));
        }
      }
    };
  });
}

const selectBoxBirthYear = new SelectBox({
  selector: "#select-box-birth-year",
  placeholder: "Select your Birth year",
  data: range(1910, 2030) // Array
});

const selectBoxGithubRepo = new SelectBox({
  selector: "#select-box-github-repo",
  placeholder: "Select your Github Repo",
  promise: getGithubRepo() // Promise
});
