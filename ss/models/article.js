"use strict";

module.exports = function(sequelize, DataTypes) {
    var article = sequelize.define("article", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        title: DataTypes.STRING,
        content: DataTypes.TEXT,
        type: DataTypes.INTEGER,
        author: DataTypes.STRING,
        publisher: DataTypes.STRING,
        readnum: DataTypes.INTEGER,
        pubtime: DataTypes.STRING
    });
    return article;
};