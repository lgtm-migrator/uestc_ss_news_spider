"use strict"

import Base from './base.js';

// 爬虫Service
var reptileService = think.service("reptile");

export default class extends Base {

    init(http) {
        super.init(http); //调用父类的init方法  

    }

    async recentidAction() {
        let url = this.param("url");
        let reptileService = think.service("reptile");
        let data = await reptileService.recentid();
        this.json({
            resultid: data
        });
    }

    async articlejsonAction() {
        let url = this.param("url");
        let reptileService = think.service("reptile");
        let data = await reptileService.parse_article(url);
        this.json(data);
    }

    async officiallistAction() {
        let page = this.param("page") || 1;
        let list = await reptileService.official_list(page);
        this.json(list);
    }

    async updatenewsAction() {
        let result = await reptileService.update_news();
        this.json(result);
    }
}