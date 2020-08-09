// 引入express框架
const express=require('express');
// 调用express框架创建网站服务器
const app=express();
/*
1.接收get请求
    参数1.localhost:14000的访问地址就是/
    参数2.请求处理函数
*/
app.get('/', (req,res)=>{
     /* 通过send方法对客户端进行响应,
     send()的好处：
     1.可以自动去检测客户端响应的类型
     2.并将响应类型自动设置到响应头中，
     3.还可以自动设置响应内容的响应编码，以防止出现乱码的情况
     4.可以自动设置http状态码
     */

    res.send('hello express')
});
app.get('/list',(req,res)=>{
//  send(里面可以直接放对象)
res.send({
    name:'张三',
    age:17
})
})
//监听端口
app.listen(14000);
console.log('服务器启动成功')
