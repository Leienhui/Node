# node.js

* node是基于chorme v8引擎的JavaScript代码运行环境
* 官网：https://nodejs.org/zh-cn/
* 使用来安装并维护多个node.js的版本

## node.js的组成

* node.js是由ECMAScript及node提供的一些附加的api组成，包括网络、文件、路径等

## node.js模块化开发

* 一个功能就是一个模块，多个模块可以组成完整应用，抽离一个模块不会影响其他功能的运行

### node.js模块开发规范

* node.js规定一个JavaScript文件就是一个模块，**模块内部定义的变量和函数默认情况下无法在外部获取**

#### exports导出成员

* 模块内部可以使用**exports对象进行成员导出**，使用**require方法导入其他模块**

  ```
  // a.js
  // 在模块内部定义变量
  let number=3;
  // 在模块内部定义方法
  const add=(n1,n2)=>n1+n2;
  // 向模块外部导出数据
  exports.ad=add;
  exports.num=number;
  ```

  ```
  // b.js
  // 在b.js模块中导入模块a
  let a=require('./a.js');
  // 输出a模块中的number变量
  console.log(a.num);
  // 调用a模块中的add方法输出其返回值
  console.log(a.ad(10,30));
  ```

* 导入模块的时候，后最可以省略

#### module.exports导出成员

```
// 在module.exports.js文件中
const greeting=name=>`hello ${name}`;
module.exports.greet=greeting;

```

```
// require.js
const a=require('./module.exports.js');
console.log(a.greet);
```

* **注意：**exports是module.exports的别名（地址引用关系），当exports与module.exports的指向对象一样的时候，他们是一样的；当指向对象不一样，导出对象最终以module.exports为准
## 系统模块

### 系统模块fs文件操作

```
// 引入fs文件
const fs=require('./fs');
// 读取文件内容
fs.readFile('文件路径/文件名称',['文件编码'],callback)
```

### 读取文件的语法示例

```
// 通过模块的fs对模块进行引用
const fs=require('fs');
fs.readFile('./01.txt','utf8',(err,doc)=>{
    // 如果文件读取发生错误，参数err的值为错误对象，否则err的值为null
    // doc参数为文件内容
    if(err==null){
        console.log(doc);
    }
});
```

### 写入文件内容

```
fs.writeFile('文件路径/文件名称','数据',callback)
```

```
// 引入fs
const fs =require('fs');
fs.writeFile('./01.txt','我是写入的内容',err=>{
    if(err!=null){
        // 写入失败
        return;
    }
    console.log('写入成功');
});
```

### 系统模块path路径操作

#### 路径拼接

```
path.join('路径','路径',...)
```

```
// 假如要拼接a/b/c
// 引入系统模块path
const path=require('path');
// 调用join方法
const finalPath=path.join('a','b','c',)
console.log(finalPath);
```

#### 相对路径与绝对路径

* 在node.js中，大多数情况下使用绝对路径，因为相对路径有时候相对的是命令行工具的当前工作目录

* 在文件读取或者设置文件命令的时候都会选择绝对路径

* 使用**__dirname**来获取当前文件所在的绝对路径(注意：这里的**__dirname**是**两个下划线**)

  ```
  //绝对路径
  // 引入系统模块path,fs
  const path=require('path');
  const fs=require('fs');
  fs.readFile(path.join(__dirname,'01.txt'),'utf8',(err,doc)=>{
      console.log(err);
      console.log(doc);
  })
  ```

## 第三方模块

* npmjs.com：第三方模块的存储和分发仓库
* npm:node的第三方模块管理工具
* 下载第三方模块：npm install 模块名称
* 卸载第三方模块：npm uninstall package 模块名称

### 本地安装与全局安装

* 命令行工具：全局安装
* 库文件：本地安装

### nodemon

* 是一个命令行工具，用于辅助项目开发
* 当执行的文件被修改的时候，会自动执行

#### 使用步骤

* 下载nodemon:npm install nodemon -g
* 在命令行工具中使用nodemon命令代替node命令执行文件

### nrm

* nrm:npm下载地址的切换工具

#### 使用步骤

* 下载：npm install nrm -g

