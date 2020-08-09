const express=require('express');
const home=express.Router();
home.get('/home',(req,res)=>{
    res.send('welcome to home');
});
// 导出路由home
module.exports=home;