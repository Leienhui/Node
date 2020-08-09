const express=require('express');
const admin=express.Router();
admin.get('/admin',(req,res)=>{
    res.send('welcome to admin');
});
// 导出路由admin
module.exports=admin;