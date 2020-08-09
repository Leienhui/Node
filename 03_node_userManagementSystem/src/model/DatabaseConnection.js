// 导入第三方模块(要先下载)
const mongoose=require('mongoose');
// 数据库连接,27017是数据库的默认端口
// 第二个参数可传可不传
mongoose.connect('mongodb://localhost:27017/userManagerSystem',{ useNewUrlParser: true })
        .then(()=>console.log('数据库连接成功'))
        .catch(()=>console.log('数据库连接失败'))
module.exports=mongoose;