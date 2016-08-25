'use strict';
/**
 * config
 */
export default {
    host: "127.0.0.1",
    route_on: true,
    resource_on: true,
    resource_reg: /^(static\/|[^\/]+\.(?!js|html)\w+$)/,
    log_error: true, //是否打印错误日志
    log_request: true //是否打印请求的日志
};