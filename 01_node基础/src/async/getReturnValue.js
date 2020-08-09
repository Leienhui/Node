//异步
// function getMsg(){
//     setTimeout(()=>{
//         return {
//             msg:'hello'
//         }
//     },2000);
// }
// const msg=getMsg();
// console.log(msg);


function getMsg(n1,n2){
        return n1+n2;
}
const msg=getMsg(10,20);
console.log(msg);