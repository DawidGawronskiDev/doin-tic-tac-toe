const Game = (() => {
  let gameboardArr = [
    { mark: " ", active: true },
    { mark: " ", active: true },
    { mark: " ", active: true },
    { mark: " ", active: true },
    { mark: " ", active: true },
    { mark: " ", active: true },
    { mark: " ", active: true },
    { mark: " ", active: true },
    { mark: " ", active: true },
  ];

  let gameboard;
  let fields;
  let mark = "X";
  let players = [];

  const playerFactory = (name, mark) => {
    return { name, mark };
  };

  const addPlayer = (name, mark) => {
    players.push(playerFactory(name, mark));
    checkPlayers();
  };

  const checkPlayers = () => {
    //FIRST PLAYER
    if (players[0].mark !== "X" && players[0].mark !== "O") {
      players[0].mark = "X";
    }
    //SECOND PLAYER
    if (players[1] && players[0].mark === "X") {
      players[1].mark = "O";
    }
    if (players[1] && players[0].mark === "O") {
      players[1].mark = "X";
    }
    if (players[1] && players[0].name === players[1].name) {
      players.pop();
    }
    //IF THERE ARE TWO PLAYERS
    if (players.length > 2) {
      players.pop();
    }

    console.table(players);
  };

  const startGame = () => {
    render();
    cacheDOM();
    bindEvents();
    console.table(gameboardArr);
  };

  const cacheDOM = () => {
    gameboard = document.querySelector("#gameboard");
    fields = Array.from(document.querySelectorAll(".field"));
  };

  const render = () => {
    cacheDOM();
    gameboard.innerHTML = "";
    gameboardArr.forEach((field) => {
      gameboard.innerHTML += `<li class="field"></li>`;
    });
  };

  const bindEvents = () => {
    fields.forEach((field) => field.addEventListener("click", addMark));
  };

  const addMark = (e) => {
    const type = typeof e;
    type == "number" ? (e = e) : (e = fields.indexOf(e.target));
    let index = e;
    if (gameboardArr[index].active === true) {
      gameboardArr[index].mark = mark;
      gameboardArr[index].active = false;
      changePlayer();

      console.clear();
      console.table(gameboardArr);
      console.table(players);
      checkWinner(gameboardArr);
    }
  };

  const changePlayer = () => {
    mark === "X" ? (mark = "O") : (mark = "X");
  };

  const checkWinner = (arr) => {
    // rows
    if (
      arr[0].mark === arr[1].mark &&
      arr[1].mark === arr[2].mark &&
      arr[1].active === false
    ) {
      console.log("Win!");
    }
    if (
      arr[3].mark === arr[4].mark &&
      arr[4].mark === arr[5].mark &&
      arr[4].active === false
    ) {
      console.log("Win!");
    }
    if (
      arr[6].mark === arr[7].mark &&
      arr[7].mark === arr[8].mark &&
      arr[7].active === false
    ) {
      console.log("Win!");
    }
    // columns
    if (
      arr[0].mark === arr[3].mark &&
      arr[3].mark === arr[6].mark &&
      arr[3].active === false
    ) {
      console.log("Win!");
    }
    if (
      arr[1].mark === arr[4].mark &&
      arr[4].mark === arr[7].mark &&
      arr[4].active === false
    ) {
      console.log("Win!");
    }
    if (
      arr[2].mark === arr[5].mark &&
      arr[5].mark === arr[8].mark &&
      arr[5].active === false
    ) {
      console.log("Win!");
    }
    // diagonal
    if (
      arr[0].mark === arr[4].mark &&
      arr[4].mark === arr[8].mark &&
      arr[4].active === false
    ) {
      console.log("Win!");
    }
    if (
      arr[3].mark === arr[5].mark &&
      arr[5].mark === arr[6].mark &&
      arr[5].active === false
    ) {
      console.log("Win!");
    }
  };

  return { startGame, addMark, addPlayer };
})();
