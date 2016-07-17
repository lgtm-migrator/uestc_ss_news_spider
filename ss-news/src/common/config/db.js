'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
    type: 'mysql',
    connectionLimit: 5,
    log_connect: true,
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