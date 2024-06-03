Count the Days
The elves are SPENT. They need some motivation. They are (literally) counting down the days until Christmas.

side note on performance bonuses.. Santa promised that this year they'd get a bonus on the 26th (as well as an extra 2 PAID days off over the course of the next year!). Santa actually promised this last year (and the year before) but no one got a bonus because (according to Santa) "global warming has caused rising sea levels which in turn has eaten coastline, causing a need for many repairs at some of the high-density apartment complexes Santa owns in Florida, resulting in lower cashflow for the parent organization". That's what he said, anyway.

So, as a small token of our appreciation, let's help the elves by implementing a type, DayCounter, that they can use to keep track of how many days are remaining before Christmas.

The first argument is the beginning of the count (inclusive), and the second argument is the last number to count to (also inclusive). It should return a union of numbers representing the remaining days.

prompt by Dimitri Mitropoulos of MiTS

> 从一个元组(注意是元组不是数组)中找到指定字符的数组索引,简单理解为`indexOf`

## Question

```ts

    
import { Expect, Equal } from 'type-testing';

type TwelveDaysOfChristmas = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type test_0_actual = DayCounter<1, 12>;
//   ^?
type test_0_expected = TwelveDaysOfChristmas;
type test_0 = Expect<Equal<test_0_expected, test_0_actual>>;

type DaysUntilChristmas =
  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20
  | 21 | 22 | 23 | 24 | 25;
type test_1_actual = DayCounter<1, 25>;
//   ^?
type test_1_expected = DaysUntilChristmas;
type test_1 = Expect<Equal<test_1_expected, test_1_actual>>;

```

## Solution

> 仍然是递归解法,参考问题12中unknown元组,创建了一个工具类`ArrayFromNumber`,根据一个常量数字,生成制定长度的元组
> 再根据开始值,结束创建两个元组,并用两个元组再递归中进行计算

1. 仅针对这一题不必用两个元组进行计算,直接在`ArrayFromNumber`的基础上修改,从生成元组改成生成联合遍历Union即可,这里的`ArrayFromNumber`会在后面多个题目都能利用到

```ts
type DayCounter<From, To> = Calc<ArrayFromNumber<From>, ArrayFromNumber<To>>;
type Calc<A extends unknown[], B extends unknown[], R = never> = A["length"] extends B["length"]
	? R | A["length"]
	: Calc<[unknown, ...A], B, R | A["length"]>;
type ArrayFromNumber<L, R extends unknown[] = []> = L extends R["length"]
	? R
	: ArrayFromNumber<L, [unknown, ...R]>;
```
