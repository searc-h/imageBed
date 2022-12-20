/* 全局常量 */
const HOST = 'localhost'            //服务器地址
const PORT = 8080                   //端口号
const SUFFIXES = {                  //合法后缀
    png:true,
    jpg:true,
    jpeg:true,
    bmp:true,
    webp:true,
    gif:true
}
const MAX_SIZE = 20480              //文件大小上限
const IMAGE_URL = 'img'             //图片url前缀
const IMAGE_DIRECTORY = './imgs'    //本地保存图片路径

module.exports = {
    HOST,
    PORT,
    SUFFIXES,
    MAX_SIZE,
    IMAGE_URL,
    IMAGE_DIRECTORY
}