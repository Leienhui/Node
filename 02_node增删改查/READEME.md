# node.js快速入门

* 在浏览器中，全局对象是window,在node中全局对象是global

## node中的全局对象

* 可以在任何地方使用，global可以省略
* **console**.**log**():在控制台输出

* **setTimeout**():设置超时定时器

* **clearTimeout**():清除超时定时器

* **setInterval**():设置间歇定时

* **clearInterval**():清楚间歇定时

## 服务器端基础概念

### 网站的组成

* 客户端和服务器端
* 客户端：在浏览器中运行的部分，就是用户看到并与之交互的界面程序，使用html，css,javascript构建
* 服务器端：在服务器中运行的部分，负责存储数据和出应用逻辑

### node网站服务器

* 能够提供网站访问服务的机器，能够接收请求，对请求做出响应

### IP地址

* 互联网中设备的唯一标识，叫互联网协议地址

### 域名

* 上网使用的地址

### 端口

* 计算机与外界通讯交流的出口，用来区分服务器电脑中提供的不同服务

## MongDB数据库

* 数据库是存储数据的仓库，可以将数据进行有序的分门别类的存储。

* MongDB数据库下载地址:https://www.mongodb.com/download-center/community

### Mongoose第三方包

* 是哟个node.ja操作数据库需要依赖node.js第三方包mongoose
* 下载：npm install mongoose-->在database这个文件夹下
* 启动mongodb:net start mongodb

### 创建集合

* 创建集合分为两步

  * 一是对集合设定规则
  * 二是创建集合，创建mongoose.Schema构造函数的实例即可创建集合

  ```
  // 2.创建集合规则
      // 创建集合规则，用mongoose下面的Schema构造函数来创建
      const mongooseSchema=new mongoose.Schema({
          // 集合具体的规则
          name:String,
          author:String,
          isPublished:Boolean
      });
  //3.使用集合规则创建集合
      // 使用规则创建集合，mongoose.model创建集合
      // 第一个参数是集合的名称，规定首字母大写，输出的时候起的集合的名字实际上是courses
      // 第二个参数是创建的集合规则
      // 他的返回值实际上是集合的构造函数
      let Course=mongoose.model('Course',mongooseSchema)
  ```

  

### 创建文档

* 就是向集合中插入数据
  * 创建集合实例
  * 调用实例对象下的save方法将数据保存到数据库中

  #### 方法1:

  ```
const course=new Course({
        name:'LEH',
        author:'leh',
        isPublished:'true'
    });
  ```

#### 方法2：

```
Course.create({
        name:'LEH',
        author:'leh',
        isPublished:'true'
    },(error,result)=>{
        console.log(result);
        console.log(error);
    })
```

* create()方法放回的也是promise对象
  * 支持异步函数
  * 可以用then()来返回成功值，catch()返回失败的值

```
 Course.create({
        name:'L',
        author:'l',
        isPublished:'true'
    }).then(result=>console.log(result))
    .catch(error=>console.log(error));
```



### 连接数据库、创建集合、文档代码

```
// 1.连接数据库
    // 引入第三方模块
    const mongoose=require('mongoose');
    mongoose.connect('mongodb://localhost/playground')
            .then(()=>console.log('数据库连接成功'))
            .catch((err)=>console.log(err,'数据库连接失败'));
// 2.创建集合规则
    // 创建集合规则，用mongoose下面的Schema构造函数来创建
    const mongooseSchema=new mongoose.Schema({
        // 集合具体的规则
        name:String,
        author:String,
        isPublished:Boolean
    });
//3.使用集合规则创建集合
    // 使用规则创建集合，mongoose.model创建集合
    // 第一个参数是集合的名称，规定首字母大写，输出的时候起的集合的名字实际上是courses
    // 第二个参数是创建的集合规则
    // 他的返回值实际上是集合的构造函数
    let Course=mongoose.model('Course',mongooseSchema)
//4.创建文档
    //方法1：
    // course就是要插入的数据
    const course=new Course({
        name:'LEH',
        author:'leh',
        isPublished:'true'
    });
    //方法2：====>不用save()数据就能保存到数据库
    // 第一个参数就是要向集合中插入的文档
    // 第二个参数是一个回调函数
    // Course.create({
    //     name:'LEH',
    //     author:'leh',
    //     isPublished:'true'
    // },(error,result)=>{
    //     console.log(result);
    //     console.log(error);
    // })
    // Course.create({
    //     name:'L',
    //     author:'l',
    //     isPublished:'true'
    // }).then(result=>console.log(result))
    // .catch(error=>console.log(error));
//5.将当前文档插入数据库中
    // 将course的数据保存到数据库
    course.save();
```

