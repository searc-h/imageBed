
var express = require('express')
var multer = require('multer')
let {HOST , PORT , IMAGE_URL,IMAGE_DIRECTORY} = require('./utils/const')
let {okMes  , errMes} = require('./utils/resMessage')
let  {checkSuffix ,checkSize} = require('./utils/checkFile')
let {randomStr , generateRandomFileName} = require('./utils/fileName')
const crawler = require('crawler-request');

var fs = require('fs')

var app = express()
var upload = multer({//设置文件缓存地址 （二进制文件）
    dest:'./temp'
})

app.all("*", (req, res, next) => {
    // 开启跨域
    res.setHeader("Access-Control-Allow-Credentials", "true");
    const origin = req.get("Origin");
    // 允许的地址 http://127.0.0.1:9000 这样的格式
    if (origin) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }
    // 允许跨域请求的方法
    res.setHeader(
      "Access-Control-Allow-Methods",
      "POST, GET, OPTIONS, DELETE, PUT"
    );
    // 允许跨域请求 header 携带哪些东西
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, If-Modified-Since"
    );
    next();
})

app.use('/img', express.static('./imgs'))    //配置静态资源

app.use('/assets',express.static('assets'))  


//删除文件
function deleteFile(file){
    console.log('删除文件：',file)
    fs.unlinkSync(file)
}



//接受单个文件
app.post('/upload/singleImage',upload.single('file'),(req,res)=>{

    console.log(req.file)

    let file = req.file

    if(file == undefined){
        res.send(errMes('未检测到文件！'))
        res.end()
        return
    }


    let suffix = file.originalname.split('.').reverse()[0]

    let originalName = file.fieldname + "." + suffix


    //校验文件后缀
    if(!checkSuffix(suffix)){
        res.send(errMes('图片格式错误！'))
        res.end()
        return
    }

    //校验文件名称格式
    if(originalName.split('.').length != 2){
        res.send(errMes('图片名称格式错误！'))
        res.end()
        return
    }


    //校验文件大小
    if(!checkSize(file.size)){
        res.send(errMes('图片过大！请确保图片大小在5M以内！'))
        res.end()
        return
    }


    //暂存图像二进制文件路径
    let tempFile = file.path

    let fileName = generateRandomFileName();
    let fullFileName = `${fileName}.${suffix}`
    let filePath = `${IMAGE_DIRECTORY}/${fullFileName}`

    // 读取二进制文件
    fs.readFile(tempFile,(err,data)=>{
        if(err){
            res.send(errMes('图片保存错误！'))
            res.end()
            return
        }
        // 往/imgs文件夹中 存放 二进制转换后的图像文件
        fs.writeFileSync(filePath,data)
        deleteFile(tempFile)
    })

    //构造url并返回
    let url = `http://${HOST}:${PORT}/${IMAGE_URL}/${fullFileName}`
    res.send(okMes(url))
    res.end()

    return
})

//接收多个文件
app.post('/upload/multiImages',upload.array('files',9),(req,res)=>{
    
    res.set({
      'content-type': 'application/json; charset=utf-8'
    })

    let files = req.files

    if(files == undefined){
        res.send(errMes('未接收到文件！'))
        res.end()
        return
    }

    //返回结果集
    let results = []

    //遍历处理文件
    for(let idx in files){
        let file = files[idx]
        let tempFile = file.path
        let result = {
            name:file.originalname,
            url:'',
            err:''
        }
        results[idx] = result
        
        let suffix = file.originalname.split('.').reverse()[0]

        let originalName = file.fieldname + "." + suffix
        
        if(originalName.split('.').length != 2){
            result.err = '图片名称格式错误！'
            deleteFile(tempFile)
            continue
        }

        if(!checkSuffix(suffix)){
            result.err = '图片类型错误！'
            deleteFile(tempFile)
            continue
        }

        //校验文件大小
        if(!checkSize(file.size)){
            result.err = '图片过大！请确保图片大小在5MB以内！'
            deleteFile(tempFile)
            continue
        }

        //转存文件

        let fileName = generateRandomFileName();
        let fullFileName = `${fileName}.${suffix}`
        let filePath = `${IMAGE_DIRECTORY}/${fullFileName}`

        let flag = true
        fs.readFile(tempFile,(err,data)=>{
            if(err){
                result.err = "图片保存错误！"
                flag = false
            }else{
                fs.writeFileSync(filePath,data)
                //删除缓存文件
                deleteFile(tempFile)
            }
        })


        //构造url并填写信息列表
        let url = `http://${HOST}:${PORT}/${IMAGE_URL}/${fullFileName}`
        
        if(flag){
            result.url = url
        }

        
    }

    //返回信息列表
    res.send(okMes(results))
    res.end()

    return
})


// 上传pdf 后解析pdf内容
app.post('/upload/pdf',upload.single('file'), function (req, res, next) {

    let file = req.file

    if(file == undefined){
        res.send(errMes('未检测到文件！'))
        res.end()
        return
    }


    let suffix = file.originalname.split('.').reverse()[0]

    let originalName = file.fieldname + "." + suffix

     //暂存二进制文件路径
     let tempFile = file.path

     let fileName = generateRandomFileName();
     let fullFileName = `${fileName}.${suffix}`
     let filePath = `${IMAGE_DIRECTORY}/${fullFileName}`
 
     // 读取二进制文件
     fs.readFile(tempFile,(err,data)=>{
         if(err){
             res.send(errMes('文件保存错误！'))
             res.end()
             return
         }
         // 往/imgs文件夹中 存放 二进制转换后的图像文件
         fs.writeFileSync(filePath,data)
         deleteFile(tempFile)
     })
 
     //构造url并返回
     let url = `http://${HOST}:${PORT}/${IMAGE_URL}/${fullFileName}`
     crawler(url).then(function(response){
        // handle response
        console.log("解析pdf")
         console.log(response.text);
         res.end(response.text)
    });
   
     return
})

let server = app.listen(PORT,()=>{
    console.log(`picture hosting service is listening on port ${PORT} and click:  http://localhost:8080/assets`)
})