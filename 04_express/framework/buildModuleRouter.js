// 引入express框架
const express=require('express');
// 创建网站服务器
const app=express();
// 导入home路由和admin路由
const home=require('../router/home');
const admin=require('../router/admin');
// 进行路径匹配
app.use('/home',home);
app.use('/admin',admin);
// 监听端口
app.listen(14007);
console.log('服务器启动成功')