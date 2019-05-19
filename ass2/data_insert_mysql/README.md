# WEB第三次作业

## 文件结构

目录树:
├── README.md
├── download_img.py
├── films.json
├── fixjson.py
├── insert.py
├── insert.sql
├── qwq.json
├── rbqwq.py
└── web.sql

## 简介:

- download_img.py:下载图片文件到本地
- fixjson.py:读取qwq.json;从豆瓣重新爬取图片url;存入新qwq.json
- rbqwq.py:正则匹配豆瓣图片url
- insert.py:从qwq.json生成插入数据库的insert.sql
- web.sql:创建用户、创建数据库、创建表