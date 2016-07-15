var request = require('request');
var cheerio = require("cheerio");

module.exports = {
    // 格式化博客信息
    parse_article: (url, cb) => {
        var article = {}
        request({
            url: url,
            headers: {
                'Referer': 'http://www.ss.uestc.edu.cn/',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36'
            }
        }, (err, res, body) => {
            try {
                if (err) console.log(err);
                console.log(url)
                var $ = cheerio.load(body, {
                    decodeEntities: false
                });
                article.id = parseInt(url.split("id=")[1]) || undefined;
                article.type = $(".breadcrumbs > div:nth-child(1)").text().trim() + "-" + $(".span9 > div:nth-child(1) > h3:nth-child(1)").text();
                article.title = $(".blog > h3:nth-child(1)").text();
                article.pubtime = $(".inline > li:nth-child(1)").text().substr(5);
                article.publisher = $(".inline > li:nth-child(2)").text().substr(4)
                article.author = $(".inline > li:nth-child(3)").text().substr(3)
                article.readnum = parseInt($(".inline > li:nth-child(4)").text().substr(3)) || undefined
                article.content = $(".contenttext").html().trim();
            } catch (e) {
                console.log("cheerio parse error")
            }

            if (cb) cb(article)
        });
    }
}