> `keyof`的一个常见用法，ts 内置的`Record`语法就是基于 `keyof` 实现

```ts
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
```

基于这种写法可以实现特定 key 对应特定 value 的泛型
