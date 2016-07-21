"use strict"

import Base from './base';

export default class extends Base {

    indexAction() {
        this.display();
    }

    async pageAction() {
        let id = this.param("id") || 0;
        let articles = this.model("articles");
        let article = await articles.find(id);
        this.assign("article", article);
        this.display();
    }

}