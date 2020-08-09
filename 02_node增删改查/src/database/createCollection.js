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