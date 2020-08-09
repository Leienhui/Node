// 1.引入系统模块
const http=require('http');
const url=require('url');
const path=require('path');
const fs=require('fs');
// 引入第三方模块,解析文件类型
const mime=require('mime');
// 2.创建网站服务器
const app=http.createServer();
// 3.为网站服务器对象添加请求事件
app.on('request',(req,res)=>{
     
// 4.实现路由功能
    //1.获取客户端的请求方式,并将其转换为小写
    const method=req.method.toLowerCase();
    //2.获取客户端的请求地址(请求路径)
    let pathname=url.parse(req.url).pathname;
    pathname=pathname=='/'?'/default.html':pathname;
    console.log(pathname);
    //3.将用户的请求路径转换为实际的服务器硬盘路径
    const realPath=path.join(__dirname,'public'+pathname);
    // 根据路径返回资源的类型
    let type=mime.getType(realPath);
        // 读取文件
        fs.readFile(realPath,(error,result)=>{
            if(error!=null){
                // 响应报文
                res.writeHead(404,{
                //在响应中主动告诉浏览器使用UTF-8编码格式来接收数据
                'content-type':'text/html;charset=UTF-8'
            });  
                res.end('文件读取失败');
                return;
            }
            // 响应报文
             res.writeHead(200,{
             //在响应中主动告诉浏览器使用UTF-8编码格式来接收数据
                 'content-type':'type;charset=UTF-8'
             });   
             res.end(result);
            
        });
    
});
app.listen(11000);
console.log('服务器启动成功');
