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
    