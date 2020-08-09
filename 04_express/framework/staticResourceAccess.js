const express=require('express');
// 引入post请求的第三方模块
const bodyParser=require('body-parser');
const path=require('path');
// 拼接路径,访问的时候,public下面有什么,都可以访问
const absolutePath=path.join(__dirname,'public')
const app=express();
// 静态资源访问,路径推荐写绝对路径-->引入path模块
app.use(express.static(absolutePath));
app.listen(14010);
console.log('ok')