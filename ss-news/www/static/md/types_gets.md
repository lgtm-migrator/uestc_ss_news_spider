#### 获取文章种类

```js
$.get("/articles/types",(articles,status)=>{
    console.log(articles);
})
```

```json
[{
    "type": "新闻中心-学生新闻",
    "total": 10
},
// ......省略
 {
    "type": "通知公告与动态-通知公告",
    "total": 66
}, {
    "type": "通知公告与动态-院友动态",
    "total": 1
}, {
    "type": "通知公告与动态-首页",
    "total": 75
}]
```