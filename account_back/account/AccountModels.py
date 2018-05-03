# -*- coding: utf-8 -*-
from django.db import models

class Common(object):
    definedId = models.BigIntegerField(db_column="definedid")
    userId = models.IntegerField(default=0, db_column="createuser_id")
    message = models.CharField(max_length=100)
    createTime = models.DateTimeField(auto_now_add=True, db_column="create_time")
    updateTime = models.DateTimeField(auto_now_add=True, db_column="update_time")
    def toDict(self):
        return {"definedId":self.definedId,"userId":self.userId, "message":self.message}

#模板类
class TBookModel(models.Model):
    definedId = models.BigIntegerField(db_column="definedid")
    userId = models.IntegerField(default=0, db_column="createuser_id")
    message = models.CharField(max_length=100)
    createTime = models.DateTimeField(auto_now_add=True, db_column="create_time")
    updateTime = models.DateTimeField(auto_now_add=True, db_column="update_time")
    name = models.CharField(max_length=40, db_column="model_name")

    class Meta:
        app_label = 'account'
        db_table = 'T_book_model'
        unique_together = ()
        index_together = ()
    def toDict(self):
        dic = {"name":self.name,"definedId":self.definedId,"userId":self.userId, "message":self.message, "id":self.id}
        return dic


#账本类
class TBook(models.Model):
    definedId = models.BigIntegerField(db_column="definedid")
    userId = models.IntegerField(default=0, db_column="createuser_id")
    message = models.CharField(max_length=100)
    createTime = models.DateTimeField(auto_now_add=True, db_column="create_time")
    updateTime = models.DateTimeField(auto_now_add=True, db_column="update_time")
    name = models.CharField(max_length=40, db_column="book_name")
    modelId = models.IntegerField(default=0, db_column="book_model_id")

    class Meta:
        app_label = 'account'
        db_table = 'T_book'
        unique_together = ()
        index_together = ()
    def toDict(self):
        dic = {"name":self.name, "modelId":self.modelId,"definedId":self.definedId,"userId":self.userId, "message":self.message, "id":self.id}
        return dic

#用户表
class TUser(models.Model):
    name = models.CharField(max_length=40, db_column="user_name")
    password = models.CharField(max_length=100, db_column="password")
    message = models.CharField(max_length=100, db_column="message")
    books = models.CharField(max_length=100, db_column="belong_books")
    createTime = models.DateTimeField(auto_now_add=True, db_column="create_time")
    updateTime = models.DateTimeField(auto_now_add=True, db_column="update_time")
    class Meta:
        app_label = 'account'
        db_table = 'T_user'
        unique_together = ()
        index_together = ()
    def toDict(self):
        return {"name":self.name,  "message":self.message, "books":self.books, "id":self.id, "definedId":self.id}


#账户类型表
class TAccountType(models.Model):
    definedId = models.BigIntegerField(db_column="definedid")
    userId = models.IntegerField(default=0, db_column="createuser_id")
    message = models.CharField(max_length=100)
    createTime = models.DateTimeField(auto_now_add=True, db_column="create_time")
    updateTime = models.DateTimeField(auto_now_add=True, db_column="update_time")
    bookId = models.IntegerField(default=0, db_column="book_id")
    name = models.CharField(max_length=40, db_column="account_type_name")
    positive = models.IntegerField(default=0, db_column="positive")#账户资产负债属性，0：负债，1：资产

    class Meta:
        app_label = 'account'
        db_table = 'T_account_type'
        unique_together = ()
        index_together = ()
    def toDict(self):
        dic = {"name":self.name, "positive":self.positive,"definedId":self.definedId,"userId":self.userId, "message":self.message, "id":self.id}
        return dic

