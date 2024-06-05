Rock, Paper, Scissors
It's Sunday and there's one week to go before the big day (Christmas Eve) when the elfs' work for the year will finally be complete. For the last 20 years the only game the elves have had to play together is StarCraft. They're looking for a fresh game to play.

So, they get the idea to try a Rock, Paper, Scissors tournament.

But the elves are sorta nerdy so they want to accomplish this using TypeScript types. The WhoWins should type to correctly determine the winner in a Rock-Paper-Scissors game. The first argument is the opponent and the second argument is you!

What's Rock, Paper, Scissors?
In case you haven't played it before, basically:

it's a two player game where each player picks one of three options: Rock (👊🏻), Paper (🖐🏾), and Scissors (✌🏽)
game rules:
Rock crushes Scissors (Rock wins)
Scissors cuts Paper (Scissors wins)
Paper covers Rock (Paper wins)
otherwise, a draw
prompt by Dimitri Mitropoulos of MiTS

> `事情开始变得有趣了起来` 用TS的类型系统实现 `剪刀石头布`的游戏

## Question

```ts

import { Expect, Equal } from "type-testing";

type test_0_actual = WhoWins<"👊🏻", "🖐🏾">;
//   ^?
type test_0_expected = "win";
type test_0 = Expect<Equal<test_0_expected, test_0_actual>>;

type test_1_actual = WhoWins<"👊🏻", "✌🏽">;
//   ^?
type test_1_expected = "lose";
type test_1 = Expect<Equal<test_1_expected, test_1_actual>>;

type test_2_actual = WhoWins<"👊🏻", "👊🏻">;
//   ^?
type test_2_expected = "draw";
type test_2 = Expect<Equal<test_2_expected, test_2_actual>>;

type test_3_actual = WhoWins<"🖐🏾", "👊🏻">;
//   ^?
type test_3_expected = "lose";
type test_3 = Expect<Equal<test_3_expected, test_3_actual>>;

type test_4_actual = WhoWins<"🖐🏾", "✌🏽">;
//   ^?
type test_4_expected = "win";
type test_4 = Expect<Equal<test_4_expected, test_4_actual>>;

type test_5_actual = WhoWins<"🖐🏾", "🖐🏾">;
//   ^?
type test_5_expected = "draw";
type test_5 = Expect<Equal<test_5_expected, test_5_actual>>;

type test_6_actual = WhoWins<"✌🏽", "👊🏻">;
//   ^?
type test_6_expected = "win";
type test_6 = Expect<Equal<test_6_expected, test_6_actual>>;

type test_7_actual = WhoWins<"✌🏽", "✌🏽">;
//   ^?
type test_7_expected = "draw";
type test_7 = Expect<Equal<test_7_expected, test_7_actual>>;

type test_8_actual = WhoWins<"✌🏽", "🖐🏾">;
//   ^?
type test_8_expected = "lose";
type test_8 = Expect<Equal<test_8_expected, test_8_actual>>;


```

## Solution

> 基本上就是JS的实现思路,准备一个两层嵌套的对象,然后将两个出招当作`key`直接取出结果即可

1. 问题16提到过对于元组类型可以通过索引下标直接取出对应位置元素的类型。而对于一个常量对象类型,也可以通过属性名直接取出对应的属性类型
```ts
//example
type Dist = {
  a: 1;
  b: 2;
  c: 3;
};
type PropertyA = Dist['a']; // 1
type PropertyB = Dist['b']; // 2
type PropertyC = Dist['c']; // 3
```

```ts
// answer
type RockPaperScissors = "👊🏻" | "🖐🏾" | "✌🏽";
type Result = {
  "👊🏻": {
    "🖐🏾": "lose";
    "✌🏽": "win";
    "👊🏻": "draw";
  };
  "🖐🏾": {
    "👊🏻": "win";
    "✌🏽": "lose";
    "🖐🏾": "draw";
  };
  "✌🏽": {
    "🖐🏾": "win";
    "👊🏻": "lose";
    "✌🏽": "draw";
  };
};
type WhoWins<
  A extends RockPaperScissors,
  B extends RockPaperScissors
> = Result[B][A];
```
