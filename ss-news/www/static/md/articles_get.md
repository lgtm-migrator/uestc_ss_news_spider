#### 获取一条信息

```javascript
$.get("/articles/get/id/3409",(articles,status)=>{
    console.log(articles);
})
```

```json

{
    "id": 3409,
    "title": "信软学院暑期国际学堂圆满结课",
    "content": "<p style=\"text-indent....", // 省略
    "type": "新闻中心-学生新闻",
    "author": "",
    "publisher": "学生科",
    "readnum": 7,
    "pubtime": "2016-07-22 17:12:02",
    "img": "/content/uploads/1/image....."// 省略
}
```