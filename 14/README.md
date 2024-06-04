Naughty List Decipher
[early on the morning of Thursday December 14th, Santa stumbles into office greeted by Bernard, the head elf..]

[Bernard] YOU'RE A MESS. Were you out partying.. on a WEDNESDAY?? AGAIN??!!!

[Santa] It seems as such. Some investors were in town so we went over to the Mistletoe Lounge and things got a little out of hand.

[Bernard] I oughta report you to HR. Seriously. This is getting out of control.

[Santa] We're like a family here; no need for formal HR processes!

[Bernard] Where's the list for today's naughty kids? We're behind on coal lump production.

[Santa] Umm.

[Bernard] You're joking. Tell me you're joking. You lost the list again?

[Santa] Well, not lost per se.

[Bernard] Then where is it?

[Santa] I have it.. but I only scribbled down the names real quick with slashes in between them.

Covering for Santa, again.
Looks like we're gonna need to pick up the slack for Santa yet again. He's got a list like "melkey/prime/theo/trash" and we need to turn it into a union of strings "melkey" | "prime" | "theo" | "trash".

Let's get this done before the rest of the elves find out.

prompt by Dimitri Mitropoulos of MiTS

> 就是字符串的`spilt`函数,根据制定的字符,将一大段字符串分割出多个子字符串

## Question

```ts
import { Expect, Equal } from "type-testing";

type TwelveDaysOfChristmas = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type test_0_actual = DayCounter<1, 12>;
//   ^?
type test_0_expected = TwelveDaysOfChristmas;
type test_0 = Expect<Equal<test_0_expected, test_0_actual>>;

type DaysUntilChristmas =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25;
type test_1_actual = DayCounter<1, 25>;
//   ^?
type test_1_expected = DaysUntilChristmas;
type test_1 = Expect<Equal<test_1_expected, test_1_actual>>;
```

## Solution

> 条件类型+`infer`+模板字符串+递归，在问题 10 11 的基础上增加了递归的使用

```ts
type DecipherNaughtyList<S, R = never> = S extends `${infer F}/${infer Rest}`
  ? DecipherNaughtyList<Rest, R | F>
  : R | S;
```
