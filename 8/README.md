Filtering The Children (part 3)
Yet again, Santa has made a request to change the children filtering code. This time he just sent an email to the entire engineering team (which is absolutely not the process, but since Santa is sometimes a bit difficult to communicate with, no one has yet had the courage to tell him). Here's the contents of the email.
```md
POST /sendmail HTTP/1.1
Host: mail.hohoholdings.com
Content-Type: text/plain; charset=utf-8
Content-Length: 420

From: kris.kringle@hohoholdings.com
To: engineering@hohoholdings.com
Subject: Code Changes Needed

Hello beloved team!

Looks like we need some changes to the code again!

1. there are sometimes naughty kids in the same list
1. turns out I don't actually need to see the nice children in the list, after all
1. my golf game ran late this morning.. so since the other two changes were quick to implement, I'm sure this will be just as fast, right?!

- Kris Kringle
  "at Santa's workshop, we value loyalty over all else"
```
Wow. What a pointless email. For once, calling a meeting would have been better.

Good thing we got some experience reading the tests because this email may as well have said "do work. thanks." (lol).

Off to the tests to see how this is actually supposed to work!

prompt by Dimitri Mitropoulos of MiTS

> 接收一个 `Object`类型,并且根据某种规则过滤掉不需要的属性。在这里的规则是符合某种模板字符串的属性需要被过滤掉

## Question

```ts

import { Expect, Equal } from 'type-testing';

type SantasList = {
  naughty_tom: { address: '1 candy cane lane' };
  good_timmy: { address: '43 chocolate dr' };
  naughty_trash: { address: '637 starlight way' };
  naughty_candace: { address: '12 aurora' };
};
type test_wellBehaved_actual = RemoveNaughtyChildren<SantasList>;
//   ^?
type test_wellBehaved_expected = {
  good_timmy: { address: '43 chocolate dr' };
};
type test_wellBehaved = Expect<Equal<test_wellBehaved_expected, test_wellBehaved_actual>>;

type Unrelated = {
  dont: 'cheat';
  naughty_play: 'fair';
};
type test_Unrelated_actual = RemoveNaughtyChildren<Unrelated>;
//   ^?
type test_Unrelated_expected = {
  dont: 'cheat';
};
type test_Unrelated = Expect<Equal<test_Unrelated_expected, test_Unrelated_actual>>;

```

## Solution

> 在问题7的基础上再加入条件类型、`never`以及占位符`infer`的变化
> 还记得问题6里提过`空类型，常用在消除某个类型或者某个属性的场景`,在类型计算中,属性名计算结果为`never`的时候就会过滤掉此属性
>`infer` 可以理解为在条件类型的计算过程中, 从传入的类型中提取出部分类型
>这里提取出来的部分类型没有再继续使用,所以写作`infer _`，后面会有将提取出来的部分类型继续使用的场景
```ts
type FirstName<T> = T extends `${infer First}-${infer _}`? First : never;
/** type PersonFirstName = "Timmy" */
type PersonFirstName = FirstName<'Timmy-Green'>;
```
```ts
type RemoveNaughtyChildren<T> = {
  [k in keyof T as k extends `naughty_${infer _}` ? never : k]: T[k]
};

```
