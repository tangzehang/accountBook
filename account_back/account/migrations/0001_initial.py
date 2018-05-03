# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AccountType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(help_text=b'\xe8\xb4\xa6\xe6\x88\xb7\xe7\xb1\xbb\xe5\x9e\x8b\xe5\x90\x8d\xe7\xa7\xb0,\xe4\xbe\x8b\xe5\xa6\x82\xe7\x8e\xb0\xe9\x87\x91\xe8\xb4\xa6\xe6\x88\xb7', max_length=40)),
                ('groupId', models.IntegerField(default=0, help_text=b'\xe8\xb4\xa6\xe5\x8f\xb7\xe6\x89\x80\xe5\xb1\x9e\xe7\x94\xa8\xe6\x88\xb7')),
                ('createTime', models.IntegerField(default=0, help_text=b'\xe5\x88\x9b\xe5\xbb\xba\xe6\x97\xb6\xe9\x97\xb4')),
                ('createUser', models.IntegerField(default=0, help_text=b'\xe5\x88\x9b\xe5\xbb\xba\xe7\x94\xa8\xe6\x88\xb7')),
            ],
        ),
    ]
