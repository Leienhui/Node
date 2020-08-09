// 1.引入系统模块
const http=require('http');
const url=require('url');
// 2.创建网站服务器
const app=http.createServer();
// 3.为网站服务器对象添加请求事件
app.on('request',(req,res)=>{
     // 响应报文
     res.writeHead(200,{
        //在响应中主动告诉浏览器使用UTF-8编码格式来接收数据
            'content-type':'text/html;charset=UTF-8'
        });   
// 4.实现路由功能
    //1.获取客户端的请求方式,并将其转换为小写
    const method=req.method.toLowerCase();
    //2.获取客户端的请求地址
    const pathname=url.parse(req.url).pathname;
    // 先判断是什么样的请求方式，在通过请求方式来判断请求地址
    if(method=='get'){
        if(pathname=='/'||pathname=='/index'){
            res.end('欢迎来到首页');
        }else if(pathname=='/list'){
            res.end('欢迎来到列表页');
        }else{
            res.end('页面不存在');
        }
    }else if(method=='post'){

    }
});
app.listen(8000);
console.log('服务器启动成功');

