var request = require('request');
var cheerio = require("cheerio");

module.exports = {
    // 格式化博客信息
    parse_article: (url, cb) => {
        var article = {}
        request(url, (err, res, body) => {
            var $ = cheerio.load(body, {
                decodeEntities: false
            })
            article.title = $(".blog > h3:nth-child(1)").text();
            article.pubtime = $(".inline > li:nth-child(1)").text().substr(5);
            article.publisher = $(".inline > li:nth-child(2)").text().substr(4)
            article.author = $(".inline > li:nth-child(3)").text().substr(3)
            article.readnum = $(".inline > li:nth-child(4)").text().substr(3);
            article.content = $(".contenttext").html().trim();
            if (cb) cb(article)
        });
    }
}