* 查询可用下载地址列表：nrm  ls
* 切换npm下载地址：nrm use 下载地址名称

### gulp

* 是基于node开发的前端构建工具

#### gulp作用

* 在项目上线的时候：对html,css,js文件压缩合并
* 还可以对es6,less等进行语法切换
* 公共文件抽离
* 修改文件浏览器自动刷新

#### gulp的使用

* 下载库文件：npm install gulp
* 在项目的根目录下建立gulpfile.js文件
* 重构项目的文件夹结构src目录放置源代码文件dist目录放置构建文件
* 在glupfile.js文件中编写任务
* 在命令行工具中执行任务

#### gulp中提供的方法

* gulp.src():获取要处理的文件

* gulp.dest():输出文件

* gulp.task():建立gulp任务

* gulp.watch();监控文件的变化

  ```
  // 在gulpfile.js里面引入gulp模块
  const gulp=require('gulp');
  // 使用gulp.task方法建立gulp任务
  gulp.task('要建立任务的名称',()=>{
    // 获取要处理的文件
    gulp.src('要处理文件的路径')
    // 将处理后的文件输出到dist目录下的css文件夹里面
    .pipe(gulp.dest('./dist/css'))
  });
  ```

#### 安装gulp的命令行

* 安装：npm install gulp-cli -g 
* 运行任务：gulp 任务名称

#### gulp插件

##### html压缩

* 公共文件包含：

  * 下载：npm install gulp-file-include
  * 在gulpfile.js中引用：

  ```
  // 导入gulp-file-include模块
  const fileinclude=require('gulp-file-include');
  gulp.task('要建立任务的名字',()=>{
      // 获取要处理的文件
      gulp.src('要处理文件的路径')
      // 对于有公共文件的html的文件中，要使用公共文件，就需要在需要的地方加“@@include('文件路径')”
      .pipe(fileinclude())
    	// 获取src下面的所有的html文件
      gulp.src('./src/*html')
    });
  ```

  * **注意：**如果有公共文件，需要在压缩html之前压缩公共代码，公共代码手动放在一个common文件夹里面就可以了  

* 压缩html文件：

  * 安装插件：npm install gulp-htmlmin

  * 在gulpfile.js中引用：

    ```
    //引用插件
    const htmlmin=require('gulp-htmlmin');
    gulp.task('要建立任务的名字',()=>{
     //   获取src下面的所有的html文件
      gulp.src('./src/*html')
      //压缩html文件中的代码,空格也要压缩
      .pipe(htmlmin({collapsewhitespace:true}))
      //将压缩的代码放入dist目录下  
      .pipe(gulp.dest('dist'));
    });
    ```

##### 对css文件进行压缩

* 1.先将less文件转换为css文件
* 2.再将css文件进行压缩

* less语法转换为css语法：

  * 下载：npm install gulp-less

  * 在gulpfile.js中引用：

  ```
  // 引入模块
  const less=require('gulp-less');
  gulp.task('cssmin',()=>{
      // 获取要处理的文件
      gulp.src('./src/css/*.less')
      // 将less语法进行转换
      .pipe(less())
      // 将处理后的文件输出到dist目录下的css文件夹里面
      .pipe(gulp.dest('./dist/css'))
    });
  ```

* 压缩css文件：

  * 下载：npm install gulp-csso

  * 在gulpfile.js中引用：

    ```
    // 引入模块
    const less=require('gulp-less');
    const css=require('gulp-csso');
    gulp.task('cssmin',()=>{
        // 获取要处理的文件
        gulp.src(['./src/css/*.less','./src/css/*.css'])
        // 将less语法转换为css语法
        .pipe(less())
        // 将css语法进行压缩
        .pipe(csso())
        // 将处理后的文件输出到dist目录下的css文件夹里面
        .pipe(gulp.dest('./dist/css'))
      });
    ```

##### 对JavaScript进行转换

* 1.es6代码转换
* 2.对JavaScript代码压缩

