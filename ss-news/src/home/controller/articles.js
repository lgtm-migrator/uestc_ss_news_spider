'use strict';

import Base from './base.js';

export default class extends Base {
    // path = "/articles/get"
    * getAction() { // 加上"*" 表示可重入
        let articles = this.model("articles");
        let data = yield articles.find(this.param("id")); //交给数据库处理
        this.json(data);
    }
}