# express框架

## express框架是什么

* express是基于Node平台的web应用开发框架，它提供了一系列强大特性，帮助你创建各种web应用
* 下载框架：npm install express

## express框架的特性

* 提供了方便简洁的路由定义方式
* 对获取http请求参数进行简化处理
* 对模板引擎支持程度高，方便渲染动态html页面
* 提供了中间件机制有效控制http请求
* 拥有大量第三方中间件对功能进行扩展

## express的基本代码

```
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
```

* send()优点：
  * 1.可以自动去检测客户端响应的类型
  * 2.并将响应类型自动设置到响应头中，
  * 3.还可以自动设置响应内容的响应编码，以防止出现乱码的情况
  * 4.可以自动设置http状态码
  * 5.send()里面可以直接传入对象

## 中间件

### 什么是中间件

```
//接收get请求
app.get('请求路径','处理函数')
//接收post请求
app.post('请求路径','处理函数')
```

```
// 引入express框架
const express=require('express');
// 调用express框架创建网站服务器
const app=express();
app.get('/', (req,res,next)=>{
    /*
    next:
    权限控制函数
    */
    req.name="张三";
    // 调用next()方法，这个请求文件还得向下请求中间件
    next();
});
app.get('/',(req,res)=>{
res.send(req.name);
})
//监听端口
app.listen(14001);
console.log('服务器启动成功')
```



* 中间件就是一堆方法，可以接收客户端发来的请求，可以对请求做出响应，也可以将请求交给下一个中间件来继续处理。

* 同一个请求可以设置多个中间件,默认情况下，请求从上到下依次匹配中间件，一旦匹配成功，终止匹配
* 可以调用next方法将请求夫人控制权交给下一个中间件，直到遇到结束请求的中间件

* 组要组成部分：
  * 中间件方法
  * 请求处理函数

* 作用：
  * 负责拦截请求的方法-->express框架提供
  * 负责处理请求的方法-->请求函数由开发人员提供

#### app.use(中间件的用法)

* app.use()匹配所有的请求方式，可以直接传入请求处理函数，代表接收说有的请求

* 中间件是有顺序的，**app.use()中间件必须定义在其他中间件的前面**，否则其他中间件匹配到这个请求又没有将请求的控制权交给下一个中间件，也是匹配不到这个中间件的

  ```
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
  ```

  

### 中间件的应用

* **路由保护：**客户端在访问需要登录的页面时，可以先使用中间件判断用户状态，用户如果未登录，则拦截请求，直接响应，禁止用户进入需要登录的页面

  ```
  app.use('/admin',(req,res,next)=>{
      // let isAdmin=false;
      let isAdmin=true;
  
  
      if(isAdmin){
          next()
      }else{
          res.send('not admin')
      }
  });
  // 设置路由
  app.get('/admin',(req,res)=>{
      res.send('admin');
  })
  ```

  

* **网站维护公告：**在所有路由的**最上面**定义接收所有请求的中间件，直接为客户端做出响应，网站正在维护中

  ```
  // 不想让别人访问在最前面设置接收所有的中间件，并且不调用next()
  app.use((req,res,next)=>{
      // 网络公告
      res.send('网站正在维护中...')
  })
  ```

  

* **定义404页面：**在所有路由的**最下面**定义接收所有请求的中间件，直接为客户端响应，访问页面不存在

  ```
  app.use((req,res,next)=>{
      //设置找不到页面的状态码==>为客户端响应404状态码
      // res.status(404);
      // res.send('页面不存在');
      res.status(404).send('页面不存在')
  })
  ```

### 错误处理中间件

* 在程序执行的过程中，不可避免的会出现一些无法预料的错误，比如文件读取失败，数据连接失败，错误处理中间件是一个集中处理错误的地方
* 只能捕获同步代码的错

```
app.use((err,req,res,next)=>{
res.status(500).send('服务器发生错误');
})
```

```
// 引入express框架
const express=require('express');
// 调用express框架创建网站服务器
const app=express();
app.get('/',(req,res)=>{
    // 创建一个错误实例,并将其抛出
    throw new Error('程序发生了未知错误');
})
// 接收所有错误的请求
app.use((err,req,res,next)=>{
    // err就是上面路由里面的错误对象,message就是路由抛出的错误信息
   res.status(500).send(err.message)

});

//监听端口
app.listen(14004);
console.log('服务器启动成功')
```

* 当异步代码出现错误时，需要手动调用next()方法，并且将错误信息通过参数的形式传递给next()方法，即可触发错误处理中间件

  ```
  // 引入express框架
  const express=require('express');
  const fs=require('fs');
  // 调用express框架创建网站服务器
  const app=express();
  app.get('/',(req,res,next)=>{
      // 创建一个错误实例,并将其抛出
      // throw new Error('程序发生了未知错误');
      // 读取文件错误
      fs.readFile('./sheh.txt','utf8',(err,result)=>{
          if(err!=null){
              next(err);
          }
          else{
              res.send(result);
          }
      })
  })
  // 接收所有错误的请求
  app.use((err,req,res,next)=>{
      // err就是上面路由里面的错误对象,message就是路由抛出的错误信息
     res.status(500).send(err.message)
  });
  //监听端口
  app.listen(14004);
  console.log('服务器启动成功')
  ```

### 捕获错误

