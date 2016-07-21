import Base from './base';
import log4js from 'log4js';

var log = log4js.getLogger("content");


export default class extends Base {

    // 用于配置图片一类的资源
    indexAction() {
        this.redirect("http://www.ss.uestc.edu.cn/" + this.http.url)
    }

}