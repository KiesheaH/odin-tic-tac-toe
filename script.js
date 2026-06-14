"use strict";

function Cell() {
  // initialize the value
  let value = 0;

  // changes the player marker based on activePlayer
  const addMarker = (marker) => (value = marker);

  // retrieves the current value
  const getValue = () => value;

  // gives global access to variables
  return { addMarker, getValue };
}

function Gameboard() {
  // define the size of the board
  const rows = 3;
  const columns = 3;
  const board = [];

  // loop through to create the game board
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  // gets the current value of the board
  const getBoard = () => board;

  const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue()),
    );
    console.log(boardWithCellValues);
  };

  // initialize the game board
  const resetBoard = () => {
    board.length = 0;
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i].push(Cell());
      }
    }
  };

  return { getBoard, printBoard, resetBoard };
}

function GameController() {
  // defines the players object
  const players = [
    {
      name: "Player 1",
      marker: "X",
    },

    {
      name: "Player 2",
      marker: "O",
    },
  ];

  // allows access to global variables
  const board = Gameboard();

  // defines the winning conditions
  let gameSpaces = board.getBoard();

  let winningConditions = [
    [gameSpaces[0][0], gameSpaces[0][1], gameSpaces[0][2]],
    [gameSpaces[1][0], gameSpaces[1][1], gameSpaces[1][2]],
    [gameSpaces[2][0], gameSpaces[2][1], gameSpaces[2][2]],
    [gameSpaces[0][0], gameSpaces[1][0], gameSpaces[2][0]],
    [gameSpaces[0][1], gameSpaces[1][1], gameSpaces[2][1]],
    [gameSpaces[0][2], gameSpaces[1][2], gameSpaces[2][2]],
    [gameSpaces[0][0], gameSpaces[1][1], gameSpaces[2][2]],
    [gameSpaces[0][2], gameSpaces[1][1], gameSpaces[2][0]],
  ];

  // selects the activePlayer
  let activePlayer = players[0];

  // switch activePlayer
  const switchPlayerTurn = () =>
    (activePlayer = activePlayer === players[0] ? players[1] : players[0]);

  // loops through to check if any spaces are available
  let gameOver = false;
  const playRound = (row, column) => {
    // checks if there is an empty space
    if (gameOver === false) {
      if (gameSpaces[row][column].getValue() === 0) {
        gameSpaces[row][column].addMarker(activePlayer.marker);
        board.printBoard();
        switchPlayerTurn();
      } else {
        console.log("Space occupied. Try again!");
      }

      // checks for winner
      for (let i = 0; i < winningConditions.length; i++) {
        let condition = winningConditions[i]
          .map((cell) => cell.getValue())
          .join("");
        if (condition === players[0].marker.repeat(3)) {
          gameOver = true;
          console.log(`Player ${players[0].marker} wins!`);
        } else if (condition === players[1].marker.repeat(3)) {
          gameOver = true;
          console.log(`Player ${players[1].marker} wins!`);
        }
      }

      if (
        !gameOver &&
        gameSpaces.every((row) => row.every((cell) => cell.getValue() !== 0))
      ) {
        gameOver = true;
        console.log("It's a tie!");
      }
    } else {
      console.log("Game Over!");
    }
  };
  // initialize the game
  const init = () => {
    board.resetBoard();
    gameSpaces = board.getBoard();
    activePlayer = players[0];
    gameOver = false;
    winningConditions = [
      [gameSpaces[0][0], gameSpaces[0][1], gameSpaces[0][2]],
      [gameSpaces[1][0], gameSpaces[1][1], gameSpaces[1][2]],
      [gameSpaces[2][0], gameSpaces[2][1], gameSpaces[2][2]],
      [gameSpaces[0][0], gameSpaces[1][0], gameSpaces[2][0]],
      [gameSpaces[0][1], gameSpaces[1][1], gameSpaces[2][1]],
      [gameSpaces[0][2], gameSpaces[1][2], gameSpaces[2][2]],
      [gameSpaces[0][0], gameSpaces[1][1], gameSpaces[2][2]],
      [gameSpaces[0][2], gameSpaces[1][1], gameSpaces[2][0]],
    ];
  };
  return { playRound, init };
}

const game = GameController();

// ROUND 1
game.playRound(0, 0);
game.playRound(1, 0);
game.playRound(0, 1);
game.playRound(0, 2);
game.playRound(2, 0);
game.playRound(1, 1);
game.playRound(1, 2);
game.playRound(2, 1);
game.playRound(2, 2);
