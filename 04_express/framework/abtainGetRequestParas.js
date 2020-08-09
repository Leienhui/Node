const express=require('express');
const app=express();

app.get('/index',(req,res)=>{
    res.send(req.query)
})
app.listen(14008);
console.log('ok')