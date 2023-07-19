namespace A6 {
  // 1. 联合类型
  // 这些类型中的任何一种的值。
  // 注意作为函数参数---缩小类型
  type A = string[] | number;
  function a(input: A) {}

  // 2. 字面类型：变量只能有一个值并没有多大用处！
  //（1）用处: 通过将字面组合成联合，只接受一组已知值的函数：
  function printText(s: string, alignment: "left" | "right" | "center") {
    // ...
  }

  // 类型 boolean 本身实际上只是联合 true | false 的别名。

  // （2）字面推理
  declare const someCondition: boolean;
  // const 对象时：TypeScript 假定该对象的属性可能会在以后更改值
  declare function handleRequest(url: string, method: "GET" | "POST"): void;

  const req = { url: "https://example.com", method: "GET" }; // { url: string; method: string; }
  //   handleRequest(req.url, req.method); // 报错--req.method 被推断为 string，而不是 "GET"
  // 解决：
  // Change 1:
  const req1 = { url: "https://example.com", method: "GET" as "GET" };
  // Change 2
  handleRequest(req.url, req.method as "GET");
  // Change 4
  const req2 = { url: "https://example.com", method: "GET" as "GET" } as const;
}
