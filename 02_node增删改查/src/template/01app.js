// 导入模板引擎,用于拼接字符串
const template=require('art-template');
const path=require('path');
/*
得到views文件夹的下index.art文件的路径==>path.join进行路径拼接
1.__dirname得到的是当前文件所在目录
*/
const views=path.join(__dirname,'views','01index.art')
/*
    1.参数1是模板引擎的路径==>写绝对路径
    2.参数2是要在模板当中要展示的内容
    这里的返回值是拼接好的字符串
*/
const html=template(views,{
    // 这里写的内容就是要在模板当中要展示的内容==>在index.art文件中通过{{键}}获取模板引擎中（当前）的内容
name:'张三',
age:18,
content:`<h1>我是htm标签</h1>`
});

console.log(html)
