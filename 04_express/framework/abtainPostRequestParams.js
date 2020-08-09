const express=require('express');
// 引入post请求的第三方模块
const bodyParser=require('body-parser');
const app=express();
/*
使用baby-parser去处理请求参数
    1.拦截所有的请求
    2.对请求参数进行处理
    extended的值设置为false意思为：在方法内部使用queryString模块来处理请求参数的格式
    extended的值设置为true意思为:在方法内部使用qs模块来处理请求参数的格式
*/
app.use(bodyParser.urlencoded({extended: false}));
app.post('/add',(req,res)=>{
    // 获取post请求参数,并将其响应个页面
    console.log(req.body)
    res.send(req.body);
})
app.listen(14009);
console.log('ok')