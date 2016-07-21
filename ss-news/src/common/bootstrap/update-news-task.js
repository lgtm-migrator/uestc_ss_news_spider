import crontab from 'node-crontab';
import log4js from 'log4js';
let log = log4js.getLogger();

let fn = async() => {
    await think.http("/home/official/updatenews", true);
    log.debug("完成一次更新操作")
}

let updatenews = crontab.scheduleJob("*/15 * * * *", fn);