let {SUFFIXES , MAX_SIZE} = require('./const')

/**
 * @descriptioin 校验后缀
 * @param {*} suffix 
 * @returns 
 */
function checkSuffix(suffix){
    return SUFFIXES[suffix]
}


/**
 * @descriptioin 校验文件大小
 * @param {*} size 
 * @returns boolean
 */
function checkSize(size){
    return size <= MAX_SIZE
}

module.exports = {
    checkSuffix,
    checkSize
}