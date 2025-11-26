import promptSync from "prompt-sync";

// Types
type Tile = "*" | "░" | "O" | "^";
type Board = Tile[][];

const prompt = promptSync({ sigint: true });

// Board tiles
const PLAYER: Tile = "*";
const EMPTY: Tile = "░";
const HOLE: Tile = "O";
const HAT: Tile = "^";

// Hardcoded board
let board: Board = [
	[PLAYER, EMPTY, HOLE],
	[EMPTY, HOLE, EMPTY],
	[EMPTY, HAT, EMPTY],
];

//  Game state 
let playerRow: number = 0;
let playerCol: number = 0;
let playing: boolean = true;

// Print board
function printBoard(board: Board): void {
	console.clear();
	console.log(board);
}

// Game play loop
printBoard(board);
const input:string = prompt("Which way? (w/a/s/d): ");
console.log(input);

