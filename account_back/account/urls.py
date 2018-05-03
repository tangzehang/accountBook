"""SqlEmail URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^account/accountType', views.getAccountType, name='accountType'),
    url(r'^account/accountName', views.getAccountName, name='accountName'),
    url(r'^account/categoryName', views.getCategoryName, name='categoryName'),
    url(r'^account/categoryType', views.getCategoryType, name='categoryType'),
    url(r'^account/inCategoryName', views.getInCategoryName, name='inCategoryName'),
    url(r'^account/inCategoryType', views.getInCategoryType, name='inCategoryType'),
    url(r'^account/sourceData', views.getSourceData, name='sourceData'),
    url(r'^account/userData', views.getUser, name='userData'),
    url(r'^account/setData', views.setData, name='setData')
]
