'use strict';

import Base from './base.js';
import request from 'request';
import cheerio from 'cheerio';

export default class extends Base {
    // path = "/articles/get"
    * getAction() { // 加上"*" 表示可重入
        let articles = this.model("articles");
        let data = yield articles.find(this.param("id")); //交给数据库处理
        this.json(data);
    }

    lastAction() {
        let url = "http://www.ss.uestc.edu.cn/find.do";
        request({
            url: url,
            method: "POST",
            headers: {
                'Referer': 'http://www.ss.uestc.edu.cn/',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36'
            },
            form: {
                keyword: "%",
                page: this.param("page") || 1
            }
        }, (err, res, body) => {
            if (err) throw err;
            let $ = cheerio.load(body, {
                decodeEntities: false
            });
            let idarr = {};
            $(".span10  ul li h5 a").each((idx, ele) => {
                idarr[ele.attribs.title] ="http://www.ss.uestc.edu.cn/"+ ele.attribs.href;
            })
            this.json({
                data: idarr
            })
        })
    }
}