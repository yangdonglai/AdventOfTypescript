Find Santa
Strange as it may sound.. Santa went to college with someone that works at a big silicon valley networking company. They've been buddies for years. So much so that in 2023 Santa pushed the workshop's board until they approved budget to get WiFi on the entire campus. That way Santa can browse TikTok as he walks from building to building across the campus.

But after all that doomscrolling, Santa realized he has lost himself in a Christmas tree forest! A search team of elves has been deployed to find him, but he needs to give them more information about where he is among the trees.

FindSanta is a type that takes a tuple as its only argument and returns the index where Santa is located. Let's help Santa get back to the thing he's best at: inspiring leadership.

note: never is returned if Santa cannot be found among the trees

prompt by Dimitri Mitropoulos of MiTS

> 从一个元组(注意是元组不是数组)中找到指定字符的数组索引,简单理解为`indexOf`

## Question

```ts

import { Expect, Equal } from 'type-testing';

type Forest0 = ['🎅🏼', '🎄', '🎄', '🎄'];
type test_0_actual = FindSanta<Forest0>;
//   ^?
type test_0_expected = 0;
type test_0 = Expect<Equal<test_0_expected, test_0_actual>>;

type Forest1 = ['🎄', '🎅🏼', '🎄', '🎄', '🎄', '🎄'];
type test_1_actual = FindSanta<Forest1>;
//   ^?
type test_1_expected = 1;
type test_1 = Expect<Equal<test_1_expected, test_1_actual>>;

type Forest2 = ['🎄', '🎄', '🎅🏼', '🎄'];
type test_2_actual = FindSanta<Forest2>;
//   ^?
type test_2_expected = 2;
type test_2 = Expect<Equal<test_2_expected, test_2_actual>>;

type Forest3 = ['🎄', '🎄', '🎄', '🎅🏼', '🎄'];
type test_3_actual = FindSanta<Forest3>;
//   ^?
type test_3_expected = 3;
type test_3 = Expect<Equal<test_3_expected, test_3_actual>>;

type Forest4 = ['🎄', '🎄', '🎄', '🎄'];
type test_4_actual = FindSanta<Forest4>;
//   ^?
type test_4_expected = never;
type test_4 = Expect<Equal<test_4_expected, test_4_actual>>;

```

## Solution

> 运用递归的概念去解,与问题9的区别在于,问题9中止条件是遍历完所有的字符,本题的中止条件是发现与目标字符相同的元组元素
1. 记住`TypeTuple extends [infer First,...infer Rest]` `TypeTuple extends [...infer Rest,infer Last]` 这两个常见用法,常用来对元组从前往后和从后往前遍历
2. 对元组类型`TypeTuple['length']`可以直接获取元组的长度
3. 在递归过程中需要用到当前遍历次数的场景,可以增加一个临时元组类型 `[unknown,...]`没遍历一次往其中增加一个`unknown`元素
4. 注意下面答案中 `Index` 是一个在每次循环中都会改变的`[unknown,...]`元组类型,它继承`unknown[]`类型,但并不是数组类型,对数组类型取`TypeArray['length']`获取的是`number`而不是常量数字

```ts
type FindSanta<List,Index extends unknown[]=[]> = List extends [infer First,...infer Rest]?
'🎅🏼' extends First?Index['length']:FindSanta<Rest,[unknown,...Index]>
:never;
```
