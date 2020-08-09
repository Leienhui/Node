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



    
        