# WEB第三次作业

## 文件结构

目录树:
├── LICENSE
├── README.md
├── config.js
├── main.js
├── node_modules
├── package-lock.json
├── package.json
└── yarn.lock

## 简介:

- config.js:后端配置文件,包含数据库连接配置、端口监听设置
- main.js:后端主要代码

## 用法:

安装:

```
npm install
```

启动:

```
npm start
```

### API:

地址:pc.washingpatrick.cn:88/request/films/details

说明:

根据传入参数在数据库中搜索电影的详情

传入参数：

key:电影id

返回json:({success: true,
                key:movie_key,
                countries:movie_countries,
                title:movie_name,
                poster:movie_poster,
                casts:movie_casts,
                languages:movie_languages,
                directors:movie_directors,
                writers:movie_writers,
                genres:movie_genres,
                pubdate:movie_year,
                rating:movie_rating,
                duration:movie_duration,
                summary:movie_summary})

---

地址:pc.washingpatrick.cn:88/request/films/get20

说明:返回电影列表前20条数据

返回json:({key:movie_key,
                           title:movie_name,
                           poster:movie_poster,
                           casts:movie_casts,
                           directors:movie_directors,
                           genres:movie_genres,
                           pubdate:movie_year,
                           rating:movie_rating})

---

地址:pc.washingpatrick.cn:88/request/films/get

说明:返回所有电影列表数据

返回json:({key:movie_key,
                           title:movie_name,
                           poster:movie_poster,
                           casts:movie_casts,
                           directors:movie_directors,
                           genres:movie_genres,
                           pubdate:movie_year,
                           rating:movie_rating})

