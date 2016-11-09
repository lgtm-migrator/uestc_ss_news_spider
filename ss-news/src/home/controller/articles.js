'use strict';

import Base from './base.js';
import request from 'request';
import cheerio from 'cheerio';

export default class extends Base {

    init(http) {
        super.init(http);
        this.article_table = this.model("articles");
        this.read_num_table = this.model("readnum");
    }


    /**
     * @api {all} /articles/get/id/{id} Get An Article Detail
     * @apiGroup articles
     * @apiParam {number} id the article id
     * @apiSuccessExample {json} Success Example
     * {
    "author": "",
    "content": "省略",
    "id": 4635,
    "img": "/content/uploads/1/image/public/201611/20161102112029_mgow7pn52r.png",
    "publisher": "人才与国际交流办",
    "pubtime": "2016-11-02 11:20:51",
    "readnum": 11,
    "title": "2017年春季韩国仁川大学交换生项目报名通知",
    "type": "通知公告与动态-人才与国际交流办公室"
}
     *
    **/
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
     * @api {all} /articles/gets[/page/{page}][/rows/{rows}][/col/{col}][/value/{value}] Get Articles List
     * @apiGroup articles
     * @apiParam {int} page option, page number, default is page 1
     * @apiParam {int} rows option, articles per page, default is 10 articles per page
     * @apiParam {string} col option, use it with field value, like sql " where {col} = {value}"
     * @apiParam {string} value option, the value of col must match
     * @apiDescription You can use it simplely. like "get /articles/gets/page/3/rows/20" . This api will return a json object, contain some table info and a articles list(without content)
     * 
    **/
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
            .group("title")
            .fieldReverse(["content"])
            .order("id desc")
            .where(where)
            .countSelect();
        this.json(data);
    }


    /**
     * @api {all} /articles/type Articles Types
     * @apiDescription 文章类型
     * @apiGroup articles
     * @apiSuccessExample {json} Success Example
     * [
    {
        "total": 8,
        "type": "新闻中心-党建新闻"
    },
    {
        "total": 4,
        "type": "通知公告与动态-创新工坊"
    },
    {
        "total": 8,
        "type": "通知公告与动态-副教授"
    },
    {
        "total": 3,
        "type": "通知公告与动态-办事流程"
    },
    {
        "total": 1,
        "type": "通知公告与动态-学生出国"
    }
    // 省略
    ]
     *
    **/
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

    /**
     * @api {all} /articles/mostread[/type/{type}][/page/{page}] Most Read Articles
     * @apiGroup articles
     * @apiParam {string} type option, when "type == 'all'", return most readed articles in history, otherwise return last month most readed articles
     *
    **/
    async mostreadAction() {
        let view = this.param("type") == "all" ? "read_most_in_history" : "read_most_in_this_month";
        let page = this.param('page') || 0;
        let perpage = 10;
        let data = await this.model()
            .query(`select * from ${view} limit ${page * perpage},${perpage}`)
        this.json(data);
    }


    /**
     * @apiDescription 返回最近带有图片的文章
     * @api {all} /articles/recentimg[/limit/{limit}] Recent Article With Img
     * @apiName Recent Article With Img
     * @apiGroup articles
     * 
     * @apiParam limit option, 声明返回的记录条数
     * 
     **/
    async recentimgAction() {
        let limit = this.param('limit') || 15;
        let data = await this.model()
            .cache(`recent-img-${limit}`)
            .query(`select * from recent_articles_with_img limit 0,${limit}`);
        this.json(data);
    }

    /**
     * @api {all} /articles/readnumhis Article Read Number history
     * @apiGroup articles
     * @apiParam {int} id article id 
     * @apiParam {int} page option for page,default is 1 
     * @apiParam {int} rows rows per page,default is 10
     *
    **/
    async  readnumhisAction() {
        let arti_id = this.param("id");
        let page = this.param("page") || 1;
        let rows = this.param("rows") || 10;
        let data = { "error": "param error" };
        if (arti_id) {
            data = await this.read_num_table
                .cache(`read-num-history-${arti_id}-${page}-${rows}`)
                .page(page, rows)
                .where({ article_id: arti_id })
                .select()
        }
        this.json(data);
    }

}