#### 获取publisher种类

```js
$.get("/articles/publishers",(articles,status)=>{
    console.log(articles);
})
```

```json
[{
    "publisher": "DA wizards工作室",
    "total": 4
}, {
    "publisher": "Firework工作室",
    "total": 3
}, // .......省略 
 {
    "publisher": "鲸鱼工作室",
    "total": 1
}]
```