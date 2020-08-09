// // 1、在普通函数定义的前面加上async关键字，普通函数就变成了异步函数
// // 2、异步函数默认返回值是promise对象
// async function  fn() { 
//     // 异常信息需要通过关键字throw来抛出,如果throw执行了，那么return的就不执行了
//     throw '捕获异常';
//     // 这个return相当于promise中的resolve方法
//     return 123;
    
//  }
//  fn().then((data)=>{
//      console.log(data);
//  }).catch((error)=>{
//      console.log(error);
//  })
async function p1(){
    return 'p1';
}
async function p2(){
    return 'p2';
}
async function p3(){
    return 'p3';
}
// 用于执行上面的函数的异步函数
async function run(){
    // 加上关键字await，p1不执行不会执行后面的
    let r1=await p1();
    let r2=await p2();
    let r3=await p3();
    console.log(r1);
    console.log(r2);
    console.log(r3);
}
run();