* javascript语法转换：

  * 下载： npm install  gulp-babel @babel/core @babel/preset-env 
  * 在gulpfile.js中引用：

  ```
  // 导入插件
  const babel=require('gulp-babel');
  // 创建任务
  gulp.task('jsmin', () =>
  // 选中要处理的资源
      gulp.src('src/js/*.js')
          .pipe(babel({
              //判断当前代码的运行环境，将代码转换为当前运行环境所支持的代码
              presets: ['@babel/env']
          }))
          // 将处理的结果在dist目录下的js文件下输出
          .pipe(gulp.dest('dist/js'))
  );
  ```

  

* 压缩混淆JavaScript：

  * 下载：npm install gulp-uglify

  ```
  const babel=require('gulp-babel');
  const uglify = require('gulp-uglify');
  gulp.task('jsmin', () =>
  // 选中要处理的资源
      gulp.src('src/js/*.js')
      // 对es6代码进行转换
          .pipe(babel({
              //判断当前代码的运行环境，将代码转换为当前运行环境所支持的代码
              presets: ['@babel/env']
          }))
          // 将转换的代码进行压缩
          .pipe(uglify())
          // 将处理的结果在dist目录下的js文件下输出
          .pipe(gulp.dest('dist/js'))
  );
  ```

#### 复制文件夹

```
//将scr目录下的img文件夹和lib文件夹拷贝到dist文件夹下
gulp.task('copy', () =>{
  // 选中要处理的资源,选中img里所有文件
    gulp.src('src/img/*')
        // 将处理的结果在dist目录下的js文件下输出
        .pipe(gulp.dest('dist/js'));
  // 选中要处理的资源,选中lib里所有文件
    gulp.src('src/lib/*')
        // 将处理的结果在dist目录下的lib文件下输出
        .pipe(gulp.dest('dist/lib'));
});
```

#### build构建任务

* 执行一个任务其他的任务跟着执行

  ```
  // 当在命令行中执行default任务的时候，要依次执行后面的任务,注意，数组里面的提前已经准备好了
  gulp.task('default', ['htmlmin','cssmin','jsmin','copy']);
  ```

## node_modules文件夹问题

### package.json文件作用

* 是项目的描述文件，主要记录项目信息，例如项目名称，版本，作者，GitHub地址，当前项目依赖第三方模块等。
* 一般处于项目的根目录下
* 快速生成：npm init -y

#### 项目依赖

* npm install：安装项目依赖和开发依赖

* 在项目开发阶段和线上运营阶段，都需要依赖的第三方包，称为项目依赖
* 指向安装项目依赖：npm install --production

* 使用npm install 包名  命令下载的文件会默认添加到package.json文件的dependencies字段中

  ```
  //"dependencies"：记录下载的第三方模块
  "dependencies": {
      "jquery": "^3.4.1",
      "vue": "^2.6.11"
    }
  ```

#### 开发依赖

* 在项目的开发阶段需要依赖，线上运行不需要依赖的第三方包，称为开发依赖

* 使用npm install 包名 --save-dev  命令将包添加到devDependencies字段中

  ```
  "devDependencies": {
      "@babel/core": "^7.9.0",
      "@babel/plugin-proposal-class-properties": "^7.8.3",
      "@babel/plugin-transform-runtime": "^7.9.0",
      "@babel/preset-env": "^7.9.0",
      "@babel/runtime": "^7.9.2",
      "autoprefixer": "^9.7.5",
      "babel-loader": "^8.1.0",
      "css-loader": "^3.4.2",
      "file-loader": "^6.0.0",
      "html-webpack-plugin": "^4.0.2",
      "less": "^3.11.1",
      "less-loader": "^5.0.0",
      "node-sass": "^4.13.1",
      "postcss-loader": "^3.0.0",
      "sass-loader": "^8.0.2",
      "style-loader": "^1.1.3",
      "url-loader": "^4.0.0",
      "vue-loader": "^15.9.1",
      "vue-template-compiler": "^2.6.11",
      "webpack": "^4.42.1",
      "webpack-cli": "^3.3.11",
      "webpack-dev-server": "^3.10.3"
    }
  ```

#### scripts字段：

* 存储命令的别名

  ```
  "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    }
  ```

### package-lock.json文件的作用

* 记录模块与模块之间的依赖关系以及模块的版本号，模块的下载地址
* 锁定包的 版本，确保下次下载时不会因为包的版本不同而产生问题
* 加快下载速度，因为该文件中已经记录了项目依赖第三方包的树状结构和包的下载地址，重新安装时只需要下载即可，不足要做额外的工作。

