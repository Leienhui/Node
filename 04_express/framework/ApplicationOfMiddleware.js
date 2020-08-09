// 引入express框架
const express=require('express');
// 调用express框架创建网站服务器
const app=express();
// app.use((req,res,next)=>{
//     // 网络公告
//     res.send('网站正在维护中...')
// })
// 设置中间件
app.use('/admin',(req,res,next)=>{
    // let isAdmin=false;
    let isAdmin=true;


    if(isAdmin){
        next()
    }else{
        res.send('not admin')
    }
});
// 设置路由
app.get('/admin',(req,res)=>{
    res.send('admin');
});
app.use((req,res,next)=>{
    //设置找不到页面的状态码==>为客户端响应404状态码
    // res.status(404);
    // res.send('页面不存在');
    res.status(404).send('页面不存在')
})
//监听端口
app.listen(14003);
console.log('服务器启动成功')