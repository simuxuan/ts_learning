namespace A3 {
  // 对象
  // 1. 基本使用
  // (1) interface
  interface Ikun {
    name: string;
    age?: number;
  }

  const person: Ikun = {
    name: "smx",
    age: 19,
  };

  // (2) 匿名
  const person1: { name: string; age?: number } = {
    name: "ganyu",
  };

  // (3) type
  type Ikun1 = {
    name: string;
    age?: number;
  };

  const ikun: Ikun1 = {
    name: "smx",
    age: 19,
  };

  // 2. 特点
  //(1) 重名interface  可以合并
  interface A {
    name: string;
  }
  interface A {
    age: number;
  }
  var x: A = { name: "xx", age: 20 };

  //(2) 类型扩展
  // （2-1）继承
  // 1. 减少代码，重复编写
  // 2. 使用第三方库，定义了一些属性，继承上扩展
  interface B {
    name: string;
  }

  interface C extends B {
    age: number;
  }

  let obj: C = {
    age: 18,
    name: "xxx",
  };

  // （2-2）交集类型--组合现有的对象类型
  // 和上面继承的方式的主要区别在于如何处理冲突
  interface Colorful {
    color: string;
  }

  interface Circle {
    radius: number;
  }

  type ColorfulCircle = Colorful & Circle;
  let objA: ColorfulCircle = { color: "blue", radius: 42 };

  //(3) 可选属性的含义是该属性可以不存在
  //所以说这样写也是没问题的
  interface Person {
    b?: string;
    a: string;
  }

  const person2: Person = {
    a: "213",
  };

  // 可选属性可能为undefined | xxx 的联合类型
  interface Shape {}
  declare function getShape(): Shape;

  interface PaintOptions {
    shape: Shape;
    xPos?: number;
    yPos?: number;
  }

  // （3-1）
  // function paintShape(opts: PaintOptions) {
  //   // 非strictNullChecks模式下，xPos的类型：number
  //   // strictNullChecks模式下，xPos的类型：number | undefined
  //   let xPos = opts.xPos;
  //   let yPos = opts.yPos;
  //   // ...
  // }

  // （3-2）undefind类型处理
  // function paintShape(opts: PaintOptions) {
  //   // 会被类型推断为number
  //   let xPos = opts.xPos === undefined ? 0 : opts.xPos;
  //   let yPos = opts.yPos === undefined ? 0 : opts.yPos;
  //   // ...
  // }

  // （3-3）设置默认值防止undefined影响
  // 目前没有办法在解构模式中放置类型注释
  function paintShape({ shape, xPos = 0, yPos = 0 }: PaintOptions) {
    console.log("x coordinate at", xPos);
    console.log("y coordinate at", yPos);
    // ...
  }

  //(4) 任意属性
  interface D {
    a: string;
    b?: number;
    [propName: string]: any;
  }

  //(5) 只读属性
  // （5-1） 基本使用
  interface E {
    readonly a: string;
  }

  // （5-2）只读的范围
  /**
   * @description 使用 readonly 修饰符并不一定意味着一个值是完全不可变的——或者换句话说，它的内部内容不能改变。
   * 这只是意味着属性本身不能被重写。
   * 即内部第一层属性值不可以被修改，当时里层属性可以
   */
  interface Home {
    readonly resident: { name: string; age: number };
  }

  function visitForBirthday(home: Home) {
    // We can read and update properties from 'home.resident'.
    console.log(`Happy birthday ${home.resident.name}!`);
    home.resident.age++;
  }

  function evict(home: Home) {
    // But we can't write to the 'resident' property itself on a 'Home'.
    //   home.resident = {
    //     name: "Victor the Evictor",
    //     age: 42,
    //   };
  }

  // （5-3）TypeScript 在检查两种类型是否兼容时不会考虑这两种类型的属性是否为 readonly，因此 readonly 属性也可以通过别名来更改。
  interface PersonA {
    name: string;
    age: number;
  }

  interface ReadonlyPerson {
    readonly name: string;
    readonly age: number;
  }

  let writablePerson: PersonA = {
    name: "Person McPersonface",
    age: 42,
  };

  let readonlyPerson: ReadonlyPerson = writablePerson;

  console.log(readonlyPerson.age); // prints '42'
  writablePerson.age++;
  console.log(readonlyPerson.age); // prints '43'

  //（6）定义函数--type | interface
  interface F {
    a: string;
    b: (name: string) => void;
    c(name: string): void;
  }

  let obj1: F = {
    a: "123",
    b: () => {},
    c: () => {},
  };

  // 3. 索引签名
  // 3-1基本使用
  interface ITypeA {
    [index: number]: string;
  }
  const nameA: ITypeA = ["123"];

  interface ITypeB {
    [index: string]: string;
  }
  // const na0meB: ITypeB = ["123"]; // 报错：["123"]有属性forEach等，其属性值为函数

  interface ITypeC {
    [index: string]: any;
  }
  const nameC: ITypeC = ["123"];

  console.log(11);

  // 3-2 索引签名是属性类型的联合，则可以接受不同类型的属性：
  interface NumberOrStringDictionary {
    [index: string]: number | string;
    length: number; // ok, length is a number
    name: string; // ok, name is a string
  }
  // 3-3 可以制作索引签名 readonly 以防止分配给它们的索引：
  // 您不能设置 myArray[2]，因为索引签名是 readonly。
  declare function getReadOnlyStringArray(): ReadonlyStringArray;
  interface ReadonlyStringArray {
    readonly [index: number]: string;
  }

  let myArray: ReadonlyStringArray = getReadOnlyStringArray();
  // myArray[2] = "Mallory";  // 报错

  // 4. 泛型对象
  // 函数入参有number等类型，想不进行类型缩小分别处理，直接对其处理
  // （1）函数重载实现
  interface NumberBox {
    contents: number;
  }

  interface StringBox {
    contents: string;
  }

  interface BooleanBox {
    contents: boolean;
  }
  function setContents(box: StringBox, newContents: string): void;
  function setContents(box: NumberBox, newContents: number): void;
  function setContents(box: BooleanBox, newContents: boolean): void;
  function setContents(box: { contents: any }, newContents: any) {
    box.contents = newContents;
  }

  // （2）对象泛型
  // （2-1）接口
  interface Box<T> {
    contents: T;
  }
  let box: Box<string> = { contents: "123" };

  // （2-2）type
  type BoxA<T> = {
    contents: T;
  };

  let box1: BoxA<string> = { contents: "123" };
  // (3) Array
  //   (3-1) Array<T>
  interface Array<T> {
    length: number;
    pop(): T | undefined;
    push(...items: T[]): number;
  }
  // (3-2)  ReadonlyArray--描述不应更改的数组
  // 当我们看到一个返回ReadonlyArray的函数--》返回的数组不可以改变
  // 当我们看到一个入参为 ReadonlyArray 的函数--》传递任何数组给这个函数，函数不会改变其内容
  //  与 Array 不同，我们没有可以使用的 ReadonlyArray 构造函数。
  //   new ReadonlyArray("red", "green", "blue");  // 报错
  let arr1: number[] = [1, 2];
  let arr2: Array<number> = [1, 2];

  let arr3: readonly number[] = [1, 2];
  let arr4: ReadonlyArray<number> = [1, 2];
  // array可以赋给readonlyarray，反过来则不行
  let x1: readonly string[] = [];
  let y1: string[] = [];

  x1 = y1;
  //   y1 = x1;  // 报错

  // (4) 元组
  type A4 = [string, number];
  let a4: A4 = ["123", 123];
  //   a4[2] // 越界报错
  // （4-2）等效于如下写法
  interface A5 {
    // specialized properties
    length: 2;
    0: string;
    1: number;

    // Other 'Array<string | number>' members...
    slice(start?: number, end?: number): Array<string | number>;
  }
  let a5: A5 = ["123", 123];

  // （4-3） 元组的可选参数-可选的元组元素只能放在最后，也会影响 length 的类型。
  type Either2dOr3d = [number, number, number?];

  function setCoordinate(coord: Either2dOr3d) {
    const [x, y, z] = coord;

    console.log(`Provided coordinates had ${coord.length} dimensions`);
  }
  // （4-4）元组的剩余元素--它们必须是数组/元组类型。
  type StringNumberBooleans = [string, number, ...boolean[]];
  type StringBooleansNumber = [string, ...boolean[], number];
  type BooleansStringNumber = [...boolean[], string, number];
  //   用处---函数参数指定
  function InputA(...args: [string, number, ...boolean[]]) {} // 等效于下面
  function InputB(name: string, version: number, ...input: boolean[]) {}

  // （4-5）readonly 元组类型
  //   元组往往被创建并保持不变，因此尽可能将类型注释为 readonly 元组是一个很好的默认设置
  function doSomething(pair: readonly [string, number]) {
    // pair[0] = "hello!"; // 报错
  }
  // const 断言 === readonly xxx
  let point = [3, 4] as const; // readonly [3, 4] 断言效果

  function distanceFromOrigin([x, y]: [number, number]) {
    return Math.sqrt(x ** 2 + y ** 2);
  }
  //   distanceFromOrigin(point);  // 报错：因为不能赋给[number,number],不知道会不会改
}
