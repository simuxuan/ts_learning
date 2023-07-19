namespace A2 {
  // 类型断言

  let somevalue: any = "this is a string";

  // 类型
  // let len: number = somevalue.length // 不会报错
  // 断言1  注意：然而，当你在TypeScript里使用JSX时，只有as语法断言是被允许的。
  // let len : number = (somevalue as string).length
  // 断言2
  let len: number = (<string>somevalue).length;

  console.log(len);

  // 更加具体| 更加不具体
  // const x = "hello" as number; // 报错，不更加具体
  const x = "hello" as any as number;

  // 非空断言运算符
  /*
  可以在不进行任何显式检查的情况下从类型中删除 null 和 undefined。 
  在任何表达式之后写 ! 实际上是一个类型断言，该值不是 null 或 undefined：
  */
 
}
