"use strict";

// controls the gameplay
function Gameboard() {
  /* defines the size of the board */
  const rows = 3;
  const columns = 3;
  const board = [];

  /* creates a 2D board 
      1. loop through the board array to create rows
      2. create game spaces (columns) for each row
  */
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push("x");
    }
  }

  /* get the board's current layout */
  const getBoard = () => board;

  /* place marker on the board 
      1. IF game space is empty, add marker
      2. switch player and marker
      3. IF game space is occupied, send message to player
          a. keep layer and marker the same
  */
  const addMarker = (column, player) => {};

  /* print the board's current layout 
      1. export the global variables
  */
  console.log(board);
}

Gameboard();

// controls the flow of the game
function GameController() {
  // create game space to hold value
  const value = "";

  // give players option to select a marker

  // store players information in an object
  const players = [
    {
      player: "playerOne",
      score: 0,
      marker: "X",
    },
    {
      player: "playerTwo",
      score: 0,
      marker: "O",
    },
  ];

  /* start button 
      1. BOTH players must select a marker
      2. IF player 1 selects 'X', then player 2 is 'O'
      3. randomly select which player moves first
      4. announce which player moves first
  
  */

  // keep track of which player's turn it is
  let activePlayer = players[0];

  activePlayer = activePlayer === players[0] ? players[1] : players[0];
  console.log(activePlayer);
  ``;
  /* keep track of the round 
      1. for three rounds
      2. IF player has more wins, send congratulatory message
      3. IF players tied, send message
  */
  // check to see if there are three identical markers in a row
  /* if three markers in a rows
      1. switch player
      2. change round
  */
  /* reset button 
  // reset player marker to default
  // reset player 1 to default
  // reset round back to 0
  */
  return { activePlayer };
}
