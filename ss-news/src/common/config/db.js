'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
    type: 'mysql',
    connectionLimit: 5,
    log_connect: true,
    log_sql: false, //是否记录 sql 语句
    adapter: {
        mysql: {
            host: 'suntao.science',
            port: '3306',
            database: 'ss',
            user: 'ss',
            password: 'ss-admin',
            prefix: '',
            encoding: 'utf8'
        },
        mongo: {

        }
    }
};