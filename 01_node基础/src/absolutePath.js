// 引入系统模块path,fs
const path=require('path');
const fs=require('fs');
fs.readFile(path.join(__dirname,'01.txt'),'utf8',(err,doc)=>{
    console.log(err);
    console.log(doc);
})