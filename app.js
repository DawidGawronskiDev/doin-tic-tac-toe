(function () {
  let Game = {
    gameboardArr: [null, null, null, null, null, null, null, null, null],
    fieldsRenderd: false,
    option: "X",
    _init: function () {
      this._cacheDOM();
      this._renderGameboard();
      this.bindEvents();
      this._render();
    },
    _cacheDOM: function () {
      this.gameModule = document.querySelector("#gameModule");
      this.gameboard = this.gameModule.querySelector("#gameboard");
    },
    _renderGameboard: function () {
      if (!this.fieldsRenderd) {
        this.gameboardArr.forEach(
          (field) =>
            (gameboard.innerHTML += `<li class="field" data-selected="false"></li>`)
        );
        this.fieldsRenderd = true;
      }
    },
    _render: function () {
      for (let i = 0; i < this.gameboardArr.length; i++) {
        if (this.gameboardArr[i] !== null) {
          this.fields[i].innerHTML = `${this.gameboardArr[i]}`;
        }
      }
    },
    bindEvents: function () {
      this.fields = Array.from(this.gameModule.querySelectorAll(".field"));
      this.fields.forEach((field) =>
        field.addEventListener("click", this.addOption.bind(this))
      );
    },
    addOption: function (e) {
      if (this.gameboardArr[this.fields.indexOf(e.target)] === null) {
        this.gameboardArr[this.fields.indexOf(e.target)] = this.option;
        console.log(this.gameboardArr);
        this.option === "X" ? (this.option = "O") : (this.option = "X");
        this._render();
      }
    },
  };
  Game._init();
})();
