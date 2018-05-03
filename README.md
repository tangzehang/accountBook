# accountBook
<p>示例地址:<a href="http://account.bestot.cn/">http://account.bestot.cn/</a></p>
<p><b>account_back</b>是后台服务。用python-Django编写。需要安装python2.7并且安装Django模块。</p>
<p><b>account</b>是前端。用HBuilder（H5）编写。</p>
<p>搭建过程，</p>
<p>1.把account_back/account/document中的sql文件导入数据库中。</p>
<p>PS：先导入OURBOOK.sql（里面是建表语句），再导入其他文件。</p>
<p>2.把account_back/account/setting.py里面的数据库连接配置修改成自己的数据库信息。</p>
<p>3.启动后台服务。（python manage.py runserver）</p>
<p>4.修改account/js/netData.js 中hostName为后台服务器地址。</p>
<p>5.将account里面的文件部署到服务器上。</p>
