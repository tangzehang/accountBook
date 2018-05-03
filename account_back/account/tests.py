from django.test import TestCase
from django.test.utils import setup_test_environment
from django.db.models.query import QuerySet
from django.conf import settings
import django
import os
from django.http import JsonResponse
from django.core.serializers.json import DjangoJSONEncoder
import json
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "SqlEmail.settings")
#settings.configure()
django.setup()
setup_test_environment()



from models import AccountName, AccountType



# Create your tests here.

objects = AccountType.objects
""":type : QuerySet"""
data = objects.filter(groupid=0)  #type: list[AccountType]
result = []
for i in data:
    result.append(i.toDict())
print json.dumps(result, cls=DjangoJSONEncoder)

oj = AccountName.objects
""":type : QuerySet"""
data = oj.all()
result = []
for i in data:
    result.append(i.toDict())
print json.dumps(result, cls=DjangoJSONEncoder)