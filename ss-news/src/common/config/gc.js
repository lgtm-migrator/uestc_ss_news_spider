export default {
    on: true, //是否开启垃圾回收处理
    interval: 3600, // 处理时间间隔，默认为一个小时
    filter: function() { //如果返回 true，则进行垃圾回收处理
        return true;
    }
};