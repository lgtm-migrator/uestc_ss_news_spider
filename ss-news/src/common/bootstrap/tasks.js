import crontab from 'node-crontab';
import log4js from 'log4js';

let log = log4js.getLogger();
let reptile = think.service("reptile");

let updateNewsJob = async () => await think.http("/home/official/updatenews", true);

let getReadNumJob = async () => await reptile.refresh_readnum();

crontab.scheduleJob("*/10 * * * *", updateNewsJob);
crontab.scheduleJob("10 22 * * *", getReadNumJob);


// if (think.env === "development") {
//     updateNewsJob();
//     reptile.refresh_readnum();
// }