* 关于数据库的所有操作都是异步操作

### mongodb数据库==>插入文档

* 将mongodb数据库的安装目录添加到系统的可执行模块中

* 命令：mongoimport -d 数据库名称 -c 集合名称 --file 要导入的数据文件=>将数据导入到那个数据库，数据库集合名称是什么，要导入的文件是什么

### mongodb数据库==>查询文档

```
//根据数据库查找文档（条件为空标识查找所有文档）
Course.find().then(result=>console.log(result));
```

```
// 1.连接数据库
    // 引入第三方模块
    const mongoose=require('mongoose');
    mongoose.connect('mongodb://localhost/playground')
            .then(()=>console.log('数据库连接成功'))
            .catch((err)=>console.log(err,'数据库连接失败'));
// 2.创建集合规则
    const mongooseSchema=new mongoose.Schema({
        // 集合具体的规则
        name:String,
        age:Number,
        hobbies:[String]
    });
//3.使用集合规则创建集合
    let User=mongoose.model('User',mongooseSchema)
//4.创建文档
    User.create(
        [{
            name:'张三',
            age:18,
            hobbies:['read','pingpang','basketball']

        },
        {
            name:'李四',
            age:58,
            hobbies:['smile','eat','basketball']

        },
        {
            name:'王五',
            age:38,
            hobbies:['food','drink','basketball']

        }
        ]
    )
// 5.查询
  //find()返回的是一个数组
    //查询用户集合中的所有结果
    // User.find().then(result=>console.log(result)); 

    // 查询_id字段为5e96e86ae0a00741e0f42959的结果
    // User.find({_id: '5e96e86ae0a00741e0f42959'}).then(result=>console.log(result));

    // 按年龄字段查询，查找年龄大于20，小于40的数据
    // User.find({age:{$gt:20,$lt:40}}).then(result=>console.log(result));

    // 按hobbies字段查找，查找包含simle的数据
    // User.find({hobbies:{$in:['smile']}}).then(result=>console.log(result));

    // 选择要查询的字段,查询name age 不查询_id
    // User.find().select('name age -_id').then(result=>console.log(result));

    // 按照年龄升序排列
    // User.find().sort('age').then(result=>console.log(result));
    // 按照年龄降序排列
    // User.find().sort('-age').then(result=>console.log(result));
    
    // skip跳过多少条数据，limit限制查询数量
    User.find().skip(2).limit(2).then(result=>console.log(result));


  //findOne返回一条文档，默认返回当前集合中的第一条文档，是一个对象
    // User.findOne({name:'李四'}).then(result=>console.log(result));
    
```

### mongodb数据库==>删除文档

```
 User.findOneAndDelete({查询条件}).then(result=>console.log(result));
```



```
// 1.连接数据库
    // 引入第三方模块
    const mongoose=require('mongoose');
    mongoose.connect('mongodb://localhost/playground')
            .then(()=>console.log('数据库连接成功'))
            .catch((err)=>console.log(err,'数据库连接失败'));
// 2.创建集合规则
    const mongooseSchema=new mongoose.Schema({
        // 集合具体的规则
        name:String,
        age:Number,
        hobbies:[String]
    });
//3.使用集合规则创建集合
    let User=mongoose.model('User',mongooseSchema);
// 4.删除文档
  //findOneAndDelete删除一个文档
  // 如果查找到匹配的多个文档，那么将删除第一个匹配的文档
    //删除_id字段为5e96e86ae0a00741e0f42959
    // User.findOneAndDelete({
    //     _id:'5e96e86ae0a00741e0f42959'
    // }).then(result=>console.log(result));

   // deleteMany删除多个文档
     //删除User里的所有文档
    //   User.deleteMany({}).then(result=>console.log(result));
    //删除age为18的所有文档
    User.deleteMany({
        age:18
    }).then(result=>console.log(result));
```

