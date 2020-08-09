// 通过模块的fs对模块进行引用
const fs=require('fs');
fs.readFile('./01.txt','utf8',(err,doc)=>{
    // 如果文件读取发生错误，参数err的值为错误对象，否则err的值为null
    // doc参数为文件内容
    if(err==null){
        console.log(doc);
    }
});