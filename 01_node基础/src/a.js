// a.js
// 在模块内部定义变量
let number=3;
// 在模块内部定义方法
const add=(n1,n2)=>n1+n2;
// 向模块外部导出数据
exports.ad=add;
exports.num=number;

