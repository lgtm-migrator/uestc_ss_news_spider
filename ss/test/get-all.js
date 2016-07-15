var Sequelize = require("sequelize");
var lib = require("../lib");
var sequelize = new Sequelize('mysql://ss:ss-admin@suntao.science:3306/ss');
var async = require("async");

sequelize
    .authenticate()
    .then(function(err) {
        console.log('Connection has been established successfully.');
    })
    .catch(function(err) {
        console.log('Unable to connect to the database:', err);
    });

var article = sequelize.define("article", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    title: Sequelize.STRING,
    content: Sequelize.TEXT,
    type: Sequelize.STRING,
    author: Sequelize.STRING,
    publisher: Sequelize.STRING,
    readnum: Sequelize.INTEGER,
    pubtime: Sequelize.STRING
});

var types = ["/notice.do", "/news.do", "/introduce.do", "/teachersList.do", "/research.do", "/info.do", "/international.do", "/friends.do", "/download.do"]
var ids = [];
for (var id = 3396; id > 0; id--) ids.push(id);
article.sync({
    force: true
}).then(function() {
    async.eachSeries(ids, (id, cb) => {
        async.eachSeries(types, (type, tcb) => {
            lib.parse_article("http://www.ss.uestc.edu.cn" + type + "?id=" + id, (result) => {
                if (result && result.content != "" && result.id) {
                    article.create(result).then(() => {
                        cb();
                    })
                } else tcb();
            });
        }, () => {
            cb();
        })
    }, function done() {

    });


});