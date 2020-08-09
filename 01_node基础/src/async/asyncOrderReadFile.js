//回调函数的方法实现文件的依次读取==>回调地狱
// 引入读取文件模块
const fs=require('fs');
fs.readFile('./1.txt','utf8',(err,result1)=>{
    console.log(result1);
    fs.readFile('./2.txt','utf8',(err,result2)=>{
        console.log(result2);
        fs.readFile('./3.txt','utf8',(err,result3)=>{
            console.log(result3);
        })
    });
});