## node.js中模块加载机制

* 完整路径：require方法根据模块路径查找模块，如果时完整路径，直接引入模块--->有路径与后缀

```
require('./find.js')
```

### 模块查找规则--模块有路径没后缀

* 省略后缀：如果后缀省略，先找同名的js文件，再找同名的js文件夹

```
require('./find')
```

* 如果找到了同名js文件夹，找文件夹里面的index.js执行
* 如果文件夹中没有index.js文件，就会去当前文件夹中的package.json文件中查找main选项的指定入口文件
* 如果main选项中的指定入口文件不存在或者没有指定入口文件就会报错，模块没有被找到

###    模块查找规则--模块没路径没后缀

```
require('find')
```

* node.js会假设它是系统模块，去系统模块中查找，如果有就执行系统模块
* 如果系统模块下没有，node.js回去node_modules文件夹中去查找
  * 首先看是否有该名字的js文件，如果找到了该文件，就执行
  * 如果没有找到，就去node_modules文件夹中看看是否有该名的文件夹
    * 如果有同名文件夹，看里面是否有index.js文件
      * 如果有index.js,就执行index.js
      * 如果没有index.js，就会去当前文件夹中的package.json文件中查找main选项的指定入口文件
        * 如果main选项中的指定入口文件不存在或者没有指定入口文件就会报错，模块没有被找到

## web服务器

### URL

* 统一资源定位符（Uniform Resource Locator）
* 是专为标识Internet网上资源位置而设的一种编程方式

#### URL组成

*  传输协议：//服务器ip或域名：端口/资源所在服务器中的位置标识

### 创建web服务器

```
// 引入系统模块http,用于创建网站服务器
const http=require('http');
// 创建服务器,返回值app就是网站服务器对象
const app=http.createServer();
// 为网站服务器对象添加事件请求参数1是事件名称；参数2是事件处理函数，里面有两个参数
// 当客户端有请求来的时候
app.on('requset',(req,res)=>{
	//响应
    res.end('<h1>我是响应的内容</h1>');
});
// 监听端口向外界提供服务
app.listen(3000);
console.log('服务器启动成功');
```

### http协议

#### http协议的概念

* http协议：超文本传输协议（Hypertext Transfer Protocol ），提供了一种发布和接收html页面的方法
* 规定了如何从网站服务器传输超文本到本地浏览器
* 基于客户端服务器架构工作，是客户端（用户）和服务器（网站）请求和应答的标准

#### 报文

* 在http请求和响应的过程中传递的数据块就叫报文，包括要传输的数据和一些附加的信息，并且要遵守规定好的格式

##### 请求报文

* 请求的方式：
  * get :请求数据
  * post：发送数据（相对安全）

##### 请求地址

* req.url-->获取请求地址

  ```
   if(req.url=='/index'||req.url=='/'){
          res.end('首页');
      }else if(req.url=='/list'){
          res.end('列表页');
      }else{
          res.end('页面不存在');
      }
  ```

* req.headers-->获取请求报文信息

  ![](D:\PHPstudy\phpstudy_pro\WWW\node\01 node基础\1.jpg)

  ```
  // 获取报文头部信息req.headers
      console.log(req.headers);
      // 获取报文头部信息req.headers。获取accept里面的具体信息,[]只能有一个键
      console.log(req.headers['accept']);
  ```

* req.method-->获取请求方法

##### 响应报文

###### http状态码

* 200——>请求成功
* 404——>请求的资源没有被找到
* 500——>服务器错误
* 400——>客户端请求有语法错误

###### 内容类型

* text/html——>html

  ```
   // 响应报文
      res.writeHead(200,{
      //在响应中主动告诉浏览器使用UTF-8编码格式来接收数据
          'content-type':'text/html;charset=UTF-8'
      });
  ```

* text/plain——>纯文本

* text/css

* application/javascript

* image/jpeg

* application/json

##### 请求参数

* 客户端向服务器发送请求时，有时需要携带一些客户信息。客户信息需要参数的形式传递到服务器端，比如登录操作

###### GET请求参数

