var express = require('express');
var router = express.Router();
var request = require('superagent');
var $ = require("cheerio");

router.get('/', function(req, res, next) {
    res.render('index', { title: 'SS-NEWS' });
});

router.get("/last", (req, res, next) => {
    request.get("http://www.ss.uestc.edu.cn/")
        .end((err, sres) => {
            if (err) next(err);
            var items = [];
            $("#last li", sres.text).each(function(idx, element) {
                var a = $('a', element);
                var span = $('span', element);
                items.push({
                    title: a.attr('title'),
                    href: a.attr('href'),
                    date: span.text()
                });
            });
            res.json(items);
        })
});

module.exports = router;
