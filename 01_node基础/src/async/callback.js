// //callback是一个形参
// function getData(callback){
//     // 调用下面的匿名函数,向里面传递一个实参
//     callback(123);
// }
// // 函数的实参是一个匿名函数，用一个形参来接收上面的实参
// getData(function(n){
//     console.log('callback函数被调用');
//     console.log(n);
// });


//callback是一个形参
function getData(callback){
    setTimeout(()=>{
        callback(
            '我是异步的哦'
        );
    },2000)
}
// 函数的实参是一个匿名函数，用一个形参来接收上面的实参
getData(function(data){
    console.log('callback函数被调用');
    console.log(data);
});