const Game = (() => {
  let gameboard = document.querySelector(".gameboard");
  let fields = Array.from(document.querySelectorAll(".field"));
  let turnDisplay = document.querySelector(".turn-display");

  let _gameboardArr = [];
  for (let i = 0; i < 9; i++) {
    _gameboardArr.push({ mark: " ", active: true });
  }

  let players = [{ mark: "X" }, { mark: "O" }];
  let currentPlayer = players[0];

  const _init = () => {
    _cacheDOM();
    _render(_gameboardArr);
    _bindEvents();
  };

  const _setup = () => {
    gameboard.classList = "gameboard X";
    _gameboardArr = [];
    for (let i = 0; i < 9; i++) {
      _gameboardArr.push({ mark: " ", active: true });
    }
    currentPlayer = players[0];
    turnDisplay.innerHTML = `<img src="./assets/icon-${currentPlayer.mark}.svg" /><span>turn</span>`;
    _render();
  };

  const _cacheDOM = () => {
    gameboard = document.querySelector(".gameboard");
    fields = Array.from(document.querySelectorAll(".field"));
    restartBtn = document.querySelector(".restart");
  };

  const _render = (board) => {
    gameboard.innerHTML = "";
    _gameboardArr.forEach((field) => {
      gameboard.innerHTML += `<li class="field" data-active="${field.active}" data-mark="${field.mark}"></li>`;
    });

    turnDisplay.innerHTML = `<img src="./assets/icon-${currentPlayer.mark}.svg" /><span>turn</span>`;
    _cacheDOM();
    _bindEvents();
  };

  const _bindEvents = () => {
    fields.forEach((field) => field.addEventListener("click", _placeMark));
    restartBtn.addEventListener("click", _setup);
  };

  const _placeMark = (e) => {
    let index = _gameboardArr[fields.indexOf(e.target)];
    if (index.active === true) {
      index.mark = currentPlayer.mark;
      index.active = false;
      _checkPlayers();
      _render();
      gameboard.classList.toggle("X");
      gameboard.classList.toggle("O");
    }
    const winner = checkWinner(_gameboardArr);
  };

  const _checkPlayers = () => {
    currentPlayer === players[0]
      ? (currentPlayer = players[1])
      : (currentPlayer = players[0]);
  };

  checkWinner = (arr) => {
    const winningPositions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    winningPositions.forEach((option) => {
      const [a, b, c] = option;
      if (
        arr[a].mark !== " " &&
        arr[a].mark === arr[b].mark &&
        arr[a].mark === arr[c].mark
      ) {
        console.log(`Player ${arr[a].mark} wins!`);
        return arr[a].mark;
      }
    });

    // If no winner, check for tie game
    if (arr.every((field) => field.mark !== " ")) {
      console.log("Tie game!");
      return "tie";
    }

    // If neither, return null
    return null;
  };

  _init();
})();
