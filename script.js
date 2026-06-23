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

  const getActivePlayer = () => activePlayer;

  // tracks the result message for the UI
  let resultMessage = "";
  const getResultMessage = () => resultMessage;

  // loops through to check if any spaces are available
  let gameOver = false;
  const getGameOver = () => gameOver;

  const playRound = (row, column) => {
    // checks if there is an empty space
    if (gameOver === false) {
      if (gameSpaces[row][column].getValue() === 0) {
        gameSpaces[row][column].addMarker(activePlayer.marker);
        board.printBoard();
        switchPlayerTurn();
      } else {
        resultMessage = "Space occupied. Try again!";
      }

      // checks for winner
      for (let i = 0; i < winningConditions.length; i++) {
        let condition = winningConditions[i]
          .map((cell) => cell.getValue())
          .join("");
        if (condition === players[0].marker.repeat(3)) {
          gameOver = true;
          resultMessage = `Player ${players[0].marker} wins!`;
        } else if (condition === players[1].marker.repeat(3)) {
          gameOver = true;
          resultMessage = `Player ${players[1].marker} wins!`;
        }
      }

      if (
        !gameOver &&
        gameSpaces.every((row) => row.every((cell) => cell.getValue() !== 0))
      ) {
        gameOver = true;
        resultMessage = "It's a tie!";
      }
    } else {
      resultMessage = "Game Over! Click restart to play again";
    }
  };
  // initialize the game
  const init = () => {
    board.resetBoard();
    gameSpaces = board.getBoard();
    activePlayer = players[0];
    gameOver = false;
    resultMessage = "";
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
  return {
    playRound,
    getActivePlayer,
    getBoard: board.getBoard,
    getResultMessage,
    getGameOver,
    init,
  };
}

function ScreenController() {
  const game = GameController();
  const playerTurnDiv = document.querySelector(".turn");
  const boardDiv = document.querySelector(".board");
  const resultsDiv = document.querySelector(".results"); // Will be null if doesn't exist
  const restartButton = document.querySelector(".restart");

  const updateScreen = () => {
    // clear the board
    boardDiv.textContent = "";

    // get the CURRENT board and active player every time this runs
    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();
    const resultMessage = game.getResultMessage();

    // display player's turn OR winner
    if (game.getGameOver()) {
      playerTurnDiv.textContent = resultMessage;
    } else {
      playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;
    }

    // Only update resultsDiv if it exists
    if (resultsDiv) {
      resultsDiv.textContent = resultMessage;
    }

    // render board squares
    board.forEach((row, rowIndex) =>
      row.forEach((cell, columnIndex) => {
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        cellButton.dataset.row = rowIndex;
        cellButton.dataset.column = columnIndex;
        const value = cell.getValue();
        cellButton.textContent = value === 0 ? "" : value;
        boardDiv.appendChild(cellButton);
      }),
    );
  };

  function clickHandlerBoard(e) {
    const selectedColumn = e.target.dataset.column;
    const selectedRow = e.target.dataset.row;

    if (selectedColumn === undefined || selectedRow === undefined) return;

    game.playRound(selectedRow, selectedColumn);
    updateScreen();
  }

  function clickHandlerRestart() {
    game.init();
    updateScreen();
  }

  boardDiv.addEventListener("click", clickHandlerBoard);
  restartButton.addEventListener("click", clickHandlerRestart);

  updateScreen();
}

ScreenController();
