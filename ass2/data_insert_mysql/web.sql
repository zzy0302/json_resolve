create user 'webass3'@'%' identified by 'zheshimima';

grant all privileges on *.* to 'webass3'@'%';

flush privileges;

drop database if exists webdb;

create database webdb DEFAULT CHARACTER SET utf8;

use  webdb;

drop table if exists filmstable;

drop table if exists counttable;

/*==============================================================*/
/* table: filmstable                                            */
/*==============================================================*/
create table filmstable
(
   movie_key            int auto_increment,
   movie_name           varchar(300),
   movie_id             int,
   movie_poster         varchar(500),
   movie_casts          varchar(1000),
   movie_countries      varchar(50),
   movie_directors      varchar(50),
   movie_duration       varchar(100),
   movie_genres         varchar(50),
   movie_languages      varchar(50),
   movie_pubdate        varchar(50),
   movie_rating         varchar(50),
   movie_writers        varchar(500),
   movie_summary        varchar(1500),
   movie_year           varchar(50),
   primary key (movie_key)
)
auto_increment = 1;

/*==============================================================*/
/* table: counttable                                            */
/*==============================================================*/
create table counttable
(
   id                   int auto_increment,
   rating               float,
   duration             float,
   primary key (id)
)
auto_increment = 1;
