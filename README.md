## 图床应用Image Bed
> 本应用旨在搭建私人的图床服务，用`express` 和 `multer`库进行开发，并没有做相应的**CDN**和**负载均衡**

### 主要开发库
- [express](https://www.npmjs.com/package/express)
- [multer](https://www.npmjs.com/package/multer)

### 使用方式
*下载依赖*
```
npm install
```
*启动项目*
```
npm run dev
```
*本地访问地址*
```
http://localhost:8080/assets/
```

### 说明
- 感兴趣的可以对前端界面进行优化
- 单张图片最大5MB
- 提交确认后会自动跳转到浏览器的response界面，请注意截图或复制url


### 注意
> `readFile(filepath , callback)`是异步的任务，而`unlinkSync`是同步任务；需要注意**读取的文件**后再进行删除操作
```js

//删除文件函数
function deleteFile(file){
    console.log('删除文件：',file)
    fs.unlinkSync(file)
}

//正确的写法
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

//错误的写法（可能在某些环境下错误）
fs.readFile(tempFile,(err,data)=>{
    if(err){
        result.err = "图片保存错误！"
        flag = false
    }else{
        fs.writeFileSync(filePath,data)
    }
})
//删除缓存文件
deleteFile(tempFile)

// 报错：找不到tempFile 在readFile时
```