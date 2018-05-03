# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.http.request import HttpRequest
from django.db.models.query import QuerySet
import time
import datetime
from django.http import JsonResponse
from .AccountModels import *
from django.views.decorators.csrf import csrf_exempt

def beforeRequest(request):
    result = {"code": 1, "data": [], "msg": "","bookId":0}
    post = request.POST
    """:type : HttpResponse"""
    bookId = post.get("bookId")
    updateTime = post.get("updateTime")
    if bookId == None or updateTime == None:
        result["code"] = 0
        result["msg"] = "缺乏必要参数"
    else:
        result["bookId"] = bookId
        result["updateTime"] = updateTime
    return result


# Create your views here.

@csrf_exempt
def getAccountType(request):
    result = beforeRequest(request)
    if result["code"] == 1:
        bookId = result["bookId"]
        updateTime = result["updateTime"]
        objects = TAccountType.objects
        """:type : QuerySet"""
        #data = objects.all()
        data = objects.filter(bookId=bookId, updateTime__gte=datetime.datetime(*(time.strptime(updateTime,u"%Y-%m-%d %H:%M:%S"))[:6]))
        for i in data:
            result["data"].append(i.toDict())
    
    return JsonResponse(result)

@csrf_exempt
def getAccountName(request):
    result = beforeRequest(request)
    if result["code"] == 1:
        bookId = result["bookId"]
        updateTime = result["updateTime"]
        objects = TAccount.objects
        """:type : QuerySet"""
        data = objects.filter(bookId=bookId, updateTime__gte=datetime.datetime(*(time.strptime(updateTime,u"%Y-%m-%d %H:%M:%S"))[:6])) #type:
        # list[
        # TAccaount]
        for i in data:
            result["data"].append(i.toDict())
    
    return JsonResponse(result)

@csrf_exempt
def getCategoryType(request):
    result = beforeRequest(request)
    if result["code"] == 1:
        bookId = result["bookId"]
        updateTime = result["updateTime"]
        objects = TFirstType.objects
        """:type : QuerySet"""
        data = objects.filter(bookId=bookId, category=1, updateTime__gte=datetime.datetime(*(time.strptime(updateTime,u"%Y-%m-%d %H:%M:%S"))[:6]))
        #type: list[TFirstType]
        for i in data:
            result["data"].append(i.toDict())
    
    return JsonResponse(result)

@csrf_exempt
def getCategoryName(request):
    result = beforeRequest(request)
    if result["code"] == 1:
        bookId = result["bookId"]
        updateTime = result["updateTime"]
        objects = TSecondType.objects
        """:type : QuerySet"""
        data = objects.filter(bookId=bookId, category=1, updateTime__gte=datetime.datetime(*(time.strptime(updateTime,u"%Y-%m-%d %H:%M:%S"))[:6]))
        #type: list[TSecondType]
        for i in data:
            result["data"].append(i.toDict())
    
    return JsonResponse(result)


@csrf_exempt
def getInCategoryType(request):
    result = beforeRequest(request)
    if result["code"] == 1:
        bookId = result["bookId"]
        updateTime = result["updateTime"]
        objects = TFirstType.objects
        """:type : QuerySet"""
        data = objects.filter(bookId=bookId, category=2, updateTime__gte=datetime.datetime(*(time.strptime(updateTime,u"%Y-%m-%d %H:%M:%S"))[:6]))
        #type: list[TFirstType]
        for i in data:
            result["data"].append(i.toDict())
    
    return JsonResponse(result)

@csrf_exempt
def getInCategoryName(request):
    result = beforeRequest(request)
    if result["code"] == 1:
        bookId = result["bookId"]
        updateTime = result["updateTime"]
        objects = TSecondType.objects
        """:type : QuerySet"""
        data = objects.filter(bookId=bookId, category=2, updateTime__gte=datetime.datetime(*(time.strptime(updateTime,u"%Y-%m-%d %H:%M:%S"))[:6]))
        #type: list[TSecondType]
        for i in data:
            result["data"].append(i.toDict())
    
    return JsonResponse(result)

@csrf_exempt
def getSourceData(request):
    result = beforeRequest(request)
    if result["code"] == 1:
        bookId = result["bookId"]
        updateTime = result["updateTime"]
        objects = TRecord.objects
        """:type : QuerySet"""
        data = objects.filter(bookId=bookId, updateTime__gte=datetime.datetime(*(time.strptime(updateTime,u"%Y-%m-%d "
                                                                                                          u"%H:%M:%S"))[:6]))  # type:
        # list[TRecord]
        for i in data:
            result["data"].append(i.toDict())
    
    return JsonResponse(result)


@csrf_exempt
def getUser(request):
    result = beforeRequest(request)
    if result["code"] == 1:
        bookId = result["bookId"]
        objects = TUser.objects
        """:type : QuerySet"""
        data = objects.extra(where=["find_in_set('%s',belong_books)" % bookId])  # type:list[TRecord]
        for i in data:
            result["data"].append(i.toDict())

    return JsonResponse(result)

@csrf_exempt
def setData(request):
    result = {"code": 1, "data": [], "msg": "","bookId":0}
    post = request.POST
    """:type : HttpResponse"""
    bookId = post.get("bookId")
    alldata = post.get("data")
    deldata = post.get("delData")
    if alldata == None or deldata == None:
        result["code"] = 0
        result["msg"] = "缺乏必要参数"
        return JsonResponse(result)
    try:
        deldata = eval(deldata)
    except:
        result["code"] = 0
        result["msg"] = "错误数据格式"
        return JsonResponse(result)

    try:
        alldata = eval(alldata)
    except:
        result["code"] = 0
        result["msg"] = "错误数据格式"
        return JsonResponse(result)

    if bookId == None:
        result["code"] = 0
        result["msg"] = "缺乏必要参数"
        return JsonResponse(result)

    modelDict = {"categoryType":TFirstType.objects,"categoryName":TSecondType.objects,
                 "accountType":TAccountType.objects,"accountName":TAccount.objects,
                 "inCategoryType":TFirstType.objects,"inCategoryName":TSecondType.objects,
                 "sourceData":TRecord.objects}
    for i in alldata:
        if i in modelDict:
            for j in alldata[i]:
                j["bookId"] = int(bookId)
                if j.has_key("id"):
                    del j["id"]
                if j.has_key("remark"):
                    if not j.has_key("message"):
                        j["message"] = j["remark"]
                        del j["remark"]
                    else:
                        del j["remark"]
                if i != "sourceData" and j.has_key("totalNum"):
                    del j["totalNum"]
                if i == "categoryType" or i == "categoryName":
                    j["category"] = 1
                if i == "inCategoryType" or i == "inCategoryName":
                    j["category"] = 2
                model = modelDict[i].create(**j)
                model.save()
    for i in deldata:
        model = TRecord.objects
        tmpData = model.get(pk=i)
        if tmpData != None:
            tmpData.isDel = 1
            tmpData.save()
    return JsonResponse(result)
