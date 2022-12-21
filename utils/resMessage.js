//构造返回结果
function resultMessage(code,message,data = null){
    return {
        code:code,
        message:message,
        data:data
    }
}

//正确返回结果
// function ok(){
//     return resultMessage(200,'ok')
// }

//带数据的正确返回结果
function okMes(data=null){
    if(data)
    return resultMessage(200,'ok',data)

    return resultMessage(200,'ok')
}

//错误返回结果
function errMes(message){
    return resultMessage(400,message)
}
module.exports = {
    okMes,
    errMes
}
