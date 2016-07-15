"use strict";

module.exports = function(sequelize, DataTypes) {
    var article = sequelize.define("article", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        title: DataTypes.STRING(40),
        content: DataTypes.STRING(4000),
        type: DataTypes.STRING(40),
        author: DataTypes.STRING,
        publisher: DataTypes.STRING,
        readnum: DataTypes.INTEGER,
        pubtime: DataTypes.STRING
    });
    return article;
};