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
