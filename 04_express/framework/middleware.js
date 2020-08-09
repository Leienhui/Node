// 引入express框架
const express=require('express');
// 调用express框架创建网站服务器
const app=express();
app.get('/', (req,res,next)=>{
    /*
    next:
    权限控制函数
    */
    req.name="张三";
    // 调用next()方法，这个请求文件还得向下请求中间件
    next();
});
app.get('/',(req,res)=>{
res.send(req.name);
})
//监听端口
app.listen(14001);
console.log('服务器启动成功')