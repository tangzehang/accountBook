CREATE DATABASE IF NOT EXISTS account;
USE account;


DROP TABLE IF EXISTS `T_book_model`;
create table if not exists `T_book_model`(
id	int unsigned not null auto_increment,
model_name varchar(40) not null comment '账本模板名称' ,
message varchar(100) null comment '备注' ,
create_time timestamp  not null DEFAULT CURRENT_TIMESTAMP comment '创建时间',
update_time timestamp  not null default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP comment '更新时间',
createuser_id int unsigned default 0 not null comment '创建用户ID',
definedid  bigint unsigned default 0 not null comment '创建标识',
primary key(id),
unique key(definedid)
)comment '账本模板表' engine=InnoDB default charset=utf8 ;


DROP TABLE IF EXISTS `T_book`;
create table if not exists `T_book`(
id	int unsigned not null auto_increment,
book_name varchar(40) not null comment '账本名称' ,
book_model_id int unsigned default 0 not null comment '账本模板ID',
message varchar(100)  null comment '备注' ,
create_time timestamp  not null DEFAULT CURRENT_TIMESTAMP comment '创建时间',
update_time timestamp  not null DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP comment '更新时间',
createuser_id int unsigned default 0 not null comment '创建用户ID',
definedid  bigint unsigned default 0 not null comment '创建标识',
primary key(id),
unique key(definedid)
)comment '账本表' engine=InnoDB default charset=utf8 ;


DROP TABLE IF EXISTS `T_user`;
create table if not exists `T_user`(
id	int unsigned not null auto_increment,
user_name varchar(40) not null comment '用户名' ,
password varchar(100) null comment '密码' ,
message varchar(100)  null comment '备注' ,
create_time timestamp  not null DEFAULT CURRENT_TIMESTAMP comment '创建时间',
update_time timestamp  not null DEFAULT CURRENT_TIMESTAMP  ON UPDATE CURRENT_TIMESTAMP comment '更新时间',
belong_books varchar(100) not null comment '所属账本' ,
primary key(id)
)comment '用户表' engine=InnoDB default charset=utf8 ;



DROP TABLE IF EXISTS `T_account`;
create table if not exists `T_account`(
id	int unsigned not null auto_increment,
book_id int unsigned default 0 not null comment '账本ID',
account_name varchar(40) not null comment '账户名称' ,
account_type_id int unsigned default 0 not null comment '账户类型ID',
message varchar(100)  null comment '备注' ,
create_time timestamp  not null DEFAULT CURRENT_TIMESTAMP comment '创建时间',
update_time timestamp  not null DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP comment '更新时间',
createuser_id int unsigned default 0 not null comment '创建用户ID',
definedid  bigint unsigned default 0 not null comment '创建标识',
primary key(id),
unique key(book_id,definedid)
)comment '账户表' engine=InnoDB default charset=utf8 ;


DROP TABLE IF EXISTS `T_account_type`;
create table if not exists `T_account_type`(
id	int unsigned not null auto_increment,
book_id int unsigned default 0 not null comment '账本ID',
account_type_name varchar(40) not null comment '账户类型名称' ,
positive int unsigned default 0 not null comment '账户资产负债属性，0：负债，1：资产',
message varchar(100)  null comment '备注' ,
create_time timestamp  not null DEFAULT CURRENT_TIMESTAMP comment '创建时间',
update_time timestamp  not null DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP comment '更新时间',
createuser_id int unsigned default 0 not null comment '创建用户ID',
definedid  bigint unsigned default 0 not null comment '创建标识',
primary key(id),
unique key(book_id,definedid)
)comment '账户类型表' engine=InnoDB default charset=utf8 ;



DROP TABLE IF EXISTS `T_record`;
create table if not exists `T_record`(
id	int unsigned not null auto_increment,
book_id int unsigned default 0 not null comment '账本ID',
type_id int unsigned default 0 not null comment '分类ID',
operator_type int unsigned default 0 not null comment '记录操作类型，1：支出，2：收入，3：转账，4：还款，5：借贷，6：代付，7：报销，8：退款，9：余额',
from_account_type_id int unsigned default null comment '操作账户类型ID 1',
from_account_id int unsigned default null comment '操作账户ID 1',
to_account_type_id int unsigned default null comment '操作账户类型ID 2',
to_account_id int unsigned default null comment '操作账户ID 2',
total_num decimal(12,4) not null default 0 comment '流水记录金额',
is_del tinyint(2) not null default 0 comment '是否删除',
message varchar(100)  null comment '备注' ,
createuser_id int unsigned default 0 not null comment '创建用户ID',
fromuser_id int unsigned default 0 not null comment '消费用户id',
record_time int DEFAULT 0 comment '流水记录日期',
create_time timestamp  not null DEFAULT CURRENT_TIMESTAMP comment '创建时间',
update_time timestamp  not null DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP comment '更新时间',
definedid  bigint unsigned default 0 not null comment '创建标识',
primary key(id),
unique key(book_id,definedid)
)comment '流水记录表' engine=InnoDB default charset=utf8 ;


DROP TABLE IF EXISTS `T_first_type`;
create table if not exists `T_first_type`(
id	int unsigned not null auto_increment,
book_id int unsigned default 0 not null comment '账本ID',
type_name varchar(40) not null comment '类型名称' ,
message varchar(100)  null comment '备注' ,
category int not null comment '1表示指出分类，2表示收入分类',
createuser_id int unsigned default 0 not null comment '创建用户ID',
create_time timestamp  not null  DEFAULT CURRENT_TIMESTAMP comment '创建时间',
update_time timestamp  not null DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP comment '更新时间',
definedid  bigint unsigned default 0 not null comment '创建标识',
primary key(id),
unique key(book_id,definedid,category)
)comment '第一层分类' engine=InnoDB default charset=utf8 ;




DROP TABLE IF EXISTS `T_second_type`;
create table if not exists `T_second_type`(
id	int unsigned not null auto_increment,
book_id int unsigned default 0 not null comment '账本ID',
type_name varchar(40) not null comment '类型名称' ,
first_type_id int unsigned default 0 not null comment '第一层分类ID',
message varchar(100)  null comment '备注' ,
category int not null comment '1表示指出分类，2表示收入分类',
createuser_id int unsigned default 0 not null comment '创建用户ID',
create_time timestamp  not null DEFAULT CURRENT_TIMESTAMP comment '创建时间',
update_time timestamp  not null DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP comment '更新时间',
definedid  bigint unsigned default 0 not null comment '创建标识',
primary key(id),
unique key(book_id,definedid,category)
)comment '第二层分类' engine=InnoDB default charset=utf8 ;







