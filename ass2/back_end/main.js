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
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else next();
});
web_server.use(cookieParser());
web_server.use(session({
    secret: 'session',
    resave: true,
    saveUninitialized: true
}));
web_server.use(bodyParser.json());
web_server.use(bodyParser.urlencoded({extended: true}));
web_server.listen(listenPort);
console.log('[server] server is running ......');
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

web_server.post('/request/films/get20', (req, res) => {
    console.log('[web_server] POST: /request/films/get20');
    let connection = mysql.createConnection(dbConnectionInfo);
    let args = req;
    console.log(args);
    connection.query(`select movie_key, movie_rating, movie_name, movie_poster, movie_casts, movie_directors, movie_genres, movie_year from filmstable limit 20`, (err, t) => {
                if (err) {
                    console.log('Get 20 films sql error');
                    connection.end();
                    return res.json({success: false});
                }
                connection.end();
                let result = [];
                t.map((item) => {
                  // console.log(item)
                    result.push({
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
                return res.json({
                        success: true,
                        data: result})
    })
});

web_server.post('/request/films/get', (req, res) => {
    console.log('[web_server] POST: /request/films/get');
    let connection = mysql.createConnection(dbConnectionInfo);
    let args = req.body;
    connection.query(`select movie_key, movie_rating, movie_name, movie_poster, movie_casts, movie_directors, movie_genres, movie_year from filmstable`, (err, t) => {
                if (err) {
                    console.log('Get all films sql error');
                    connection.end();
                    return res.json({success: false});
                }
                connection.end();
                let result = [];
                t.map((item) => {
                  // console.log(item)
                    result.push({
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
                return res.json({
                        success: true,
                        data: result})
    })
});
//教务端/新建课程信息 finished
// web_server.post('/request/class/create', (req, res) => {
//     console.log('[web_server] POST: /request/class/create');
//     let args = req.body;
//     let connection = mysql.createConnection(dbConnectionInfo);
//     let op = ({
//         id: decode(args.user),
//         opstatus: 0,
//         description: `新建课程信息`
//     });
//     opInsert(op);
//     if ( decode(args.user).length !== 2 ){
//         op.opstatus = 2;
//         opInsert(op);
//         console.log('Create class confirm failed.');
//         return res.json({
//             success: false,
//             illegal: true
//         });
//     }
//     else{
//         setTimeout(()=>{
//         let p = [];
//         p.push(args.cday);
//         p.push(args.cstarttime + ':00');
//         p.push(args.cendtime + ':00');
//         let finished = false;
//         let tmax = -1;
//         let sqlsecond = 'select MAX(tslotid) as tid from timeslottable';
//         let conflict = false;
//         let searchtime = [args.cstarttime, args.cstarttime];
//         let timenumber = searchtime[0].split(':');
//         timenumber[0] = (parseInt(timenumber[0]) + 1).toString();
//         searchtime[0] = timenumber.join(':');
//         let sqltr = `select campus, day, starttime, endtime from timeslottable natural join classtable where uuid = ${args.uuid} and day like '%${args.cday}%' `
//             + `and cstatus = true and starttime between '${searchtime[0] + ':00'}' and '${searchtime[1] + ':00'}' `;
//         setTimeout(() => {
//             let sqlforth = `insert into timeslottable values ( null, '${p[0]}', '${p[1]}', '${p[2]}')`;
//             connection.query(sqlforth, (err, r) => {
//                 //console.log(sqlforth);
//                 if (err) {
//                     console.log('Create class timeslot sql error');
//                     connection.end();
//                     op.opstatus = 2;
//                     opInsert(op);
//                     return res.json({
//                         success: false,
//                         areyousure: false,
//                         illegal: false
//                     });
//                 }
//             });
//         }, 100);
//         setTimeout(() => {
//             connection.query(sqlsecond, (err, retc) => { //查询当前最大tslotid
//                 if (err) {
//                     console.log('Create class get max timeslot sql error');
//                     connection.end();
//                     op.opstatus = 2;
//                     opInsert(op);
//                     return res.json({
//                         success: false,
//                         areyousure: true,
//                         illegal: false
//                     });
//                 }
//                 retc.map((t) => {
//                     tmax = t.tid;
//                     //console.log(tmax);
//                 });
//             });
//         }, 300);
//         //查询该老师有无冲突时间段的课程
//         setTimeout(() => {
//             connection.query(sqltr, (err, r) => {
//                 if (err) {
//                     console.log('Create class Check time conflict sql error');
//                     op.opstatus = 2;
//                     opInsert(op);
//                     return res.json({
//                         success: false,
//                         areyousure: false,
//                         illegal: false
//                     });
//                 }
//                 if (r !== []) {
//                     conflict = true;
//                 }
//             });
//         }, 400);
//         setTimeout(() => {
//             if (conflict === true && args.makesure === false) {//冲突且未确定
//                 op.opstatus = 2;
//                 opInsert(op);
//                 return res.json({
//                     success: false,
//                     areyousure: false,
//                     illegal: false
//                 });
//             }
//             else {
//                 let sql = 'insert into classtable( cid, cname, ctype, uuid, tslotid, ccost, campus, croom, cstartdate, cenddate, ccapacity) ' +
//                     'values( null, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
//                 let params = [];
//                 params.push(args.cname);
//                 params.push(args.ctype);
//                 params.push(args.uuid);
//                 params.push(tmax);
//                 params.push(args.ccost);
//                 params.push(args.campus);
//                 params.push(args.croom);
//                 params.push(args.cstartdate);
//                 params.push(args.cenddate);
//                 params.push(args.ccapacity);
//                 //console.log(params);
//                 connection.query(sql, params, (err) => {
//                     if (err) {
//                         connection.end();
//                         console.log('zz');
//                         op.opstatus = 2;
//                         opInsert(op);
//                         return res.json({
//                             success: false,
//                             areyousure: true,
//                             illegal: false
//                         });
//                     }
//                     setTimeout(()=>{
//                         connection.end();
//                         op.opstatus = 1;
//                         opInsert(op);
//                         return res.json({
//                             success: true,
//                             areyousure: true,
//                             illegal: false
//                         })
//                     },100);
//                 });
//             }
//         }, 1000);
//         },100);
//     }
// });
// //教务端/关闭课程 finished
// web_server.post('/request/class/close', (req, res) => {
//     console.log('[web_server] POST: /request/class/close');
//     let args = req.body;
//     let connection = mysql.createConnection(dbConnectionInfo);
//     let idList = '';
//     args.cids.map((cid, no) => {
//         if (no === args.cids.length - 1)
//             idList += cid;
//         else
//             idList += `${cid},`;
//     });
//     let op = ({
//         id: decode(args.user),
//         opstatus: 0,
//         description: `关闭${idList}课程`
//     });
//     opInsert(op);
//     if ( decode(args.user).length !== 2 ){
//         op.opstatus = 2;
//         opInsert(op);
//         return res.json({
//             success: false,
//             illegal: true
//         });
//     }
//     else {
//         let sql = `update classtable set cstatus = false where cid in (${idList})`;
//         connection.query(sql, (err) => {
//             if (err) {
//                 connection.end();
//                 op.opstatus = 2;
//                 opInsert(op);
//                 return res.json({
//                     success: false,
//                     illegal: false
//                 });
//             }
//             setTimeout(()=>{
//                 connection.end();
//                 op.opstatus = 1;
//                 opInsert(op);
//                 return res.json({
//                     success: true,
//                     illegal: false
//                 });
//             },100);
//         });
//     }
// });

