import crontab from 'node-crontab';
import log4js from 'log4js';

let log = log4js.getLogger();
let reptile = think.service("reptile");

let updateNewsJob = async () => {
    await think.http("/home/official/updatenews", true);
}

crontab.scheduleJob("*/10 * * * *", updateNewsJob);
crontab.scheduleJob("1 23 * * * ", reptile.refresh_readnum);

if (think.env === "development") {
    updateNewsJob();
    reptile.refresh_readnum();
}
