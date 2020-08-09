// 导入模板引擎,用于拼接字符串
const template=require('art-template');
const path=require('path');
const dateFormat=require('dateformat');
/*
    1.参数1是模板引擎的路径==>写绝对路径
    2.参数2是要在模板当中要展示的内容
    这里的返回值是拼接好的字符串
*/
// 导入模板变量,第一个dateFormate是自定义名称
template.defaults.imports.dateFormat=dateFormat;
// 设置模板根目录
template.defaults.root=path.join(__dirname,'views')
// 设置默认模板后缀
template.defaults.extname='.art'
// 第一个参数是模板的名字，因为设置了默认模板后缀，所以不需要写后缀了
const html=template('06index',{
    // 这里写的内容就是要在模板当中要展示的内容==>在index.art文件中通过{{键}}获取模板引擎中（当前）的内容
msg:'我是首页',
time:new Date()
});

console.log(html)
