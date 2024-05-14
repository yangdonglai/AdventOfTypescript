> 最基本的泛型的用法

最基本的泛型的用法,用来生成数据结构相同，但是对类型做更精准控制的场景，参考下面代码

```ts
interface Response {
  data: string | number | boolean;
}

type Result<T> = {
  data: T;
};
type ResultString = Result<string>;
type ResultNumber = Result<number>;
type ResultBoolean = Result<boolean>;
```

常见的使用场景通过输入参数来自动推导函数的返回结果

```ts
type Result<T> = {
  data: T;
};
function wrapResult<T extends string | number | boolean>(data: T): Result<T> {
  return { data };
}
let a = "hello";

/**
 * const retA: Result<string>
 */
const retA = wrapResult(a);

```
