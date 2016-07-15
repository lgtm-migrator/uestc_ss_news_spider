/*
Navicat SQLite Data Transfer

Source Server         : ss-news
Source Server Version : 20817
Source Host           : :0

Target Server Type    : SQLite
Target Server Version : 20817
File Encoding         : 65001

Date: 2016-07-15 14:33:08
*/

PRAGMA foreign_keys = OFF;

-- ----------------------------
-- Table structure for notice
-- ----------------------------
DROP TABLE "main"."notice";
CREATE TABLE "notice" (
"id"  INTEGER NOT NULL,
"title"  TEXT,
"content"  TEXT,
"type"  INTEGER,
"author"  TEXT,
"publisher"  TEXT,
"readnum"  INTEGER,
"pubtime"  TEXT,
PRIMARY KEY ("id")
);