* 在node.js中，异步API的错误信息都是通过回调函数获取的，支持promise对象的异步API发生错误可以通过catch方法捕获

* try catch只可以捕获异步函数和其他同步代码在执行过程中发生的错误，不能捕获其他API发生的错误

  ```
  app.get('/',async(req,res,next)=>{
  	try{
  	await User.find({name:'张三'})
  	}catch(ex){
  	next(ex)
  	}
  })
  ```

  

```
// 引入express框架
const express=require('express');
const fs=require('fs');
// 改造API支持异步函数的形式
const promisify=require('util').promisify;
// 重新包装读取文件的方法
const readFile=promisify(fs.readFile)
// 调用express框架创建网站服务器
const app=express();
app.get('/',async (req,res,next)=>{
    // 读取文件错误,通过try...catch，即使文件读取不成功，也不会影响下面程序的执行
    try{
        /* 将可能出错的代码块放在里面执行
        如果try里面的代码块出现错误，那么程序会跳转到catch里面去执行，
        如果try里面没错误，那么程序跳转到catch后面去执行
        */
       await readFile('./sheh.txt','utf8');
    }catch(ex){
        next(ex);
    }
 });
// 接收所有错误的请求
app.use((err,req,res,next)=>{
    // err就是上面路由里面的错误对象,message就是路由抛出的错误信息
   res.status(500).send(err.message)

});
//监听端口
app.listen(14005);
console.log('服务器启动成功')
```

## express请求处理

### 构建模块化路由

* 构建路由基本代码：

  ```
  // 引入express框架
  const express=require('express');
  // 创建网站服务器
  const app=express();
  // 创建一级路由路由对象
  const home=express.Router();
  // 为home路由对象匹配一个请求路径,具体的请求，在二级路由中去处理
  app.use('/request',home);
  // 创建二级路由
  home.get('/index',(req,res)=>{
  //访问的时候：  localhost:14006/request/index
      res.send('welcome first page');
  })
  // 监听端口
  app.listen(14006);
  ```

* 构建模块化路由基本代码

  ![](D:\PHPstudy\phpstudy_pro\WWW\node\04express\1.jpg)

### GET参数的获取

* express框架中使用**req.query即可获取GET参数**，框架内部将GET参数转换为对象并返回

  * 接收地址栏中问好后面的参数

    ```
    //例如：http://localhost:3000/?name=zhangsan&age=18
    app.get('/',(req,res)=>{
    	console.log(req.query);
    })
    ```

    ```
    const express=require('express');
    const app=express();
    app.get('/index',(req,res)=>{
        res.send(req.query)
    })
    app.listen(14008);
    console.log('ok')
    ```

### POST参数的获取

* express中接收post请求要接收第三方包，body-parser

* 下载第三方包：npm install body-parser

  ![](D:\PHPstudy\phpstudy_pro\WWW\node\04express\2.jpg)

* app.use('放函数')

```
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
```

### express路由参数

#### GET参数获取

```
//find为请求地址
app.get(/find/:id.(req,res)=>{
	//返回请求参数
	console.log(req.params)
})
```

```
const express=require('express');
// 引入post请求的第三方模块
const bodyParser=require('body-parser');
const app=express();

// id,name是一个占位符,表示要接受一个id,name作为参数
app.get('/index/:id/:name',(req,res)=>{
    //输出参数id值
    res.send(req.params); 
    //输出:  {"id":"123","name":"zhangsan"}      
})
app.listen(14010);
console.log('ok')
```

### 静态资源的处理

* 通过express内置的express.static可以方便的托换静态文件，例如:img,css,javascript文件等

  ```
  app.use(express.static('静态资源的目录'));
  ```

  ```
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
  ```

## express-art-template模板引擎

* 为了使art-template模板引擎能够更好的和express框架配合，模板引擎官方在原art-template模板引擎的基础上分装了express-art-template
* 下载命令：npm install art-template  express-art-template

* 基本代码

  ```
  //当渲染后缀为art模板时，使用express-art-template
  app.engine('art',require('express-art-template'));
  //设置模板存放目录
  app.set('views',path.join(__dirname,'views'));
  //设置模板的默认后缀
  app.set('view engine','art');
  app.get('/',(req,res)=>{
  	//渲染模板
  	res.render('index')
  })
  ```

  

```
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
// 创建路由
app.get('/index',(req,res)=>{
    // render方法由express提供
    // 参数1:模板名字
    // 参数2:对象(对象的值可以通过属性可以直接拿到)
    res.render('index',{
        msg:'我是index页面渲染的值'
    })
    /*
    render的作用:
    1.拼接模板路径
    2.拼接模板后缀
    3.那个模板和那个数据进行拼接
    4.将拼接结果响应给客户端
    */
});
app.get('/list',(req,res)=>{
    res.render('list',{
        msg:'我是list渲染的值'
    })
})
app.listen(14010);
console.log('ok')
```

* render的作用:
  * 1.拼接模板路径
  *  2.拼接模板后缀 
  *  3.那个模板和那个数据进行拼接
  *   4.将拼接结果响应给客户端



#### app.locals对象

* 将变量设置到app.locals对象下面，这个数据在所有模板中可以获取到

  ```
  app.locals.users=[{
  name='张三',
  age=18
  },
  {
  name='李四',
  age=20
  }
  ]
  ```

  

```
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
```



