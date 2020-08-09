// 引入express框架
const express=require('express');
const fs=require('fs');
// 调用express框架创建网站服务器
const app=express();
app.get('/',(req,res,next)=>{
    // 创建一个错误实例,并将其抛出
    // throw new Error('程序发生了未知错误');
    // 读取文件错误
    fs.readFile('./sheh.txt','utf8',(err,result)=>{
        if(err!=null){
            next(err);
        }
        else{
            res.send(result);

        }
    })

})
// 接收所有错误的请求
app.use((err,req,res,next)=>{
    // err就是上面路由里面的错误对象,message就是路由抛出的错误信息
   res.status(500).send(err.message)

});

//监听端口
app.listen(14004);
console.log('服务器启动成功')