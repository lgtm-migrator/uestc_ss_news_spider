'use strict';
/**
 * model
 */
export default class extends think.model.base {
    init(...args) {
        super.init(...args);
        this.tablePrefix = "";
        this.tableName = "articles";
        this.pk = "id";

    }
}