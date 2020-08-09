// b.js
// 在b.js模块中导入模块a
let a=require('./a.js');
// 输出a模块中的number变量
console.log(a.num);
// 调用a模块中的add方法输出其返回值
console.log(a.ad(10,30));