// 引入express框架
const express=require('express');
// 创建网站服务器
const app=express();
// 创建一级路由路由对象
const home=express.Router();
// 为home路由对象匹配一个请求路径,具体的请求，在二级路由中去处理
app.use('/request',home);
// 创建二级路由
home.get('/index',(req,res)=>{
    //  需要访问localhost:14006/request/index
    res.send('welcome first page');

})
// 监听端口
app.listen(14006);