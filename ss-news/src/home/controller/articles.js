'use strict';

import Base from './base.js';
import request from 'request';
import cheerio from 'cheerio';

export default class extends Base {


    /**
     * 获取一篇文章   
     */
    async getAction() {
        // path = "/articles/get"
        // async同步 
        let articles = this.model("articles");
        let id = this.param("id");
        //交给数据库处理 处理完后再返回
        let data = await articles
            .cache(`article-get-${id}`, 24 * 3600)
            .find(this.param("id"));
        this.json(data);
    }


    /**
     * 获取一页文章列表
     */
    async getsAction() {
        // "/articles/gets"
        let page = this.param("page") || 1;
        let rows = this.param("rows") || 10;
        let articles = this.model("articles");
        let colname = this.param("col") || undefined;
        let colvalue = this.param("value") || undefined;
        let where = new Object()
        if (colname) where[colname] = colvalue;

        // 不包含content字段
        let data = await articles
            .cache(`article-gets-${page}-${rows}-${colname}-${colvalue}`, 600)
            .page(page, rows)
            .fieldReverse(["content"])
            .order("id desc")
            .where(where)
            .countSelect();
        this.json(data);
    }


    /**
     * 文章类型
     */
    async typesAction() {
        let articles = this.model("articles");
        let data = await articles
            .cache("types", 24 * 3600)
            .field(["type", "count(*) as total"])
            .group('type').select();
        this.json(data)
    }

    /**
     * 发布者种类
     */
    async publishersAction() {
        let articles = this.model("articles");
        let data = await articles
            .cache("publishers", 24 * 3600)
            .field(["publisher", "count(*) as total"])
            .group("publisher").select();
        this.json(data);
    }

}