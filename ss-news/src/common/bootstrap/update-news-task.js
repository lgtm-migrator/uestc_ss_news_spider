import crontab from 'node-crontab';
import log4js from 'log4js';

let log = log4js.getLogger();

let fn = async() => {
    await think.http("/home/official/updatenews", true);
}

let updatenews = crontab.scheduleJob("0 */1 * * *", fn);