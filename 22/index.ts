type TicTacToeChip = "❌" | "⭕";
type TicTacToeEndState = "❌ Won" | "⭕ Won" | "Draw";
type TicTacToeState = TicTacToeChip | TicTacToeEndState;
type TicTacToeEmptyCell = "  ";
type TicTacToeCell = TicTacToeChip | TicTacToeEmptyCell;
type TicTacToeYPositions = "top" | "middle" | "bottom";
type TicTacToeXPositions = "left" | "center" | "right";
type TicTacToePositions = `${TicTacToeYPositions}-${TicTacToeXPositions}`;
type TicTactToeBoard = TicTacToeCell[][];
type TicTacToeGame = {
	board: TicTactToeBoard;
	state: TicTacToeState;
};

type EmptyBoard = [["  ", "  ", "  "], ["  ", "  ", "  "], ["  ", "  ", "  "]];

type NewGame = {
	board: EmptyBoard;
	state: "❌";
};
/**
 * 将字符串转换为元组索引
 */
type YIndex = {
	top: 0;
	middle: 1;
	bottom: 2;
};
/**
 * 将字符串转换为元组索引
 */
type XIndex = {
	left: 0;
	center: 1;
	right: 2;
};

type TicTacToe<
	Game extends { board: any[][]; state: "❌" | "⭕" },
	S extends string,
> = S extends `${infer Y extends TicTacToeYPositions}-${infer X extends TicTacToeXPositions}`
	? Game["board"][YIndex[Y]][XIndex[X]] extends "  "
		? DrawEnd<
				IsGameEnd<
					{
						state: "❌" extends Game["state"] ? "⭕" : "❌";
						// board: StepBoard<Game["board"], XIndex[X], YIndex[Y], Game["state"]>;
						board: StepOnce<Game["board"], YIndex[Y], XIndex[X], Game["state"]>;
						// board:  [XIndex[X], YIndex[Y]]
					},
					// [[[0, 0], [0, 1], [0, 2]], [[1, 0], [1, 1], [1, 2]], [[0, 1], [1, 1], [2, 1]]]
					AllLinePosList
				>
			>
		: Game
	: never;

/**
 * StepOnce 将棋盘进行一次步进，即将对应的 "  " 转换为 "⭕" 或 "❌"
 * 这里无法像 js 那样直接 arr[x][y] = '⭕' 需要遍历整个元组,然后将对应索引元素替换成 "⭕" 
 */
type StepOnce<
	Board extends any[][],
	X extends number,
	Y extends number,
	State,
	RowIndex extends unknown[] = [],
	Ret extends any[][] = [],
> = Board extends [infer First extends any[], ...infer Rest extends any[][]]
	? StepOnce<
			Rest,
			X,
			Y,
			State,
			[unknown, ...RowIndex],
			[...Ret, StepInRow<First, X, Y, State, RowIndex>]
		>
	: Ret;

/**
 * StepInRow 对某一行进行步进
 */ 
type StepInRow<
	Row extends any[],
	X extends number,
	Y extends number,
	State,
	RowIndex extends unknown[],
	ColumnIndex extends unknown[] = [],
	Ret extends any[] = [],
> = X extends RowIndex["length"]
	? Row extends [infer First, ...infer Rest]
		? StepInRow<
				Rest,
				X,
				Y,
				State,
				RowIndex,
				[unknown, ...ColumnIndex],
				[...Ret, ColumnIndex["length"] extends Y ? (First extends "  " ? State : First) : First]
			>
		: Ret
	: Row;

type a = StepInRow<["0", "1", "2"], 0, 1, "JACK", []>;

/**
 * IsEndWithLinePos 判断3个位置的元素是否都为"❌" 或都为  "⭕"
 */
type IsEndWithLinePos<
	Game extends { board: any[][]; state: string },
	P0 extends [number, number],
	P1 extends [number, number],
	P2 extends [number, number],
	Board extends any[][] = Game["board"],
> = Game["state"] extends "❌" | "⭕"
	? Board[P0[0]][P0[1]] extends "❌" | "⭕"
		? Board[P0[0]][P0[1]] extends Board[P1[0]][P1[1]]
			? Board[P0[0]][P0[1]] extends Board[P2[0]][P2[1]]
				? {
						board: Game["board"];
						state: `${Game["state"] extends "❌" ? "⭕" : "❌"} Won`;
					}
				: Game
			: Game
		: Game
	: Game;

/**
 * 判断游戏是否结束
 * 如果对应的3个位置(连线)的元素都是"⭕" 或 "❌"那么游戏结束
 */
type IsGameEnd<Game extends { board: any[][]; state: string }, List> = List extends [
	infer P extends [[number, number], [number, number], [number, number]],
	...infer Rest,
]
	? IsGameEnd<IsEndWithLinePos<Game, P[0], P[1], P[2]>, Rest>
	: Game;

/**
 * Horizontal 水平的连线位置
 */
type HorizontalPos<Row extends number> = [[Row, 0], [Row, 1], [Row, 2]];
/**
 * VerticalPos 垂直的连线位置
 */
type VerticalPos<Column extends number> = [[0, Column], [1, Column], [2, Column]];
/**
 * SpecialLinePos 特殊的连线，两个对角线连线
 */
type SpecialLinePos = [[[0, 0], [1, 1], [2, 2]], [[0, 2], [1, 1], [2, 0]]];

/**
 * 所有的连线的索引元组
 */
type AllLinePosList =[
	HorizontalPos<0>,
	HorizontalPos<1>,
	HorizontalPos<2>,
	VerticalPos<0>,
	VerticalPos<1>,
	VerticalPos<2>,
	...SpecialLinePos,
]
/**
 * DrawEnd 平局结果
 */
type DrawEnd<Game extends { board: any[][]; state: string }> = Game["state"] extends
	| "⭕ Won"
	| "❌ Won"
	? Game
	: IsBoardFull<Game["board"]> extends true
		? {
				board: Game["board"];
				state: "Draw";
			}
		: Game;


/**
 * IsBoardFull 
 * 检测当前棋盘是不是没有空余的位置了
 * 方法很简单,棋盘是一个2维元组,循环遍历每一个元素
 * 如果都是"❌" | "⭕" 那么没有空余位置，反之存在空余位置
 */
type IsBoardFull<Board extends any[][]> = Board extends [
	infer First extends any[],
	...infer Rest extends any[],
]
	? IsBoardRowFull<First> extends false
		? false
		: IsBoardFull<Rest>
	: true;
/**
 * IsBoardRowFull 
 * 检测当前行是不是没有空余的位置了
 */
type IsBoardRowFull<Row extends any[], Ret = never> = Row extends [
	infer First,
	...infer Rest extends any[],
]
	? First extends "❌" | "⭕"
		? IsBoardRowFull<Rest>
		: false
	: true;
// type NoSpace<Board extends any[][]> = Board[number];
// type NoRowSpace<Row extends any[]> = "❌" | "⭕" extends Row[number] ? true : false;
type b = IsBoardRowFull<["❌"]>;
type c = IsBoardFull<[["❌"], ["⭕"]]>;
// type d = NoRowSpace<["❌", "⭕"] | ["❌", " "]>

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