const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const {dbConnectionInfo} = require('./config');
global.Buffer = global.Buffer || require('buffer').Buffer;
const { listenPort } = require('./config');

// console.log(decode('hello'));
// 全局异常处理
process.on('uncaughtException', (err) => {
    console.log(err);
});
// 浏览器引用
let window;

// 本地服务器
let web_server = express();
web_server.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://pc.washingpatrick.cn:88");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else next();
});
web_server.use(cookieParser());
// var compression = require('compression');
// web_server.use(compression());
web_server.use(session({
    secret: 'session',
    resave: true,
    saveUninitialized: true
}));
web_server.use(bodyParser.json());
web_server.use(bodyParser.urlencoded({extended: true}));
web_server.listen(listenPort);

console.log('[server] listen: '+listenPort)
console.log('[server] server is running ......');
let get20_cache=[]
let get20_connection = mysql.createConnection(dbConnectionInfo);
get20_connection.query(`select movie_key, movie_rating, movie_name, movie_poster, movie_casts, movie_directors, movie_genres, movie_year from filmstable limit 20`, (err, t) => {
                if (err) {
                    console.log('Get 20 films sql error',err);
                    get20_connection.end();
                }
                get20_connection.end();
                t.map((item) => {
                    get20_cache.push({
                        key:item.movie_key,
                        title:item.movie_name,
                        poster:item.movie_poster,
                        casts:item.movie_casts,
                        directors:item.movie_directors,
                        genres:item.movie_genres,
                        pubdate:item.movie_year,
                        rating:item.movie_rating
                    });
                });
    })
console.log('[server] get20_cache completed');

let get_cache=[]
let get_connection = mysql.createConnection(dbConnectionInfo);
get_connection.query(`select movie_key, movie_rating, movie_name, movie_poster, movie_casts, movie_directors, movie_genres, movie_year from filmstable`, (err, t) => {
                if (err) {
                    console.log('Get films sql error',err);
                    get_connection.end();
                }
                get_connection.end();
                t.map((item) => {
                    get_cache.push({
                        key:item.movie_key,
                        title:item.movie_name,
                        poster:item.movie_poster,
                        casts:item.movie_casts,
                        directors:item.movie_directors,
                        genres:item.movie_genres,
                        pubdate:item.movie_year,
                        rating:item.movie_rating
                    });
                });
    })
console.log('[server] get_cache completed');
/*
   movie_key            int auto_increment,
   movie_name           varchar(100),
   movie_id             int,
   movie_poster         varchar(500),
   movie_casts          varchar(500),
   movie_countries      varchar(50),
   movie_directors      varchar(50),
   movie_duration       varchar(50),
   movie_genres         varchar(50),
   movie_languages      varchar(50),
   movie_pubdate        varchar(50),
   movie_rating         varchar(50),
   movie_summary        varchar(1000),
   movie_year           varchar(50),
*/
function getClientIp(req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
}

//Details

web_server.post('/request/films/details', (req, res) => {
    console.log('[web_server] POST: /request/films/details '+req.body.key);
    console.log(getClientIp(req));
    let connection = mysql.createConnection(dbConnectionInfo);
    // console.log(req.ip);
    let args = req.body;
    // console.log(args);
    if (!Number.isInteger(args.key) || Number(args.key)>10000 || Number(args.key)<0){
      return res.json({
        success:false,
        message:'FUCK OFF'
      })
    }
    connection.query(`select movie_key, movie_countries, movie_languages, movie_writers, movie_pubdate, movie_summary, movie_rating, movie_name, movie_duration, movie_poster, movie_casts, movie_directors, movie_genres, movie_year from filmstable where movie_key = ?`, args.key, (err, t) => {
        if (err) {
            console.log('Get details films sql error',err);
            connection.end();
            return res.json({success: false});
        }
        connection.end();
        // console.log(t);
        t.map((item) => {
            return res.json({
                success: true,
                key:item.movie_key,
                countries:item.movie_countries,
                title:item.movie_name,
                poster:item.movie_poster,
                casts:item.movie_casts,
                languages:item.movie_languages,
                directors:item.movie_directors,
                writers:item.movie_writers,
                genres:item.movie_genres,
                pubdate:item.movie_year,
                rating:item.movie_rating,
                duration:item.movie_duration,
                summary:item.movie_summary
            });
        });
    })
});

web_server.post('/request/films/get20', (req, res) => {
    console.log('[web_server] POST: /request/films/get20');
    console.log(getClientIp(req));
    // let connection = mysql.createConnection(dbConnectionInfo);
    // console.log(req.ip);
    // let args = req;
    // console.log(args);
    return res.json({
      success:true,
      data:get20_cache
    })
    // connection.query(`select movie_key, movie_rating, movie_name, movie_poster, movie_casts, movie_directors, movie_genres, movie_year from filmstable limit 20`, (err, t) => {
    //             if (err) {
    //                 console.log('Get 20 films sql error',err);
    //                 connection.end();
    //                 return res.json({success: false});
    //             }
    //             connection.end();
    //             let result = [];
    //             t.map((item) => {
    //                 result.push({
    //                     key:item.movie_key,
    //                     title:item.movie_name,
    //                     poster:item.movie_poster,
    //                     casts:item.movie_casts,
    //                     directors:item.movie_directors,
    //                     genres:item.movie_genres,
    //                     pubdate:item.movie_year,
    //                     rating:item.movie_rating
    //                 });
    //             });
    //             return res.json({
    //                     success: true,
    //                     data: result})
    // })
});

web_server.post('/request/count/get', (req, res) => {
    console.log('[web_server] POST: /request/count/get');
    console.log(getClientIp(req));
    let connection = mysql.createConnection(dbConnectionInfo);
    connection.query(`select rating, duration from counttable`, (err, t) => {
        if (err) {
            console.log('Get count sql error',err);
            connection.end();
            return res.json({success: false});
        }
        connection.end();
        t.map((item) => {
            return res.json({
                success: true,
                duration:item.duration,
                rating:item.rating
            });
        });
    })
});

web_server.post('/request/films/get', (req, res) => {
    console.log('[web_server] POST: /request/films/get');
    console.log(getClientIp(req));
    return res.json({
      success:true,
      data:get_cache
    })
    });
    // let connection = mysql.createConnection(dbConnectionInfo);
    // let args = req.body;

    // connection.query(`select movie_key, movie_rating, movie_name, movie_poster, movie_casts, movie_directors, movie_genres, movie_year from filmstable`, (err, t) => {
    //             if (err) {
    //                 console.log('Get all films sql error',err);
    //                 connection.end();
    //                 return res.json({success: false});
    //             }
    //             connection.end();
    //             let result = [];
    //             t.map((item) => {
    //               // console.log(item)
    //                 result.push({
    //                     key:item.movie_key,
    //                     title:item.movie_name,
    //                     poster:item.movie_poster,
    //                     casts:item.movie_casts,
    //                     directors:item.movie_directors,
    //                     genres:item.movie_genres,
    //                     pubdate:item.movie_year,
    //                     rating:item.movie_rating
    //                 });
    //             });
    //             return res.json({
    //                     success: true,
    //                     data: result})
    // })