### mongodb数据库==>更新文档

```
 User.updateOne({查询条件},{要修改的值}).then(result=>console.log(result));
```

```
User.updateMany({查询条件},{要修改的值}).then(result=>console.log(result));
```

```
// 1.连接数据库
    // 引入第三方模块
    const mongoose=require('mongoose');
    mongoose.connect('mongodb://localhost/playground')
            .then(()=>console.log('数据库连接成功'))
            .catch((err)=>console.log(err,'数据库连接失败'));
// 2.创建集合规则
    const mongooseSchema=new mongoose.Schema({
        // 集合具体的规则
        name:String,
        age:Number,
        hobbies:[String]
    });
//3.使用集合规则创建集合
    let User=mongoose.model('User',mongooseSchema);
// 4.删除文档
    //updateOne()，更新一个.返回值是一个promise对象，对象包含是否修改成功的信息
    // 如果有多个匹配值，那么修改第一个
    // User.updateOne({name:'李四'},{name:'王二'}).then(result=>console.log(result));

    // updateMany更新多个文档，返回值是一个promise对象
    User.updateMany({name:'李四',age:38},{name:'王二',age:28}).then(result=>console.log(result));
        
```

### mongoose验证

* 在创建集合规则时，可以设置当前字段的验证规则，验证失败就插入失败
* mongoose验证：
  * required：true==>必传字段
  * minlength:数字==>字符串最小长度
  * maxlength:数字==>字符串最大长度
  * trim:true==>去除字符串两端的空格
  * min:数字==>最小数值
  * max:数字==>最大数值
  * validate：自定义验证器

```
// 1.连接数据库
    // 引入第三方模块
    const mongoose=require('mongoose');
    mongoose.connect('mongodb://localhost/playground')
            .then(()=>console.log('数据库连接成功'))
            .catch((err)=>console.log(err,'数据库连接失败'));
// 2.创建集合规则
    // 创建集合规则，用mongoose下面的Schema构造函数来创建
    const mongooseSchema=new mongoose.Schema({
        // 集合具体的规则
        title:{
            type:String,
            required:[true,'不传文章标题的文档插入不成功'],
            minlength:[5,'标题长度不能低于5'],
            maxlength:[30,'标题长度不能超过30'],
            trim:[true,'去除了字符串两端的空格']
        },
        author:String,
        isPublished:Boolean,
        age:{
            type:Number,
            min:[12,'年龄小于12，不符合验证规则'],
            max:[70,'年龄大于70，不符合验证规则']
        }，
       
    });
// 3.使用集合规则创建集合
let Article=new mongoose.model('Article',mongooseSchema);
// 4.创建文档
    // 符合验证规则的文档会继续添加到数据库，不符合验证规则的就不添加了
Article.create({
    title:'那些年我们一起追过的女孩',
    author:'小花',
    isPublished:true,
    age:11
},
{
    title:'那些年我们一起追过的男孩',
    author:'小黄',
    isPublished:true,
    age:13

},
{
    title:'那些年aaaa',
    author:'花花',
    isPublished:false,
    age:20

},
{
    title:'aaaaa',
    author:'哈哈哈',
    isPublished:true,
    age:90
    
}).then(result=>console.log(result))
```

### 集合关联

* 通常不同的集合之间是有关系的，例如文章信息和用户信息存储在不同集合中，但文章是莫格用户发表的，要查询文章的所有信息包括发表用户，就需要用到集合关联。

```
// 需求：在文章集合中author存储用户集合的name
// 1.连接数据库
    // 引入第三方模块
    const mongoose=require('mongoose');
    mongoose.connect('mongodb://localhost/playground')
            .then(()=>console.log('数据库连接成功'))
            .catch((err)=>console.log(err,'数据库连接失败'));
// 2.创建集合规则
    // 创建用户集合规则，用mongoose下面的Schema构造函数来创建
    const UserSchema=new mongoose.Schema({
        // 集合具体的规则
        name:{
            type:String,
            required:true
        }
    });
    // 创建文章集合规则
    const Post=new mongoose.Schema({
        title:{
            type:String,
            required:true
        },
        author:{
            // 获取id
            type:mongoose.Schema.Types.ObjectId,
            // 关联的集合
            ref:'User'
        }
    })
// 3.使用集合规则创建集合
    let user=new mongoose.model('User',UserSchema);
    let post=new mongoose.model('Post',Post);

// 4.创建文档
    //创建用户
    user.create({name:'小花花'}).then(result=>console.log(result));
    // 创建文章
    post.create({title:'那些年',author:'5e9824300831ca4430b2ef9e'});
    post.find().populate('author').then(result=>console.log(result));

```

