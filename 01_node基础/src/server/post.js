// 引入系统模块http,用于创建网站服务器
const http=require('http');
// 用于处理url地址的内置系统模块
const url=require('url');
// 处理请求参数模块
const querystring=require('querystring');

// 创建服务器,返回值app就是网站服务器对象
const app=http.createServer();
// 为网站服务器对象添加事件请求参数1是事件名称；参数2是事件处理函数，里面有两个参数
// 当客户端有请求来的时候 
// request这个是请求事件的名称，固定的
app.on('request',(req,res)=>{
    // 响应报文
    res.writeHead(200,{
    //在响应中主动告诉浏览器使用UTF-8编码格式来接收数据
        'content-type':'text/html;charset=UTF-8'
    });  
    // 接收post参数，通过事件的方式接收,不是一次性传输完成的
    // 1.data事件——>有请求参数传递的时候
    // 2.end事件——>当请求参数传输完成
    // 用于接收每1次传输完成的内容
    let postParas='';
    req.on('data',(params)=>{
        postParas+=params;
    });
    req.on('end',()=>{
        // 将字符串转换为对象
       let stringtoObj=querystring.parse(postParas);
       console.log(stringtoObj); 
    });
    // 请求端给的每一次请求，服务端都应该给响应，否则就处于等待状态
    res.end('ok');


});
// 监听端口向外界提供服务
app.listen(10000);
console.log('服务器启动成功');
