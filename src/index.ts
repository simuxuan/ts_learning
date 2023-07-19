// 类型断言

let somevalue : any = "this is a string"

// let len: number = somevalue.length // 不会报错
// 断言1  注意：然而，当你在TypeScript里使用JSX时，只有as语法断言是被允许的。
// let len : number = (somevalue as string).length 
// 断言2 
let len : number = (<string>somevalue).length 

console.log(len);
