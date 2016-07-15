var request = require('request');
var cheerio = require("cheerio");

module.exports = {
    // 格式化博客信息
    parse_article: (url, cb) => {
        var article = {}
        request(url, (err, res, body) => {
            try {
                if (err) console.log(err);
                console.log(url)
                var $ = cheerio.load(body, {
                    decodeEntities: false
                });
                article.id = url.split("id=")[1];
                article.type = $(".breadcrumbs > div:nth-child(1)").text().trim() + "-" + $(".span9 > div:nth-child(1) > h3:nth-child(1)").text();
                article.title = $(".blog > h3:nth-child(1)").text();
                article.pubtime = $(".inline > li:nth-child(1)").text().substr(5);
                article.publisher = $(".inline > li:nth-child(2)").text().substr(4)
                article.author = $(".inline > li:nth-child(3)").text().substr(3)
                article.readnum = $(".inline > li:nth-child(4)").text().substr(3);
                article.content = $(".contenttext").html().trim();
            } catch (e) {
                console.log("cheerio parse error")
            }

            if (cb) cb(article)
        });
    }
}