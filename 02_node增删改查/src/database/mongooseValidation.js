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
        age:{
            type:Number,
            min:[12,'年龄小于12，不符合验证规则'],
            max:[70,'年龄大于70，不符合验证规则']
        },
        publishDate:{
            type:Date,
            default:Date.now
            },
        category:{
            type:String,
            enum:{
                values:['html','css','javascript','node.js'],
                message:'分类名称要在enum内才可以'
            }
        },
      author:{
          type:String,
            //   自定义验证规则   validate：自定义验证器，validator,message都是规定好的
          validate:{
              validator:v=>{
                //   返回布尔值
                // v是要验证的值
                // true表示验证成功，false表示验证失败
                console.log(v);
                return v&&v.length>2;
              },
            // 自定义错误信息
            message:'传入的值不符合验证规则'
          
          }
      }  
    });
// 3.使用集合规则创建集合
let Article=new mongoose.model('Article',mongooseSchema);
// 4.创建文档
    // 符合验证规则的文档会继续添加到数据库，不符合验证规则的就不添加了
    // enum:枚举：例举出当前字段拥有的一些值
Article.create(
    {
    title:'那些年我们一起追过的女孩',
    author:'小花11111111',
    age:11,
    category:'html'
},
{
    title:'那些年我们一起追过的男孩',
    author:'小黄aaaa',
    age:13,
    category:'javascript'

},
{
    title:'那些年aaaa',
    author:'花花哈哈哈哈哈',
    age:20

},
{
    title:'aaaaa',
    author:'哈哈哈',
    age:90
    
}).then(result=>console.log(result))
// 获取每个字段的错误信息
  .catch(error=>{
    //   获取错误信息对象
      let err=error.errors;
    //   循环错误信息对象
      for (var attr in err) {
          console.log(err[attr]['message']);
      }
  })
// Article.deleteMany().then(result=>console.log(result));