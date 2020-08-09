    // 有多少个异步API，就需要多少个函数和promise对象，
   // 引入系统模块
const fs=require('fs');
function f1(){
    return new Promise((resolve,reject)=>{
        fs.readFile('./1.txt','utf8',(error,result1)=>{
            resolve(result1);
        });
    });
}
function f2(){
    return new Promise((resolve,reject)=>{
        fs.readFile('./2.txt','utf8',(error,result2)=>{
            resolve(result2);
        });
    });
}
function f3(){
    return new Promise((resolve,reject)=>{
        fs.readFile('./3.txt','utf8',(error,result3)=>{
            resolve(result3);
        });
    });
}
// 上一个then   return的promise对象在下一个then中调用
f1().then((text1)=>{
    console.log(text1);
    return f2();
})
.then((text2)=>{
    console.log(text2);
    return f3();
})
.then((text3)=>{
    console.log(text3);
})