namespace A1 {
  /**
   * @description 数组
   */
  let arr1: number[] = [1, 2, 3];
  let arr2: Array<number> = [1, 2, 3];

  // 元组
  let x: [string, number];
  x = ["hello", 10];
  // x[3] = 'world'  // 报错  string传给undefined类型，和官方文档不符

  /**
   * @description 枚举
   */
  // 1
  // enum Color {
  //   Red,
  //   Green,
  //   Blue,
  // }
  // let c: Color = Color.Red;
  // console.log(c); // 0

  // 2
  // enum Color {
  //   Red = 1,
  //   Green,
  //   Blue,
  // }
  // let c : Color = Color.Green
  // console.log(c); // 2

  // 3
  // enum Color {
  //   Red = 1,
  //   Green =2,
  //   Blue = 4,
  // }
  // let c : Color = Color.Blue
  // console.log(c); // 4

  // 4 由枚举的值得到它的名字
  enum Color {
    Red = 1,
    Green,
    Blue,
  }
  let colorName: string = Color[2];

  // console.log(colorName); // Green

  // any和Object
  let a: any = 4;
  a = "string";
  a = a.substring(1);
  console.log(a);

  let b: Object = 4;
  b = "string";
  // b = b.substring(1)  // 报错：Object Object类型的变量只是允许你给它赋任意值 - 但是却不能够在它上面调用任意的方法，即便它真的有这些方法

  // null 和undefined
  /*
默认情况下null和undefined是所有类型的子类型。 
就是说你可以把null和undefined赋值给number类型的变量。
然而，当你指定了--strictNullChecks标记，
null和undefined只能赋值给void和它们各自。 
这能避免很多常见的问题。 也许在某处你想传入一个string或null或undefined，你可以使用联合类型string | null | undefined。 再次说明，稍后我们会介绍联合类型。
 */

  // never
  /*
never类型是任何类型的子类型，也可以赋值给任何类型；
然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）
即使any也不可以赋值给never。
*/
  // 返回never的函数必须存在无法达到的终点
  function error(message: string): never {
    throw new Error(message);
  }

  // 推断的返回值类型为never
  function fail() {
    return error("Something failed");
  }

  // 返回never的函数必须存在无法达到的终点
  function infiniteLoop(): never {
    while (true) {}
  }
}