* 参数被放置在浏览器地址栏中，例如http://localhost:9000/**?**name=zs&age=18
  * ❓后面的就是请求参数

* 请求参数要通过req.url来获取

###### 查询参数的获取

```
// 用于处理url地址的内置系统模块
const url=require('url');
app.on('request',(req,res)=>{
    // 解析url地址url.parse(req.url);第二个参数表示将查询参数解析为对象形式
    // 拿到请求对象url.parse(req.url,true).query
   let params=url.parse(req.url,true).query;
   console.log(params.name);
   console.log(params.age);
});
```

###### 查询参数与请求地址

```
// 用于处理url地址的内置系统模块
const url=require('url');
app.on('request',(req,res)=>{
    // url既包含请求参数又包含请求地址
    // pathname:存的就是不包含请求参数的客户端的请求地址
    // 解构query与pathname这两个参数
    let {query,pathname}=url.parse(req.url,true);
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
});
```

###### POST请求参数

* 参数放于请求体（请求报文）中进行传输

* 获取POST参数需要使用data事件与end事件

* 使用querystring将参数转换为对象格式

  ```
  // 处理请求参数模块
  const querystring=require('querystring');
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
  ```

#### 路由

* 指客户端请求地址与服务器端程序代码的对应关系，简单的说就是请求什么响应什么

  ```
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
  ```

#### 静态资源

* 服务端不需要处理，可以直接响应给客户端的资源就是静态资源，例如：css,javascript,image，html文件

  ```
  // 1.引入系统模块
  const http=require('http');
  const url=require('url');
  const path=require('path');
  const fs=require('fs');
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
              }else{
                  // 响应报文
                   res.writeHead(200,{
                   //在响应中主动告诉浏览器使用UTF-8编码格式来接收数据
                       'content-type':'text/html;charset=UTF-8'
                   });   
                   res.end(result);
              }
          });
      
  });
  app.listen(11000);
  console.log('服务器启动成功');
  
  ```

```
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
    // 根据实际路径返回资源的类型
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

```



#### 动态资源

* 相同的请求地址不同的响应资源，这种资源就是动态资源

## node.js异步编程

### 同步API

* 只有执行完当前API之后才能继续执行下一个API

### 异步API

* 当前API的执行不会阻塞后续代码的执行

  * setTimeout()就是一个异步的API

    ```
    console.log('before');
    setTimeout(() => {
        console.log('xixixi')
    }, 2000);
    console.log('after');
    ```

  * 输出结果是before=>after=>xixixi

    ```
    //回调函数的方法实现文件的依次读取==>回调地狱
    // 引入读取文件模块
    const fs=require('fs');
    fs.readFile('./1.txt','utf8',(err,result1)=>{
        console.log(result1);
        fs.readFile('./2.txt','utf8',(err,result2)=>{
            console.log(result2);
            fs.readFile('./3.txt','utf8',(err,result3)=>{
                console.log(result3);
            });
        });
    })
    ```

    

### 同步API与异步API的区别

* 同步API可以从返回值中拿到API执行的结果，异步API不可以

  ```
  //异步得不到执行结果
  function getMsg(){
      setTimeout(()=>{
          return {
              msg:'hello'
          }
      },2000);
  }
  const msg=getMsg();
  console.log(msg);
  //输出结果为undefined
  ```

  ```
  //同步
  function getMsg(n1,n2){
          return n1+n2;
  }
  const msg=getMsg(10,20);
  console.log(msg);
  //输出结果是30
  ```

* 同步API从上到下依次执行，前面的代码会阻塞后面的代码执行
* 异步API不会等待执行完成后再向下执行代码

### 回调函数

* 自己定义函数让别人去调用

  ```
  //callback是一个形参
  function getData(callback){
      // 调用下面的匿名函数,向里面传递一个实参
      callback(123);
  }
  // 函数的实参是一个匿名函数，用一个形参来接收上面的实参
  getData(function(n){
      console.log('callback函数被调用');
      console.log(n);
  });
  ```

* 通过回调函数解决异步获取不到返回值的问题

  ```
  //callback是一个形参
  function getData(callback){
      setTimeout(()=>{
          // 调用下面的匿名函数,向里面传递一个实参
          callback(123);
      },2000)
  }
  // 函数的实参是一个匿名函数，用一个形参来接收上面的实参
  getData(function(n){
      console.log('callback函数被调用');
      console.log(n);
  });
  ```

