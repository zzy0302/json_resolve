# WEB 作业

---

### 1652782 张智源

- 第二次作业为[ass1][https://github.com/zzy0302/json_resolve/tree/master/ass1]
- 第三次作业为[ass2][https://github.com/zzy0302/json_resolve/tree/master/ass2]
- 第三次作业[在线地址][pc.washingpatrick.cn:88]

## 第三次作业简介:

#### 数据库:

mysql 8.0

简单的写了个爬虫，用于修复失效的图片链接，详细参见[data_insert_mysql][https://github.com/zzy0302/json_resolve/tree/master/ass2/data_insert_mysql]

[数据库设计][https://github.com/zzy0302/json_resolve/blob/master/ass2/data_insert_mysql/web.sql]

#### 后端:

nodejs+express

基本的数据库连接，遵循restful风格的接口设计，详细参见[back_end][https://github.com/zzy0302/json_resolve/tree/master/ass2/back_end]

### 前端:

基于React&ant.design组件,

功能介绍:

点击首栏:
		电影可搜索,评分可排序,类型可筛选,导演和主演可搜索;
	点击电影海报或者电影名称可查看详情;
	点击外部元素可关闭电影详情;
	下方分页可点击'···'跳转至受显示最大限制的下一页;
	可点击右下角菜单,选择一页展示多少条目;
	加入了页面大小自适应,此部分使用原生js完成,没有轮子自己造!
	源Json文件的部分图片链接由于豆瓣原因已失效,已重新爬取修复.

