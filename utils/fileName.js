/**
 * 
 * @description 指定长度随机小写字母字符串
 * @param {*} len 
 * @returns 
 */
function randomStr(len){
    let name = ''
    while(len-- > 0){
        name += String.fromCharCode(Math.floor(Math.random() * 26) + 97)
    }
    return name
}

/**
 * 
 * @description 获取随机文件名（当前时间戳-六位随机字符串）
 * @param {*} len 
 * @returns 
 */
function generateRandomFileName(){
    let name = ''
    name += new Date().getTime()
    name += '-' + randomStr(5)
    return name
}

module.exports = {
    randomStr,
    generateRandomFileName
}