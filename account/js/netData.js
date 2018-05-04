var hostName = "http://account.bestot.cn";
function getNetData(typeName,index,mask,callBack){
	if(index >= typeName.length){
		mask.close();
		callBack();
		var time = (Date.parse(new Date()) / 1000) - 3600*24;
		var Storage=localStorage;
		if(typeof(plus) != "undefined"){
			Storage = plus.storage;
		}
		Storage.setItem(bookId+"_updateTime", String(time));
		return;
	}
	var host = hostName+"/account/"; 
//	var host = "https://account2.duapp.com/account/";
	var type = typeName[index];
	var url = host + type;
	var Storage=localStorage;
	if(typeof(plus) != "undefined"){
		Storage = plus.storage;
	}
	var dateTime = Storage.getItem(bookId+"_updateTime");
	if(dateTime == undefined || dateTime == null){
		dateTime = 0;
	}
	dateTime = parseInt(dateTime);
	var date = new Date(dateTime * 1000);
	var updateTime = date.format("yyyy-MM-dd hh:mm:ss");
	mui.ajax(url,{
		data:{bookId:bookId, updateTime:updateTime},
		dataType:"json",
		type:"post",
		//headers:{'Content-Type':'application/json'},
		timeout:5000,
		success:function(data){
			if(data["code"] == 1){
				var tmpData = data["data"];
				if(type == "sourceData"){
					var dels = JSON.parse(Storage.getItem(bookId+"_delsData"));
					if(dels == null){
						dels = [];
					}
					for(var i in tmpData){
						var t = tmpData[i];
						if(t["isDel"] == 1){
							delList(t["definedId"]);
							var id = t["id"];
							//本地要删除的数据,服务端显示已经删除,则把本地要删除的数据直接去除即可
							while(dels.indexOf(id) != -1){
								dels.splice(dels.indexOf(id),1);
							}
						}else{
							setList(t);
						}
					}
					Storage.setItem(bookId+"_delsData",JSON.stringify(dels));
				}else{
					var tmpItem = Storage.getItem(bookId+"_"+type);
					if(tmpItem == null)
						tmpItem = {}
					else
						tmpItem = JSON.parse(tmpItem);
					for(var i in tmpData){
						var t = tmpData[i];
						t['totalNum'] = 0;
						if(tmpItem[t["definedId"]] != undefined && tmpItem[t["definedId"]]['totalNum'] != undefined){
								t['totalNum'] = tmpItem[t["definedId"]]['totalNum'];
						}
						tmpItem[t["definedId"]] = t;
					}
					Storage.setItem(bookId+"_"+type,JSON.stringify(tmpItem));
				}
			}else{
				mui.toast("同步"+type+"失败:"+data["msg"],{ duration:'short', type:'div' }) 
			}
			getNetData(typeName,++index,mask,callBack);
		},
		error:function(xhr, typeNet, errorThrown){
			mui.toast("同步"+type+"失败:网络错误"+typeNet,{ duration:'short', type:'div' });
			getNetData(typeName,++index,mask,callBack);
		}
	});
}

function setNetData(mask,callBack){
	var url = hostName + "/account/setData";
//	var url = "https://account2.duapp.com/account/setData";
	var Storage=localStorage;
	if(typeof(plus) != "undefined"){
		Storage = plus.storage;
	}
	
	var tmpData = {};
	var ct = ["accountType","accountName","categoryName","categoryType","inCategoryName","inCategoryType","sourceData"];
	for(var i in ct){
		var t = ct[i];
		var sdata = JSON.parse(Storage.getItem(bookId+"_"+t));
		if(sdata != null){
			for(var j in sdata){
				var ssd = sdata[j];
				if(ssd["id"] == 0){
					if(tmpData[t] == undefined){
						tmpData[t] = [];
					}
					tmpData[t].push(ssd)
				}
			}
		}
	}
	mask.show();
	var dels = JSON.parse(Storage.getItem(bookId+"_delsData"));
	if(dels == null){
		dels = [];
	}
	mui.ajax(url,{
		data:{bookId:bookId,data:JSON.stringify(tmpData),delData:JSON.stringify(dels)},
		dataType:"json",
		type:"post",
		//headers:{'Content-Type':'application/json'},
		timeout:5000,
		success:function(data){
//			console.log(JSON.stringify(data));
			var ct = ["userData","accountType","accountName","categoryName","categoryType","inCategoryName","inCategoryType","sourceData"];
			getNetData(ct,0,mask,callBack);
		},
		error:function(xhr, type, errorThrown){
			mui.toast("上传数据失败:网络错误"+type,{ duration:'short', type:'div' });
			var ct = ["userData","accountType","accountName","categoryName","categoryType","inCategoryName","inCategoryType","sourceData"];
			getNetData(ct,0,mask,callBack);
		}
	});
}