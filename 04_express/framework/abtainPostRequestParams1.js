const express=require('express');
// 引入post请求的第三方模块
const bodyParser=require('body-parser');
const app=express();
// app.use(bodyParser.urlencoded({extended: false}));
// 拦截所有请求
app.use( fn({a:2}));
function fn(obj){
    return function(req,res,next){
        if(obj.a==1){
            console.log(req.url);
        }else{
            console.log(req.method)
        }
        next();

    }
}
// app.post('/add',(req,res)=>{
//     // 获取post请求参数,并将其响应个页面
//     console.log(req.body)
//     res.send(req.body);
// })
app.get('/',(req,res)=>{

    res.send('ok');
})
app.listen(14010);
console.log('ok')