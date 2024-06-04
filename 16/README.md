Find Santa (part 2)
Since the episode with him getting lost on Tuesday (Day 12), the elves have started to get concerned about Santa getting lost again, but deeper in the forest. Since Santa's college buddy got WiFi installed in the whole property, Santa just wanders around scrolling TikTok without looking where he's going. Santa claimed that the reason the whole campus needed WiFi (even the forest) was to "future-proof the business" and "attract top talent" but it's beginning to seem like it was so he could personally get better phone service (cell reception in the north pole isn't great and without 116th H.R.7302, neither is the rural internet speed).

Sure enough. It happened again. Santa got lost, again, but this time much deeper in the forest.

This time we have to search columns as well as rows to find him.

The FindSanta takes only one argument, the forest (an array of arrays), and returns the [Row, Column] indices where Santa is located. Then an elf search team can be deployed to retrieve him.

prompt by Dimitri Mitropoulos of MiTS

> 问题12的进阶版本,从**一维元组**中进阶到**二维元组**中找到指定元素的数组索引

## Question

```ts
import { Expect, Equal } from 'type-testing';

type Forest0 = [
  ['🎅🏼', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄'],
];
type test_0_actual = FindSanta<Forest0>;
//   ^?
type test_0_expected = [0, 0];
type test_0 = Expect<Equal<test_0_expected, test_0_actual>>;

type Forest1 = [
  ['🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎅🏼', '🎄', '🎄'],
];
type test_1_actual = FindSanta<Forest1>;
//   ^?
type test_1_expected = [3, 1];
type test_1 = Expect<Equal<test_1_expected, test_1_actual>>;

type Forest2 = [
  ['🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎅🏼', '🎄'],
  ['🎄', '🎄', '🎄', '🎄'],
];
type test_2_actual = FindSanta<Forest2>;
//   ^?
type test_2_expected = [2, 2];
type test_2 = Expect<Equal<test_2_expected, test_2_actual>>;

type Forest3 = [
  ['🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎅🏼', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄'],
];
type test_3_actual = FindSanta<Forest3>;
//   ^?
type test_3_expected = [2, 1];
type test_3 = Expect<Equal<test_3_expected, test_3_actual>>;

type Forest4 = [
  ['🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎅🏼', '🎄'],
  ['🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄'],
];
type test_4_actual = FindSanta<Forest4>;
//   ^?
type test_4_expected = [1, 2];
type test_4 = Expect<Equal<test_4_expected, test_4_actual>>;



```

## Solution

> 对比问题12，就是简单的增加了一层逻辑,没有额外的基础知识，简单的考验编程基本功
> 对于元组类型,直接通过下标`TypeTuple[IndexNumber]`即可取出对应元素的类型

```ts
// example
type Tuple = ['0','1','2','3'];
type str0 = Tuple[0]; // '0'
type str1 = Tuple[1]; // '1'
type str2 = Tuple[2]; // '2'
type str3 = Tuple[3]; // '3'

```

```ts
// answer
type FindSanta<
	M extends any[][],
	Row extends unknown[] = [],
	Column extends unknown[] = [],
> = M[Row["length"]][Column["length"]] extends "🎅🏼"
	? [Row["length"], Column["length"]]
	: FindSanta<
			M,
			Column["length"] extends M[Row["length"]]["length"] ? [unknown, ...Row] : Row,
			Column["length"] extends M[Row["length"]]["length"] ? [] : [unknown, ...Column]
		>;

```
