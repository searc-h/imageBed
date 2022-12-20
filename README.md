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