## 模板引擎

* 模板引擎是第三方模块，让开发者更加友好的方式拼接字符串，使代码项目更加清晰，更加易于维护
* 模板的后缀为.art

### art-template模板引擎

* 下载：在命令行工具中使用npm install art-template
* 使用const template=require('art-template')引入模板引擎
* 告诉模板引擎要拼接的数据和模板在哪里 const html =template('模板路径'，数据);

```
template('模板文件的绝对路径',{
// 这里写的内容就是要在模板当中要展示的内容==>在.art文件中通过{{对象的键}}来获取对象的值
})
```

```
//01app.js中
// 导入模板引擎,用于拼接字符串
const template=require('art-template');
const path=require('path');
/*
得到views文件夹的下index.art文件的路径==>path.join进行路径拼接
1.__dirname得到的是当前文件所在目录
*/
const views=path.join(__dirname,'views','01index.art')
/*
    1.参数1是模板引擎的路径==>写绝对路径
    2.参数2是要在模板当中要展示的内容
    这里的返回值是拼接好的字符串
*/
const html=template(views,{
    // 这里写的内容就是要在模板当中要展示的内容==>在index.art文件中通过{{键}}获取模板引擎中（当前）的内容
name:'张三',
age:18,
content:`<h1>我是htm标签</h1>`
});

console.log(html)

```



```
//在01index.art文件中
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <!-- 标准语法 -->
    {{name}}
    {{1+3}}
    {{age}}
    <!-- 将html标签渲染到浏览器 -->
    {{@content}}

    <!-- 原始语法 -->
    <%=name%>
    <%=1+4%>
    <%=age%>
    <!-- 将html标签渲染到浏览器 -->
    <%-content%>
</body>
</html>
```

### 模板引擎语法

* art-template同时支持两种模板语法：标准语法、原始语法
* 标准语法优点：
  * 可以让模板更容易读写

* 原始语法优点：
  * 具有强大的逻辑处理能力

#### 模板引擎语法输出

* 标准语法：
  * {{数据}}==>{{name}}

* 原始语法：
  * <%=数据%>==><%=name%>

#### 原文输出

* 如果数据中携带html标签，默认模板引擎不会解析标签，会将其转译后输出

* 标准语法：
  * {{@数据}}==>  {{@content}}   ==>content的值是一个html标签
* 原始语法：
  * <%-数据%>==>	<%-content%>    ==>content的值是一个html标签

### 条件判断语法

* 在模板中可以根据条件来决定显示哪块html代码

* 标准语法

  ```
  {{if条件}}...{{/if}}
  {{if v1}}...{{else if v2}}...{{/if}}
  ```

  ```
  {{if age>20}}
      条件是年龄大于的显示20，显示模板对象的内容age={{age}}
     {{else if age<15}} 
     条件判断年龄小于15的输出  {{age}}
     {{else}}
     条件不满足走else  age={{age}}
  {{/if}}
  
  ```
  
  
  
* 原始语法

  ```
  <%条件语句{%>输出内容<%}%>
  <%if(value){%>...<%}%>
  ```

  ```
      <!-- 原始语法 -->
      <% if (age>20){%>
          条件是年龄大于的显示20
      <%}else if(age<12){%>
          条件是年龄小于的显示12
      <%}else{%>
          不符合条件
      <%}%>
  ```

### 循环语法

```
//app.js
const html=template(views,{
    // 这里写的内容就是要在模板当中要展示的内容==>在index.art文件中通过{{键}}获取模板引擎中（当前）的内容
users:[
    {name:'露娜',
    age:17,
    sex:'女'
    },
    {
    name:'李四',
    age:24,
    sex:'男'

    },
    {
    name:'王五',
    age:25,
    sex:'男'
    }
]
});
```

