const express=require('express');
// 引入post请求的第三方模块
const bodyParser=require('body-parser');
const app=express();

// id,name是一个占位符,表示要接受一个id,name作为参数
app.get('/index/:id/:name',(req,res)=>{
    //输出参数id值
    res.send(req.params); 
    //输出:  {"id":"123","name":"zhangsan"}      
})
app.listen(14010);
console.log('ok')