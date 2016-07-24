#### 获取一页信息

```javascript
$.get("/articles/gets/page/1/rows/11",(articles,status)=>{
    console.log(articles);
})
```

```json
{
    "count":3031,"totalPages":276,"numsPerPage":11,"currentPage":1,
    "data": [{
        "id": 3409,
        "title": "信软学院暑期国际学堂圆满结课",
        "type": "新闻中心-学生新闻",
        "author": "",
        "publisher": "学生科",
        "readnum": 7,
        "pubtime": "2016-07-22 17:12:02",
        "img": "/content/uploads/1/image/....."
    },
    // ......省略
   ]
}
```