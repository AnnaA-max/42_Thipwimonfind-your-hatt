"use strict";
import promptSync from "prompt-sync";

const prompt = promptSync({ sigint: true });

// Board tiles
const PLAYER = "*";
const EMPTY = "░";
const HOLE = "O";
const HAT = "^";

// Hardcoded board
let board = [
	[PLAYER, EMPTY, HOLE],
	[EMPTY, HOLE, EMPTY],
	[EMPTY, HAT, EMPTY],
];

const rows = board.length;
const cols = board[0].length;

// Game state
let playerRow = 0;
let playerCol = 0;
let playing = true;


// Print board
function printBoard(board) {
  console.clear(); // เคลียร์หน้าจอ (ถ้าต้องการ)
  for (let row of board) {
  	console.log(row.join(""));
  }
}
//getPlayerInput
function getPlayerInput(){
	const input = prompt("Which way? (w/a/s/d): ");
	if (!input) return null;
	const key = input.trim().toLowerCase();

	switch (key) {
		case "w":
		case "a":
		case "s":
		case "d":
			return key;
		default:
			console.log("Invalid input. Please type w, a, s, or d.");
			return null;
	}
}

// Movement Function
function moveUp(row, col) {
  return { row: row - 1, col };
}
function moveDown(row, col) {
  return { row: row + 1, col };
}
function moveLeft(row, col) {
  return { row, col: col - 1 };
}
function moveRight(row, col) {
  return { row, col: col + 1 };
}

// gameRuleChecks
function checkGameRules(board,position){
	const { row, col } = position;

	//1. moving outside the board
	 if (row < 0 || row >= rows || col < 0 || col >= cols){
		return {status: "lose-out", message: "You moved out of the board! GaMe OVER"};
	}

	const check = board[row][col];

	// 2. HOLE
	if(check === HOLE){
		return {status: "lose-hole", message: "You fell into a hole!! GAME OVER"};
	}

	// 3. HAT
	if(check === HAT){
		return {status: "win", message: "You found your hat!! YOU WIN!!! "};
	}

	// 4. EMPTY
	if(check === EMPTY){
		return {status: "continue", message: ""};
	}
	return { status: "continue", message: "" };
}

// updateBoard
function updateBoard(board, oldPlayerPos , newPlyerPos) {
	const {row: oldRow, col: oldCol} = oldPlayerPos;
	const {row: newRow, col: newCol} = newPlyerPos;

	if (oldRow >= 0 && oldRow < rows && oldCol >= 0 && oldCol < cols) {
		board[oldRow][oldCol] = EMPTY;
	}
	board[newRow][newCol] = PLAYER;

}



// Game play loop
// printBoard(board);
// const input = prompt("Which way? (w/a/s/d): ");
// console.log(input);
function gameLoop(){
	printBoard(board);

	while(playing){
		const input = getPlayerInput();
		if (!input) continue;

		// new position
		let newPosition;

		if(input === "w") {
			newPosition = moveUp(playerRow, playerCol);

		}else if(input === "s") {
			newPosition = moveDown(playerRow, playerCol);

		}else if(input === "a") {
			newPosition = moveLeft(playerRow, playerCol);

		}else if(input == "d") {
			newPosition = moveRight(playerRow, playerCol);}

		// Check Game Rules
		const result = checkGameRules(board, newPosition);

		if(result.status === "lose-out" || result.status === "lose-hole") {
			console.log(result.message);
			break;
		} else if (result.status === "win"){
			console.log(result.message);
			break;
		} else {
			updateBoard(board, { row: playerRow, col: playerCol }, newPosition);
			playerRow = newPosition.row;
			playerCol = newPosition.col;

			printBoard(board);
		}
	}

}

gameLoop();