// 1.搭建网络服务器，实现客户端与服务器端的通信
const user=require('./createCollection.js');

        // 导入系统模块
        const http=require('http');
        const url=require('url');
        // 将字符串转换为对象模块
        const queryString=require('querystring');
        // 创建服务器
        const app=http.createServer();
        // 为服务器对象添加请求事件
        app.on('request',async (req,res)=>{
// 3.当用户访问/list的时候，将用户信息查询出来
        // 实现路由功能=>获取请求方式和请求地址
            // 获取请求方式
            const reqmethod=req.method;
            // 获取请求地址
            const {pathname,query}=url.parse(req.url,true);
            if(reqmethod=='GET'){
                // get方法一般都是数据的请求或者页面的呈递
                if(pathname=='/list'){
                    // 查询用户信息
                    let users=await user.find();
                    // 数据拼接
                    // console.log(users);
                    // html字符串
                    let list=`
                    <!DOCTYPE html>
                        <html lang="en">
                        <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Document</title>
                        <style>
                            *{
                                margin: 0;
                                padding: 0;
                            }
                            table{
                                text-align: center;
                                width: 1000px;
                                
                            }
                            td,th{
                                border: 1px solid royalblue;
                                width: 25%;
                            }
                            tr{
                                border-bottom: none;
                            }
                        </style>
                        </head>
                        <body>
                            <a href="/add">添加</a>
                            
                            <table>
                                <tr>
                                    <th>name</th>
                                    <th>age</th>
                                    <th>hobbies</th>
                                    <th>操作</th>
                                </tr>
                            
                            
                    `;
                    // 循环数据拼接字符串以及数据
                    // 对数组循环操作,item表示数组里面的每一个对象
                    users.forEach(item=>{
                        list+=`
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.age}</td>
                            <td>
                            `;
                            item.hobbies.forEach(item1=>{
                             list+=`
                                <span>${item1}</span>
                             `
                                
                            });
                        list+=`
                            </td>
                            <td>
                             <a href="/remove?id=${item._id}">删除</a>
                             <a href="/modify?id=${item._id}">修改</a>
                            </td>
                        </tr>
                    `
                    });
                    
                    
                    list+=`
                            </table>
                        </body>
                     </html>
                    `
                    // 将list响应到页面==>呈现页面
                    res.end(list);
                }
                else if(pathname=='/add'){
                    // 显示
                   let addUser=`
                            <!DOCTYPE html>
                            <html lang="en">
                            <head>
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <title>Document</title>
                            </head>
                            <body>
                                <h3>添加用户</h3>
                                <form method="POST" action="/add">
                                    <div>
                                        <label for="">name：</label>
                                        <input type="text" name="name">
                                    </div>
                                    <div>
                                        <label for="">age：</label>
                                        <input type="text" name="age">
                                    </div>
                                    <div>
                                        <label for="">password：</label>
                                        <input type="password"  name="password">
                                    </div>
                                    <div>
                                        <label for="">hobbies：</label>
                                        <input type="checkbox" name="hobbies" value="吃饭">吃饭
                                        <input type="checkbox" name="hobbies" value="睡觉">睡觉
                                        <input type="checkbox" name="hobbies" value="打豆豆">打豆豆
                                        <input type="checkbox" name="hobbies" value="唱歌">唱歌
                                        <input type="checkbox" name="hobbies" value="跳舞">跳舞
                                    </div>
                                    <div>
                                        <input type="submit" value="提交">
                                    </div>
                                </form>
                            </body>
                            </html>
                   `;
                res.end(addUser);
    
                }else if(pathname=='/modify'){

                    // 1. 获取前台传递过来的请求参数  - get -(id)
                    // console.log(query.id);

                    // 查找用户信息,根据_id字段查用户信息
                    let showUserInfo=await user.findOne({_id:query.id},user);
                    let modifyInfo=`
                        <!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Document</title>
                        </head>
                        <body>
                            <h3>修改用户</h3>
                            <!-- 直接获取id -->
                            <form method="POST" action="/modify?id=${showUserInfo._id}"`
                            modifyInfo+=`
                             >
                                <input type='hidden' name='id' value='${showUserInfo._id}'
                                <div>
                                    <label for="">name：</label>
                                    <input type="text" name="name" value="${showUserInfo.name}">
                                </div>
                                <div>
                                    <label for="">age：</label>
                                    <input type="text" name="age" value="${showUserInfo.age}">
                                </div>
                                <div>
                                    <label for="">password：</label>
                                    <input type="password"  name="password" value="${showUserInfo.password}">
                                </div>
                                <div>
                                    <label for="">hobbies：</label>
                                    
                                    `
                                    // 根据下面这个数组来生成复选框， 
                                    // 对于每一个复选框来说， 如果这个复选框的值在我的showUserInfo.hobbies里面他的checked属性九尾true 
                                        // checked='checked'
                                    // 如果当前生成的这个复选框的值不在我的showUserInfo.hobbies里面的话，就不带checked属性
                                    var hobbiesArr = ['吃饭', '睡觉','打豆豆','唱歌','跳舞','篮球','足球','橄榄球','敲代码']
                                    hobbiesArr.forEach(item2=>{

                                        var chekckStr = '';
                                        /*
                                        var flag = false;
                                        for(var i = 0; i < showUserInfo.hobbies.length; i++){
                                            if(showUserInfo.hobbies[i] == item2){
                                                chekckStr = `<input type='checkbox' name='hobbies' value='${item2}' checked>${item2}`;
                                                flag = true;
                                            }
                                        }
                                        if(!flag){
                                            chekckStr = `<input type='checkbox' name='hobbies' value='${item2}'>${item2}`;
                                        }*/
                                        if(showUserInfo.hobbies.includes(item2)){
                                            chekckStr = `<input type='checkbox' name='hobbies' value='${item2}' checked>${item2}`;
                                        }else{
                                            chekckStr = `<input type='checkbox' name='hobbies' value='${item2}'>${item2}`;
                                        }

                                        modifyInfo += chekckStr;

                                    })

                              modifyInfo+=     
                                `</div>
                                <div>
                                    <input type="submit" value="提交">
                                </div>
                            </form>
                        </body>
                        </html>
                         `;
                    
                    res.end(modifyInfo);
               
               
                }
                else if(pathname=='/remove'){
                    // 获取客户端响应过来的id：get   ==>query.id
                    
                   await user.findOneAndDelete({_id:query.id});
                    
                    res.writeHead(301,{
                        location:'/list'
                    })
                    res.end('ok');
                    
                }

            }else if(reqmethod=='POST'){
                // post方法一般是实现功能
                // 实现用户添加功能
                if(pathname=='/add'){
                    // 用于拼接字符串
                    let forData='';
                    // 先接收用户提交的信息，
                    req.on('data',result=>{
                        forData+=result;
                    })
                    req.on('end',async ()=>{
                        // 传输完成
                        let submitInfo=queryString.parse(forData);
                        // console.log(submitInfo);
                        // 再将用户信息提交到数据库中（创建文档）
                       await user.create(submitInfo);
                    //    跳转到/list==>301代表重定向
                       res.writeHead(301,{
                           location:'/list'
                       })
                       res.end('ok');

                    });
                };
                       // 实现用户修改功能
                       if(pathname=='/modify'){
                        // 用于拼接字符串
                        let modifyData='';
                        // 先接收用户提交的信息，
                        req.on('data',result=>{
                            modifyData+=result;
                        })
                        req.on('end',async ()=>{
                            // 传输完成
                            let submitModifyInfo=queryString.parse(modifyData);
                            // 再将用户修改信息提交到数据库中（修改一个文档）
                            console.log("hahhaha",submitModifyInfo);
                            // 通过query获取id
                           await user.updateOne({_id:query.id},submitModifyInfo);

                        //    跳转到/list==>301代表重定向
                           res.writeHead(301,{
                               location:'/list'
                           })
                           res.end('ok');
    
                        });
                    }
               
            }
        })
        // 监听端口
        app.listen(12000);
        console.log('服务器启动成功')





// 从数据库中查询用户信息,将用户信息展示在列表中
// 4.将用户信息和表格html进行拼接，并将凭借结果响应回客户端
// 5.当用户访问/add的时候，呈现表单页面，并实现添加用户信息功能
// 6.当用户访问/modify的时候，呈现修改页面，并实现修改用户信息功能
// 7.当用户访问/delete的时候，实现删除用户信息功能


