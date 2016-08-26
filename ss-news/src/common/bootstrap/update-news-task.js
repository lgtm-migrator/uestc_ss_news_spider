import crontab from 'node-crontab';
import log4js from 'log4js';

let log = log4js.getLogger();

let updateNewsJob = async() => {
    await think.http("/home/official/updatenews", true);
}

crontab.scheduleJob("*/10 * * * *", updateNewsJob);

if (think.env === "development") {
    updateNewsJob();
}