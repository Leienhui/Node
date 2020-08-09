// 引入express框架
const express=require('express');
const fs=require('fs');
// 改造API支持异步函数的形式
const promisify=require('util').promisify;
// 重新包装读取文件的方法
const readFile=promisify(fs.readFile)
// 调用express框架创建网站服务器
const app=express();
app.get('/',async (req,res,next)=>{
    // 读取文件错误
    try{
        /* 将可能出错的代码块放在里面执行
        如果try里面的代码块出现错误，那么程序会跳转到catch里面去执行，
        如果try里面没错误，那么程序跳转到catch后面去执行
        */
       await readFile('./sheh.txt','utf8');
    }catch(ex){
        next(ex);
    }
 });
// 接收所有错误的请求
app.use((err,req,res,next)=>{
    // err就是上面路由里面的错误对象,message就是路由抛出的错误信息
   res.status(500).send(err.message)

});
//监听端口
app.listen(14005);
console.log('服务器启动成功')