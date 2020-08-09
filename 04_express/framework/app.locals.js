const express=require('express');
// 引入post请求的第三方模块
const bodyParser=require('body-parser');
const path=require('path');
// 拼接路径,访问的时候,views文件夹
const absolutePath=path.join(__dirname,'views')
const app=express();
// 静态资源访问,路径推荐写绝对路径-->引入path模块
app.use(express.static(absolutePath));
// 1.告诉express框架使用什么模板引擎渲染什么后缀文件
    //参数1:模板后缀
    // 参数2:指定什么模板引擎去渲染模板
app.engine('art',require('express-art-template'));
// 2.告诉express框架模板引擎存放的位置是什么
    // 参数1:固定为views,是express配置项
    //参数2:位置信息
app.set('views',absolutePath);
// 告诉express框架模板默认后缀是什么
    // 参数1:默认模板配置项
    // 参数2:默认模板后缀
app.set('view engine','art');
// 公共部分的信息
app.locals.users=[{
    name:'张三',
    age:18
    },
    {
    name:'李四',
    age:20
    }
    ];
// 创建路由
app.get('/index',(req,res)=>{
    res.render('index',{
        msg:'我是index页面渲染的值'
    })
});
app.get('/list',(req,res)=>{
    res.render('list',{
        msg:'我是list渲染的值'
    })
})
app.listen(14010);
console.log('ok')