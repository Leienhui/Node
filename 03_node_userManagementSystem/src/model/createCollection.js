const mongoose=require('mongoose')
// 创建用户集合规则
const DatabaseConnection=require('./DatabaseConnection.js');
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:2,
        maxlength:20
    },
    age:{
        type:Number,
        min:1,
        max:100
    },
    hobbies:Array,
    password:String,
})
// 创建集合
const user=mongoose.model('User',userSchema);
// 将user集合导出给其他文件使用
module.exports=user;