#账户表
class TAccount(models.Model):
    definedId = models.BigIntegerField(db_column="definedid")
    userId = models.IntegerField(default=0, db_column="createuser_id")
    message = models.CharField(max_length=100)
    createTime = models.DateTimeField(auto_now_add=True, db_column="create_time")
    updateTime = models.DateTimeField(auto_now_add=True, db_column="update_time")
    bookId = models.IntegerField(default=0, db_column="book_id")
    name = models.CharField(max_length=40, db_column="account_name")
    typeId = models.IntegerField(default=0, db_column="account_type_id")

    class Meta:
        app_label = 'account'
        db_table = 'T_account'
        unique_together = ()
        index_together = ()
    def toDict(self):
        dic = {"bookId":self.bookId, "name":self.name, "typeId":self.typeId,"definedId":self.definedId,
               "userId":self.userId, "message":self.message, "id":self.id}
        return dic
#
class TRecord(models.Model):
    definedId = models.BigIntegerField(db_column="definedid")
    message = models.CharField(max_length=100)
    createTime = models.DateTimeField(auto_now_add=True, db_column="create_time")
    updateTime = models.DateTimeField(auto_now_add=True, db_column="update_time")
    bookId = models.IntegerField(default=0, db_column="book_id")
    typeId = models.IntegerField(default=0, db_column="type_id")
    operatorType = models.IntegerField(default=0, db_column="operator_type")#1：支出，2：收入，3：转账，4：余额，5：借贷，6：代付，7：报销，8：退款，9：还款
    fromAccountId = models.IntegerField(default=0, db_column="from_account_id")
    toAccountId = models.IntegerField(default=0, db_column="to_account_id")
    totalNum = models.FloatField(default=0.00, db_column="total_num")
    recordTime = models.IntegerField(default=0, db_column="record_time")
    isDel = models.IntegerField(default=0, db_column="is_del")
    createUser = models.IntegerField(default=0, db_column="createuser_id")
    fromUser = models.IntegerField(default=0, db_column="fromuser_id")
    class Meta:
        app_label = 'account'
        db_table = 'T_record'
        unique_together = ()
        index_together = ()
    def toDict(self):
        dic = {"bookId":self.bookId, "typeId":self.typeId,  "operatorType":self.operatorType,
               "fromAccountId":self.fromAccountId, "toAccountId":self.toAccountId, "totalNum":self.totalNum,
               "recordTime":self.recordTime,"definedId":self.definedId,"userId":self.createUser, "message":self.message,
               "id":self.id, "isDel":self.isDel, "createUser":self.createUser, "fromUser":self.fromUser}
        return dic

class TFirstType(models.Model):
    definedId = models.BigIntegerField(db_column="definedid")
    userId = models.IntegerField(default=0, db_column="createuser_id")
    message = models.CharField(max_length=100)
    createTime = models.DateTimeField(auto_now_add=True, db_column="create_time")
    updateTime = models.DateTimeField(auto_now_add=True, db_column="update_time")
    bookId = models.IntegerField(default=0, db_column="book_id")
    name = models.CharField(max_length=40, db_column="type_name")
    category = models.IntegerField(db_column="category")
    class Meta:
        app_label = 'account'
        db_table = 'T_first_type'
        unique_together = ()
        index_together = ()
    def toDict(self):
        dic = {"bookId":self.bookId, "name":self.name,"definedId":self.definedId,"userId":self.userId, "message":self.message, "id":self.id}
        return dic


class TSecondType(models.Model):
    definedId = models.BigIntegerField(db_column="definedid")
    userId = models.IntegerField(default=0, db_column="createuser_id")
    message = models.CharField(max_length=100)
    createTime = models.DateTimeField(auto_now_add=True, db_column="create_time")
    updateTime = models.DateTimeField(auto_now_add=True, db_column="update_time")
    bookId = models.IntegerField(default=0, db_column="book_id")
    typeId = models.IntegerField(default=0, db_column="first_type_id")
    name = models.CharField(max_length=40, db_column="type_name")
    category = models.IntegerField(db_column="category")
    class Meta:
        app_label = 'account'
        db_table = 'T_second_type'
        unique_together = ()
        index_together = ()

    def toDict(self):
        dic = {"bookId":self.bookId, "name":self.name, "typeId":self.typeId,"definedId":self.definedId,"userId":self.userId, "message":self.message, "id":self.id}
        return dic