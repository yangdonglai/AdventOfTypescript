What is Tic Tac Toe?
Tic-Tac-Toe is a two-player game where players alternate marking `❌`s and `⭕`s in a 3x3 grid, aiming to get three in a row.

fun fact: Did you know that tic tac toe is widely considered to be the first computer video game ever created?! That's right! A S Douglas implemented it all the way back in 1952, the same year as the coronation of Queen Elizabeth II.

Solving Tic Tac Toe
Your goal for this challenge is to use TypeScript types to encode the game logic of Tic Tac Toe. Eventually, every game will end with one of the players winning or a draw.

prompt by Dimitri Mitropoulos of MiTS

## Question

> 九宫格游戏,先连成线的一方胜利，


```ts

import { Equal, Expect } from 'type-testing';

type test_move1_actual = TicTacToe<NewGame, 'top-center'>;
//   ^?
type test_move1_expected = {
	board: [
	[ '  ', '❌', '  ' ],
	[ '  ', '  ', '  ' ],
	[ '  ', '  ', '  ' ]
	];
	state: '⭕';
};
type test_move1 = Expect<Equal<test_move1_actual, test_move1_expected>>;

type test_move2_actual = TicTacToe<test_move1_actual, 'top-left'>;
//   ^?
type test_move2_expected = {
	board: [
	['⭕', '❌', '  '], 
	['  ', '  ', '  '], 
	['  ', '  ', '  ']];
	state: '❌';
}
type test_move2 = Expect<Equal<test_move2_actual, test_move2_expected>>;

type test_move3_actual = TicTacToe<test_move2_actual, 'middle-center'>;
//   ^?
type test_move3_expected = {
	board: [
	[ '⭕', '❌', '  ' ],
	[ '  ', '❌', '  ' ],
	[ '  ', '  ', '  ' ]
	];
	state: '⭕';
};
type test_move3 = Expect<Equal<test_move3_actual, test_move3_expected>>;

type test_move4_actual = TicTacToe<test_move3_actual, 'bottom-left'>;
//   ^?
type test_move4_expected = {
	board: [
	[ '⭕', '❌', '  ' ],
	[ '  ', '❌', '  ' ],
	[ '⭕', '  ', '  ' ]
	];
	state: '❌';
};
type test_move4 = Expect<Equal<test_move4_actual, test_move4_expected>>;


type test_x_win_actual = TicTacToe<test_move4_actual, 'bottom-center'>;
//   ^?
type test_x_win_expected = {
	board: [
	[ '⭕', '❌', '  ' ],
	[ '  ', '❌', '  ' ],
	[ '⭕', '❌', '  ' ]
	];
	state: '❌ Won';
};
type test_x_win = Expect<Equal<test_x_win_actual, test_x_win_expected>>;

type type_move5_actual = TicTacToe<test_move4_actual, 'bottom-right'>;
//   ^?
type type_move5_expected = {
	board: [
	[ '⭕', '❌', '  ' ],
	[ '  ', '❌', '  ' ],
	[ '⭕', '  ', '❌' ]
	];
	state: '⭕';
};
type test_move5 = Expect<Equal<type_move5_actual, type_move5_expected>>;

type test_o_win_actual = TicTacToe<type_move5_actual, 'middle-left'>;
//   ^?
type test_o_win_expected = {
	board: [
	[ '⭕', '❌', '  ' ],
	[ '⭕', '❌', '  ' ],
	[ '⭕', '  ', '❌' ]
	];
	state: '⭕ Won';
};

// invalid move don't change the board and state
type test_invalid_actual = TicTacToe<test_move1_actual, 'top-center'>;
//   ^?
type test_invalid_expected = {
	board: [
	[ '  ', '❌', '  ' ],
	[ '  ', '  ', '  ' ],
	[ '  ', '  ', '  ' ]
	];
	state: '⭕';
};
type test_invalid = Expect<Equal<test_invalid_actual, test_invalid_expected>>;

type test_before_draw = {
	board: [
	['⭕', '❌', '⭕'], 
	['⭕', '❌', '❌'], 
	['❌', '⭕', '  ']];
	state: '⭕';
}
type test_draw_actual = TicTacToe<test_before_draw, 'bottom-right'>;
//   ^?
type test_draw_expected = {
	board: [
	['⭕', '❌', '⭕'], 
	['⭕', '❌', '❌'], 
	['❌', '⭕', '⭕']];
	state: 'Draw';
}
type test_draw = Expect<Equal<test_draw_actual, test_draw_expected>>;
```
