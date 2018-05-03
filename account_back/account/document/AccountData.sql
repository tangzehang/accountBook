insert into T_account_type set account_type_name="现金",definedid=901,create_time=CURRENT_TIMESTAMP,
book_id=90001,positive=1;

insert into T_account set account_name="唐逗逗钱包",definedid=90101, create_time=CURRENT_TIMESTAMP ,
book_id=90001,account_type_id=901;
insert into T_account set account_name="詹逗逗钱包",definedid=90102, create_time=CURRENT_TIMESTAMP ,
book_id=90001,account_type_id=901;
insert into T_account set account_name="家庭公用",definedid=90103, create_time=CURRENT_TIMESTAMP ,
book_id=90001,account_type_id=901;
insert into T_account set account_name="其他现金",definedid=90104, create_time=CURRENT_TIMESTAMP , book_id=90001,
account_type_id=901;





insert into T_account_type set account_type_name="储蓄卡",definedid=902,create_time=CURRENT_TIMESTAMP,book_id=90001,positive=1;

insert into T_account set account_name="招商银行-唐",definedid=90201, create_time=CURRENT_TIMESTAMP ,
book_id=90001,account_type_id=902;
insert into T_account set account_name="平安银行-詹",definedid=90202, create_time=CURRENT_TIMESTAMP ,
book_id=90001,account_type_id=902;
insert into T_account set account_name="中国银行-詹",definedid=90203, create_time=CURRENT_TIMESTAMP ,
book_id=90001,account_type_id=902;



insert into T_account_type set account_type_name="信用卡",definedid=903,create_time=CURRENT_TIMESTAMP,book_id=90001,positive=1;

insert into T_account set account_name="招行信用卡-唐",definedid=90301, create_time=CURRENT_TIMESTAMP ,
book_id=90001,account_type_id=903;
insert into T_account set account_name="招行信用卡-詹",definedid=90302, create_time=CURRENT_TIMESTAMP ,
book_id=90001,account_type_id=903;
insert into T_account set account_name="花呗-詹",definedid=90303, create_time=CURRENT_TIMESTAMP ,
book_id=90001,account_type_id=903;
insert into T_account set account_name="花呗-唐",definedid=90304, create_time=CURRENT_TIMESTAMP ,
book_id=90001,account_type_id=903;


insert into T_account_type set account_type_name="网络账户",definedid=904,create_time=CURRENT_TIMESTAMP,
book_id=90001,positive=1;

insert into T_account set account_name="微信钱包-詹",definedid=90401, create_time=CURRENT_TIMESTAMP ,
book_id=90001,account_type_id=904;
insert into T_account set account_name="微信钱包-唐",definedid=90402, create_time=CURRENT_TIMESTAMP ,
book_id=90001,account_type_id=904;
insert into T_account set account_name="支付宝-詹",definedid=90403, create_time=CURRENT_TIMESTAMP ,
book_id=90001,account_type_id=904;
insert into T_account set account_name="支付宝-唐",definedid=90404, create_time=CURRENT_TIMESTAMP ,
book_id=90001,account_type_id=904;
insert into T_account set account_name="余额宝-詹",definedid=90405, create_time=CURRENT_TIMESTAMP ,
book_id=90001,account_type_id=904;
insert into T_account set account_name="余额宝-唐",definedid=90406, create_time=CURRENT_TIMESTAMP ,
book_id=90001,account_type_id=904;



insert into T_account_type set account_type_name="应收账款",definedid=905,create_time=CURRENT_TIMESTAMP,
book_id=90001,positive=1;
insert into T_account set account_name="小赖",definedid=90501, create_time=CURRENT_TIMESTAMP ,
book_id=90001,account_type_id=905;
insert into T_account set account_name="公司报销",definedid=90503, create_time=CURRENT_TIMESTAMP ,
book_id=90001,account_type_id=905;
insert into T_account set account_name="押金",definedid=90504, create_time=CURRENT_TIMESTAMP ,
book_id=90001,account_type_id=905;
insert into T_account set account_name="其他",definedid=90502, create_time=CURRENT_TIMESTAMP ,
book_id=90001,account_type_id=905;


insert into T_account_type set account_type_name="应付账款",definedid=906,create_time=CURRENT_TIMESTAMP,
book_id=90001,positive=1;
insert into T_account set account_name="其他",definedid=90601, create_time=CURRENT_TIMESTAMP ,
book_id=90001,account_type_id=906;