```
//index.art
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
     <!-- 标准语法 -->
    <ul>
        <!-- 开始循环users这个数组, ,循环一次生成一个li标签-->
        {{each users}}
            <li>
                {{$value.name}}
                {{$value.age}}
                {{$value.sex}}

            </li>
        {{/each}}
    </ul>
    <!-- 原始语法 -->
    <ul>
        <% for (var i=0;i<users.length;i++){%>
            <li>
                <!-- 要输出就要写  = -->
                <%=users[i].name%>
                <%=users[i].age%>
                <%=users[i].sex%>

            </li>
        <%}%>

    </ul>
</body>
</html>
```



### 子模版语法

* 使用子模版可以将网站公共区块(头部、底部)抽离到单独文件中

* 标准语法：

  * {{include '模板路径'}}

    ```
     //在index.art文件中
     {{include './common/header.art'}}
     {{msg}}
     {{include './common/footer.art'}}
    ```

* 原始语法：

  * <%include('模板路径')%>

    ```
    <%include('./common/header.art')%>
    <%=msg%>
    <%include('./common/footer.art')%>
    ```

### 模板继承

* 使用模板继承可以将网站html骨架抽离到单独的文件中，其他页面模板可以继承骨架文件

* 在模板中预留坑==>{{block  '坑的名字'}}用来填写当前页面的私有信息

* 怎么继承模板

  * ```
    {{extend '继承模板的路径'}}
    ```

* 怎么填充模板里面的内容

  * ```
    {{block 'head'}}<link rel="stylesheet" href='custom.css'>{{/block}}
    ```

```
//layout.art
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML骨架</title>
    //预留坑，方便别的模板来填充
    {{block 'head'}}{{/block}}   
</head>
<body>
   {{block 'content'}}{{/block}}
</body>
</html>
```

```
//05app.js
// 导入模板引擎,用于拼接字符串
const template=require('art-template');
const path=require('path');
/*
得到views文件夹的下index.art文件的路径==>path.join进行路径拼接
1.__dirname得到的是当前文件所在目录
*/
const views=path.join(__dirname,'views','05index.art')
/*
    1.参数1是模板引擎的路径==>写绝对路径
    2.参数2是要在模板当中要展示的内容
    这里的返回值是拼接好的字符串
*/
const html=template(views,{
    // 这里写的内容就是要在模板当中要展示的内容==>在index.art文件中通过{{键}}获取模板引擎中（当前）的内容
msg:'我是首页'
});

console.log(html)

```



```
//05index.art
{{extend './common/layout.art'}}
//往layout.art 里面的head填充内容
// block标记可以填充当前模板特有的内容
    {{block 'head'}}{{msg}}{{/block}}  
   {{block 'content'}}我是内容{{/block}}


```



### 模板配置

*  下载模块：npm install dateformat

* 向模板中导入变量template.defaults.imports.变量名=变量值

* 设置模板根目录template.defaults.root=根目录

* 设置模板默认后缀template.defaults.extname='.art'

  ```
  //06app.js
  // 导入模板引擎,用于拼接字符串
  const template=require('art-template');
  const path=require('path');
  const dateFormat=require('dateformat');
  /*
      1.参数1是模板引擎的路径==>写绝对路径
      2.参数2是要在模板当中要展示的内容
      这里的返回值是拼接好的字符串
  */
  // 导入模板变量,第一个dateFormate是自定义名称
  template.defaults.imports.dateFormat=dateFormat;
  // 设置模板根目录
  template.defaults.root=path.join(__dirname,'views')
  // 设置默认模板后缀
  template.defaults.extname='.art'
  // 第一个参数是模板的名字，因为设置了默认模板后缀，所以不需要写后缀了
  const html=template('06index',{
      // 这里写的内容就是要在模板当中要展示的内容==>在index.art文件中通过{{键}}获取模板引擎中（当前）的内容
  msg:'我是首页',
  time:new Date()
  });
  
  console.log(html)
  
  ```

  ```
  //06index.art
  {{dateFormat(time,'yyyy-mm-dd')}}
  ```

  