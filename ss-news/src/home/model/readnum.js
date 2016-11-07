'use strict';
/**
 * model
 */
export default class extends think.model.base {
  init(...args) {
    super.init(...args);
    this.tablePrefix = "";
    this.tableName = "read_records";
    this.pk = "id";
  }
}