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

        