### node.js的执行顺序

![](D:\PHPstudy\phpstudy_pro\WWW\node\01 node基础\2.jpg)



### Promise

* 解决node.js异步编程中回调地狱的问题

```
// 引入系统模块
const fs=require('fs');
//实例化promise,resolve和reject实际上是一个函数
let promise=new Promise((resolve,reject)=>{
    fs.readFile('./1.txt','utf8',(error,result)=>{
        // 这里面放置异步API
        setTimeout(()=>{
            if(error!=null){
                // 读取失败，传递读取失败信息
                reject(error)
            }else{
                resolve(result);
            }
        },2000)

    })
    
});
// 获取promise里面的东西
// 获取成功时候的结果,then相当于调用resolve
promise.then(result=>console.log(result))
       .catch(error=>console.log(error));
```

```
//依次读取文件==>解决回调地狱的问题
    // 有多少个异步API，就需要多少个函数和promise对象，
   // 引入系统模块
const fs=require('fs');
function f1(){
    return new Promise((resolve,reject)=>{
        fs.readFile('./1.txt','utf8',(error,result1)=>{
            resolve(result1);
        });
    });
}
function f2(){
    return new Promise((resolve,reject)=>{
        fs.readFile('./2.txt','utf8',(error,result2)=>{
            resolve(result2);
        });
    });
}
function f3(){
    return new Promise((resolve,reject)=>{
        fs.readFile('./3.txt','utf8',(error,result3)=>{
            resolve(result3);
        });
    });
}
// 上一个then   return的promise对象在下一个then中调用
f1().then((text1)=>{
    console.log(text1);
    return f2();
})
.then((text2)=>{
    console.log(text2);
    return f3();
})
.then((text3)=>{
    console.log(text3);
})
```

### 异步函数

* 异步函数时异步编程的终极解决方案，它可以将异步代码写成同步形式，让代码不再有回调函数嵌套，是代码变得清晰明了

* 就是在普通函数的前面加上async这个关键字——>变成异步函数
* 异步函数默认返回值是promise对象

#### async关键字

```
// 1、在普通函数定义的前面加上async关键字，普通函数就变成了异步函数
// 2、异步函数默认返回值是promise对象
async function  fn() { 
    // 异常信息需要通过关键字throw来抛出,如果throw执行了，那么return的就不执行了
    throw '捕获异常';
    // 这个return相当于promise中的resolve方法
    return 123;
    
 }
 fn().then((data)=>{
     console.log(data);
 }).catch((error)=>{
     console.log(error);
 })
```

#### await关键字

* 只能出现在异步函数中
* await后面只跟promise对象，它可以暂停异步函数的执行，等待promise对象返回结果后再向下执行

```
async function p1(){
    return 'p1';
}
async function p2(){
    return 'p2';
}
async function p3(){
    return 'p3';
}
// 用于执行上面的函数的异步函数
async function run(){
    // 加上关键字await，p1不执行不会执行后面的
    let r1=await p1();
    let r2=await p2();
    let r3=await p3();
    console.log(r1);
    console.log(r2);
    console.log(r3);
}
run();
```

### 异步函数读取文件

#### promisify

* 改造现有异步函数API，使其返回promise对象，从而支持异步函数的语法

```
const fs=require('fs');
// fs.readFile()是通过返回值的形式获得结果
//node.js提供promisify(),对现有API进行包装，让这个方法返回promise对象以支持异步函数语法
// 获取promisify()方法的过程
// 1.引入util模块
const util=require('util');
// 2.拿到promisify方法
const promisify=util.promisify;
// 3.使用promisify方法,拿到读取文件这个方法==>readFile是promise对象了
const readFile=promisify(fs.readFile);
// 4.使用读取文件的方法
async function run(){
    // 第三个参数不用写了
    let text1=await readFile('./1.txt','utf8');
    let text2=await readFile('./2.txt','utf8');
    let text3=await readFile('./3.txt','utf8');
    console.log(text1);
    console.log(text2);
    console.log(text3);
}
run();
```



