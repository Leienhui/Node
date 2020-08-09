// 引入fs
const fs =require('fs');
fs.writeFile('./01.txt','我是写入的内容',err=>{
    if(err!=null){
        // 写入失败
        return;
    }
    console.log('写入成功')
})