var lib = require("../lib");

lib.parse_article("http://www.ss.uestc.edu.cn/notice.do?id=" + 3396, (result) => {
    console.log(result)
});
console.log(lib.parse_article_sync("http://www.ss.uestc.edu.cn/notice.do?id=" + 3379))