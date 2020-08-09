// 引入express框架
const express=require('express');
// 调用express框架创建网站服务器
const app=express();
// 接收所有的请求
app.use((req,res,next)=>{

    // 调用next()方法，这个请求文件还得向下请求中间件
    next();
    console.log('请求走了接收所有的中间件')

});
// 请求路径是request的时候走的中间件
app.use('/request',(req,res,next)=>{

    console.log('请求走了接收路径为request的中间件')
    // 调用next()方法，这个请求文件还得向下请求中间件
    next();

})
app.get('/', (req,res,next)=>{
    /*
    next:
    权限控制函数
    */
   res.end('ok')
});

//监听端口
app.listen(14002);
console.log('服务器启动成功')