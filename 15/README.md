Box The Toys!
[Santa walks by as Bernard, the head elf, is yelling at the other elves..]

[Bernard (to his staff)] LET'S GO ELVES! LET'S GO! KEEP BOXING TOYS!

[Santa] Bernard.. Seems like it's not going well.

[Bernard] Was anyone asking you!?

[Santa] Did you deploy the new toy boxing API yesterday?

[Bernard] No, we didn't get to it. Julius called out sick.

[Santa] Taking too many sick days shows a lack of commitment. We should get rid of Julius.

[Bernard (rolling eyes)] And then not replace him? Yeah. No Thanks.

[Santa] Well it was on the sprint and today's the last day of the sprint.

[Bernard] We don't deploy on Fridays.

[Santa] Aren't we doing continuous deployment now? You had this whole big thing at the last shareholder meeting about it?

[Bernard] No. For the 100th time. We're doing continuous delivery, which is completely different and gives us control over when we deploy.

[Santa] Well I need that BoxToys type. If you can't handle this project, Bernard, there are plenty of other elves who can. I need your full commitment.

[Bernard] Ok. Fine. I'll do it myself.

[Santa] That's what I like to see!

The BoxToys API
The BoxToys type takes two arguments:

the name of a toy
the number of of boxes we need for this toy
And the type will return a tuple containing that toy that number of times.

But there's one little thing.. We need to support the number of boxes being a union. That means our resulting tuple can also be a union. Check out test_nutcracker in the tests to see how that works.

prompt by Dimitri Mitropoulos of MiTS

> 根据一个类型和一个数字常量(或数字常量的`UnionType`)生成,一个元组(或元组的`UnionType`)

## Question

```ts

import { Expect, Equal } from 'type-testing';

type test_doll_actual = BoxToys<'doll', 1>;
//   ^?
type test_doll_expected = ['doll'];
type test_doll = Expect<Equal<test_doll_expected, test_doll_actual>>;

type test_nutcracker_actual = BoxToys<'nutcracker', 3 | 4>;
//   ^?
type test_nutcracker_expected =
	| ['nutcracker', 'nutcracker', 'nutcracker']
	| ['nutcracker', 'nutcracker', 'nutcracker', 'nutcracker'];
type test_nutcracker = Expect<Equal<test_nutcracker_expected, test_nutcracker_actual>>;


```

## Solution

> 根据一个类型和一个数字常量一个元组比较简单,参考问题13的`ArrayFromNumber`略微修改即可
> 一个技巧点在于怎么在接受一个`UnionType`的时候,再返回一个`UnionType`，就像并行计算那样,对`UnionType`的每个元素都要做同样的处理之后再合并成一个`UnionType`

1. `UnionType extends XXX ? A:B` 直接将`UnionType`用`extends`处理，在后续的逻辑中可以对每个单独的元素去做处理

```ts
type BoxToys<Name, Count> = ArrayFillWithNumber<Name, Count>;
type ArrayFillWithNumber<Item, Count, R extends any[] = []> = Count extends R["length"]
	? R
	: ArrayFillWithNumber<Item, Count, [Item, ...R]>;
```
