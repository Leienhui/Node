// 导入模板引擎,用于拼接字符串
const template=require('art-template');
const path=require('path');
/*
得到views文件夹的下index.art文件的路径==>path.join进行路径拼接
1.__dirname得到的是当前文件所在目录
*/
const views=path.join(__dirname,'views','03index.art')
/*
    1.参数1是模板引擎的路径==>写绝对路径
    2.参数2是要在模板当中要展示的内容
    这里的返回值是拼接好的字符串
*/
const html=template(views,{
    // 这里写的内容就是要在模板当中要展示的内容==>在index.art文件中通过{{键}}获取模板引擎中（当前）的内容
users:[
    {name:'露娜',
    age:17,
    sex:'女'
    },
    {
    name:'李四',
    age:24,
    sex:'男'

    },
    {
    name:'王五',
    age:25,
    sex:'男'
    }
]
});

console.log(html)
