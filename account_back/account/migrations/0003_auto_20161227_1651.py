# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_auto_20161227_1637'),
    ]

    operations = [
        migrations.AlterField(
            model_name='accounttype',
            name='createTime',
            field=models.IntegerField(default=b'0', help_text=b'\xe5\x88\x9b\xe5\xbb\xba\xe6\x97\xb6\xe9\x97\xb4'),
        ),
        migrations.AlterField(
            model_name='accounttype',
            name='createUser',
            field=models.IntegerField(default=b'0', help_text=b'\xe5\x88\x9b\xe5\xbb\xba\xe7\x94\xa8\xe6\x88\xb7'),
        ),
        migrations.AlterField(
            model_name='accounttype',
            name='groupId',
            field=models.IntegerField(default=b'0', help_text=b'\xe8\xb4\xa6\xe5\x8f\xb7\xe6\x89\x80\xe5\xb1\x9e\xe7\x94\xa8\xe6\x88\xb7'),
        ),
        migrations.AlterUniqueTogether(
            name='accounttype',
            unique_together=set([('groupId', 'name')]),
        ),
    ]
