create user 'webass3'@'%' identified by 'zheshimima';

grant all privileges on *.* to 'xiezixuan'@'%';

flush privileges;

drop database if exists webdb;

create database webdb;

use  webdb;

drop table if exists filmstable;


/*==============================================================*/
/* table: filmstable                                            */
/*==============================================================*/
create table filmstable
(
   key                  int auto_increment,
   movie_name           varchar(50) not null,
   movie_id             int not null,
   movie_poster         varchar(50) not null,
   movie_casts          varchar(255),
   movie_countries      varchar(50),
   movie_directors      varchar(50),
   movie_duration       int,
   movie_genres         varchar(50),
   movie_languages      varchar(50),
   movie_pubdate        varchar(50),
   movie_rating         int,
   movie_summary        varchar(255),
   movie_year           varchar(50),
   primary key (key)
)
auto_increment = 1;
