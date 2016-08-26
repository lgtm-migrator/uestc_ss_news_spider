"use strict"
import Base from './base';
import log4js from 'log4js';
import request from "request-promise"

var log = log4js.getLogger("content");


export default class extends Base {

    /** 
     * 用于配置图片一类的资源
     * 在开发模式下
     * 自动重定向到官网
     * 在生产模式下
     * 在反向代理设定代理
     */
    async indexAction() {
        this.redirect("http://www.ss.uestc.edu.cn/" + this.http.url)
    }

}