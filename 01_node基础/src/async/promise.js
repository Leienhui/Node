// 引入系统模块
const fs=require('fs');
//实例化promise,resolve和reject实际上是一个函数
let promise=new Promise((resolve,reject)=>{
    fs.readFile('./1.txt','utf8',(error,result)=>{
        // 这里面放置异步API
        setTimeout(()=>{
            if(error!=null){
                // 读取失败，传递读取失败信息
                reject(error)
            }else{
                resolve(result);
            }
        },2000)

    })
    
});
// 获取promise里面的东西
// 获取成功时候的结果,then相当于调用resolve
promise.then(result=>console.log(result))
       .catch(error=>console.log(error));