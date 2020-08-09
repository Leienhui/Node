// 引入系统模块http,用于创建网站服务器
const http=require('http');
// 用于处理url地址的内置系统模块
const url=require('url');
// 创建服务器,返回值app就是网站服务器对象
const app=http.createServer();
// 为网站服务器对象添加事件请求参数1是事件名称；参数2是事件处理函数，里面有两个参数
// 当客户端有请求来的时候
app.on('request',(req,res)=>{
    // 响应报文
    res.writeHead(200,{
    //在响应中主动告诉浏览器使用UTF-8编码格式来接收数据
        'content-type':'text/html;charset=UTF-8'
    });    
    // 获取报文头部信息req.headers
    // console.log(req.headers);
    // 获取报文头部信息req.headers。获取accept里面的具体信息,[]只能有一个键
    // console.log(req.headers['accept']);


    // 查询参数的获取
    // 解析url地址url.parse(req.url);第二个参数表示将查询参数解析为对象形式
    // 拿到请求对象url.parse(req.url,true).query
//    let params=url.parse(req.url,true).query;
//    console.log(params.name);
//    console.log(params.age);

    // url既包含请求参数又包含请求地址
    // pathname:存的就是不包含请求参数的客户端的请求地址
    // 解构query与parhname这两个参数
    let {pathname,query}=url.parse(req.url,true);
    // query获取查询参数
    console.log(query.name);
    console.log(query.age);
    // 获取请求地址 req.url==pathname
    if(pathname=='/index'||pathname=='/'){
        res.end('<h1>hhhhhhhh<h1>');
    }else if(pathname=='/list'){
        res.end('列表页');
    }else{
        res.end('页面不存在');
    }
   
    // 获取请求方式req.method
    if(req.method=='POST'){
         // 响应
        res.end('post');
    }else if(req.method=='GET'){
         // 响应
        res.end('get');
    }
    res.end('<h1>哎呀呀呀</h1>');



//     console.log(url.parse(req.url,true).query);
//     if(req.url=='/index'||req.url=='/'){
//         res.end('<h1>hhhhhhhh<h1>');
//     }else if(req.url=='/list'){
//         res.end('列表页');
//     }else{
//         res.end('页面不存在');
//     }
});
// 监听端口向外界提供服务
app.listen(9000);
console.log('服务器启动成功');
