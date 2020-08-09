const fs=require('fs');
// fs.readFile()是通过返回值的形式获得结果
//node.js提供promisify(),对现有API进行包装，让这个方法返回promise对象以支持异步函数语法
// 获取promisify()方法的过程
// 1.引入util模块
const util=require('util');
// 2.拿到promisify方法
const promisify=util.promisify;
// 3.使用promisify方法,拿到读取文件这个方法==>readFile是promise对象了
const readFile=promisify(fs.readFile);
// 4.使用读取文件的方法
async function run(){
    // 第三个参数不用写了
    let text1=await readFile('./1.txt','utf8');
    let text2=await readFile('./2.txt','utf8');
    let text3=await readFile('./3.txt','utf8');
    console.log(text1);
    console.log(text2);
    console.log(text3);
}
run();

