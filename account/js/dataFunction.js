var Storage=localStorage;
if(typeof(plus) != "undefined"){
	Storage = plus.storage;
}

var bookId = 90001;

//Storage.removeItem("accountName");
//Storage.removeItem(bookId+"_accountType");
//Storage.removeItem(bookId+"_accountName");
//Storage.removeItem(bookId+"_categoryType");
//Storage.removeItem(bookId+"_categoryName");
//Storage.removeItem(bookId+"_inCategoryType");
//Storage.removeItem(bookId+"_inCategoryName");
//Storage.removeItem(bookId+"_currentData");
//Storage.removeItem(bookId+"_structData");
//Storage.removeItem(bookId+"_sourceData");
//Storage.removeItem(bookId+"_userData");
//Storage.removeItem(bookId+"_delsData");
//Storage.removeItem(bookId+"_updateTime");


Date.prototype.format = function(format){
var o = { 
"M+" : this.getMonth()+1, //month 
"d+" : this.getDate(), //day 
"h+" : this.getHours(), //hour 
"m+" : this.getMinutes(), //minute 
"s+" : this.getSeconds(), //second 
"q+" : Math.floor((this.getMonth()+3)/3), //quarter 
"S" : this.getMilliseconds() //millisecond 
} 

if(/(y+)/.test(format)) { 
format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
} 

for(var k in o) { 
if(new RegExp("("+ k +")").test(format)) { 
format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
} 
} 
return format; 
} 

var getDateByTime = function(time){ 
	var date = new Date(time * 1000);
	var day = date.getDate();
	if(day < 10){
		day = "0"+day;
	}
	var month = date.getMonth() + 1;
	if(month < 10){
		month = "0"+month;
	}
	var year = date.getFullYear();
	return {"day":year+""+month+""+day,"month":year+""+month,"year":year};
}

var getUser = function(){
	var user = JSON.parse(Storage.getItem(bookId+"_userData"));
	if(user == null){
		user = {}
	}
	return user;
}

var getUserSelect = function(){
	var result = [];
	var user = getUser();
	for(var i in user){
		var tmp = {value:user[i]["id"],text:user[i]["name"]};
		result.push(tmp);
	}
	return result;
}

var getAccountType = function(){
	var tmpAccountType = JSON.parse(Storage.getItem(bookId + "_accountType"));
	var result = {};
	if(tmpAccountType != null){
		for(var i in tmpAccountType){
			result[i] = {text:tmpAccountType[i]['name'],value:i,children:[]};
		}
	}
	var tmpAccountName = JSON.parse(Storage.getItem(bookId + "_accountName"));
	if(tmpAccountName != null){
		for(var i in tmpAccountName){
			var tmp = {text:tmpAccountName[i]['name'],value:i};
			var type = tmpAccountName[i]['typeId'];
			if(result[type] != undefined){
				result[type]['children'].push(tmp);
			}
		}
	}
	var data = [];
	for(var i in result){
		data.push(result[i]);
	}
	return data;
}

var getAccountData = function(){
	var result = {};
	var tmpAccountType = JSON.parse(Storage.getItem(bookId+"_accountType"));
	var tmpAccountName = JSON.parse(Storage.getItem(bookId+"_accountName"));
	for(var i in tmpAccountName){
		var type = tmpAccountName[i]['typeId'];
		var typeName = "UNKNOW";
		if(type != null && tmpAccountType[type] != undefined){
			typeName = tmpAccountType[type]['name'];
		}
		tmpAccountName[i]['typeName'] = typeName;
		result[i] = tmpAccountName[i];
	}
	return result;
}


var getCategoryData = function(){
	var result = {};
	var tmpCategoryType = JSON.parse(Storage.getItem(bookId+"_categoryType"));
	var tmpCategoryName = JSON.parse(Storage.getItem(bookId+"_categoryName"));
	for(var i in tmpCategoryName){
		var type = tmpCategoryName[i]['typeId'];
		var typeName = "UNKNOW";
		if(type != null && tmpCategoryType[type] != undefined){
			typeName = tmpCategoryType[type]['name'];
		}
		tmpCategoryName[i]['typeName'] = typeName;
		result[i] = tmpCategoryName[i];
	}
	return result;
}


var getInCategoryData = function(){
	var result = {};
	var tmpInCategoryType = JSON.parse(Storage.getItem(bookId+"_inCategoryType"));
	var tmpInCategoryName = JSON.parse(Storage.getItem(bookId+"_inCategoryName"));
	for(var i in tmpInCategoryName){
		var type = tmpInCategoryName[i]['typeId'];
		var typeName = "UNKNOW";
		if(type != null && tmpInCategoryType[type] != undefined){
			typeName = tmpInCategoryType[type]['name'];
		}
		tmpInCategoryName[i]['typeName'] = typeName;
		result[i] = tmpInCategoryName[i];
	}
	return result;
}

var getAccountDataByType = function(){
	var result = {};
	var tmpAccountType = JSON.parse(Storage.getItem(bookId+"_accountType"));
	var tmpAccountName = JSON.parse(Storage.getItem(bookId+"_accountName"));
//	console.log(JSON.stringify(tmpAccountName))
	for(var i in tmpAccountName){
		var type = tmpAccountName[i]['typeId'];
		var typeName = "UNKNOW";
		if(type != null && tmpAccountType[type] != undefined){
			typeName = tmpAccountType[type]['name'];
		}
		tmpAccountName[i]['typeName'] = typeName;
		if(result[typeName] == undefined){
			result[typeName] = [];
		}
		result[typeName].push(tmpAccountName[i]);
	}
	return result;
}


var getCategory = function(){
	var tmpCategoryType = JSON.parse(Storage.getItem(bookId+"_categoryType"));
	var result = {};
	if(tmpCategoryType != null){
		for(var i in tmpCategoryType){
			result[i] = {text:tmpCategoryType[i]['name'],value:i,children:[]};
		}
	}
	var tmpCategoryName = JSON.parse(Storage.getItem(bookId+"_categoryName"));
	if(tmpCategoryName != null){
		for(var i in tmpCategoryName){
			var tmp = {text:tmpCategoryName[i]['name'],value:i};
			var type = tmpCategoryName[i]['typeId'];
			if(result[type] != undefined){
				result[type]['children'].push(tmp);
			}
		}
	}
	var data = [];
	for(var i in result){
		data.push(result[i]);
	}
	return data;
}

var getInCategory = function(){
	var tmpCategoryType = JSON.parse(Storage.getItem(bookId+"_inCategoryType"));
	var result = {};
	if(tmpCategoryType != null){
		for(var i in tmpCategoryType){
			result[i] = {text:tmpCategoryType[i]['name'],value:i,children:[]};
		}
	}
	var tmpCategoryName = JSON.parse(Storage.getItem(bookId+"_inCategoryName"));
	if(tmpCategoryName != null){
		for(var i in tmpCategoryName){
			var tmp = {text:tmpCategoryName[i]['name'],value:i};
			var type = tmpCategoryName[i]['typeId'];
			if(result[type] != undefined){
				result[type]['children'].push(tmp);
			}
		}
	}
	var data = [];
	for(var i in result){
		data.push(result[i]);
	}
	return data;
}

var getHomeCurrent = function (){
	var date = new Date();
	var year = date.getFullYear();
	var month = date.format("yyyyMM");
	var today = date.format("yyyyMMdd");
	var result = {day:{in:0,out:0},month:{in:0,out:0},year:{in:0,out:0}};
	var structData = JSON.parse(Storage.getItem(bookId+"_structData"));
	if(structData!= null && structData["day"] != undefined && structData["day"][today] != undefined){
		result["day"]["in"] = structData["day"][today]["in"];
		result["day"]["out"] = structData["day"][today]["out"];
	}
	if(structData!= null && structData["month"] != undefined && structData["month"][month] != undefined){
		result["month"]["in"] = structData["month"][month]["in"];
		result["month"]["out"] = structData["month"][month]["out"];
	}
	if(structData!= null && structData["year"] != undefined && structData["year"][year] != undefined){
		result["year"]["in"] = structData["year"][year]["in"];
		result["year"]["out"] = structData["year"][year]["out"];
	}
	return result;
}


var updateSourceData = function(data){
	var sourceData = JSON.parse(Storage.getItem(bookId+"_sourceData"));
	if(sourceData == null){
		sourceData = {};
	}
	var definedId = data["definedId"];
	if(sourceData[definedId] != undefined){ //更新id值等..不进行账户加减
		sourceData[definedId] = data;
		Storage.setItem(bookId+"_sourceData",JSON.stringify(sourceData));
		return true;
	}else{
		sourceData[definedId] = data;
		Storage.setItem(bookId+"_sourceData",JSON.stringify(sourceData));
		return false;
	}
}

var updateStructData = function(data){
	var structData = JSON.parse(Storage.getItem(bookId+"_structData"));
	var accountData = getAccountData();
	var categoryData = getCategoryData();
	var inCategoryData = getInCategoryData();
	if(structData == null){
		structData = {"day":{},"month":{},"year":{}};
	}
	var definedId = data["definedId"];
	var time = data["recordTime"];
	var de = getDateByTime(time);
	var totalNum = parseFloat(data["totalNum"]);
	var categoryName = "unknow";
	var accountName = "unknow";
	var name = "";
	if(data['operatorType'] == 1){
		name = "消费";
		if(categoryData[data['typeId']] != undefined){
			categoryName = categoryData[data['typeId']]["typeName"] + "-" + categoryData[data['typeId']]["name"];
		}
		if(accountData[data['fromAccountId']] != undefined){
			accountName = accountData[data['fromAccountId']]["typeName"] + "-" + accountData[data['fromAccountId']]["name"];
		}
		data['name'] = accountName + "->" + categoryName;
	}
	if(data['operatorType'] == 2){
		name = "收入";
		if(inCategoryData[data['typeId']] != undefined){
			categoryName = inCategoryData[data['typeId']]["typeName"] + "-" + inCategoryData[data['typeId']]["name"];
		}
		if(accountData[data['toAccountId']] != undefined){
			accountName = accountData[data['toAccountId']]["typeName"] + "-" + accountData[data['toAccountId']]["name"];
		}
		data['name'] = accountName + "->" + categoryName;
	}
	if(data['operatorType'] == 3){
		name = "转账";
		if(accountData[data['toAccountId']] != undefined){
			categoryName = accountData[data['toAccountId']]["typeName"] + "-" + accountData[data['toAccountId']]["name"];
		}
		if(accountData[data['fromAccountId']] != undefined){
			accountName = accountData[data['fromAccountId']]["typeName"] + "-" + accountData[data['fromAccountId']]["name"];
		}
		data['name'] = categoryName +"->" + accountName ;
	}
	if(data['operatorType'] == 4){
		name = "修改余额";

		if(accountData[data['fromAccountId']] != undefined){
			accountName = accountData[data['fromAccountId']]["typeName"] + "-" + accountData[data['fromAccountId']]["name"];;
		}
		data['name'] = accountName;
	}
	
	data['operatorName'] = name;
	for(var i in de){
		if(structData[i][de[i]] == undefined){
			structData[i][de[i]] = {"in":0,"out":0};
		}
		if(structData[i][de[i]][definedId] == undefined){
			structData[i][de[i]][definedId] = data;
			if(data["operatorType"] == 1){
				structData[i][de[i]]["out"] += totalNum;
			}
			if(data["operatorType"] == 2){
				structData[i][de[i]]["in"] += totalNum;
			}
			if(data["operatorType"] == 4){
				if(totalNum > 0){
					structData[i][de[i]]["in"] += totalNum;
				}else{
					structData[i][de[i]]["out"] -= totalNum;
				}
			}
		}else{
			structData[i][de[i]][definedId] = data;
		}
	}
	Storage.setItem(bookId+"_structData", JSON.stringify(structData));
}


var setList = function(data){
	var definedId = Date.parse(new Date()) / 1000 + "" + Math.round(Math.random() * 10000);
	if(data['id'] == undefined){
	data['id'] = 0;
	data['recordTime']=Date.parse(new Date())/1000;
	data['definedId'] = definedId;
	}
	if(updateSourceData(data)){
		return;
	}
	updateStructData(data);
	var accountData = JSON.parse(Storage.getItem(bookId+"_accountName"));
	if(accountData == null){
		accountData = {};
	}
	var type = data.operatorType;
	var totalNum = parseFloat(data.totalNum);
	if(type == 1){
		var account = data['fromAccountId'];
		if(accountData[account] == undefined){
			accountData[account] = {name:"unknown",typeName:"unknown",id:0,definedId:definedId};
			accountData[account]['totalNum'] = 0;
		}
		accountData[account]['totalNum'] -= totalNum;
	}
	if(type == 2){
		var account = data['toAccountId'];
		if(accountData[account] == undefined){
			accountData[account] = {name:"unknown",typeName:"unknown",id:0,definedId:definedId};
			accountData[account]['totalNum'] = 0;
		}
		accountData[account]['totalNum'] += totalNum;
	}
	if(type == 3){
		var toAccount = data['toAccountId'];
		var fromAccount = data['fromAccountId'];
		if(accountData[toAccount] == undefined){
			accountData[toAccount] = {name:"unknown",typename:"unknown",id:0,definedId:definedId};
			accountData[inAccount]['totalNum'] = 0;
		}
		if(accountData[fromAccount] == undefined){
			accountData[fromAccount] = {name:"unknown",typename:"unknown",id:0,definedId:definedId};
			accountData[fromAccount]['totalNum'] = 0;
		}
		accountData[toAccount]['totalNum'] -= totalNum;
		accountData[fromAccount]['totalNum'] += totalNum;
	}
	if(type == 4){
		var account = data['fromAccountId'];
		if(accountData[account] == undefined){
			accountData[account] = {name:"unknown",typename:"unknown",id:0,definedId:definedId};
			accountData[account]['totalNum'] = 0;
		}
		accountData[account]['totalNum'] += totalNum;
	}
	Storage.setItem(bookId+"_accountName",JSON.stringify(accountData));
}


var delList = function(definedId){
	var final = 0;
	var dels = JSON.parse(Storage.getItem(bookId+"_delsData"));
	if(dels == null){
		dels = [];
	}
	var items = JSON.parse(Storage.getItem(bookId+"_sourceData"));
	if(items == null){
		items = {};
	}
	var data = items[definedId];
	if(!data)
		return final;
		
	var time = data["recordTime"];
	var de = getDateByTime(time);
	var structData = JSON.parse(Storage.getItem(bookId+"_structData"));
	if(structData == null){
		structData = {"day":{},"month":{},"year":{}};
	}
	var type = data["operatorType"];
	var totalNum = parseFloat(data["totalNum"]);
	for(var i in de){
		if(structData[i][de[i]] != undefined && structData[i][de[i]][definedId] != undefined){
			if(type == 1){
				structData[i][de[i]]["out"] -= totalNum;
			}
			if(type == 2){
				structData[i][de[i]]["in"] -= totalNum;
			}
			if(type == 4){
				if(totalNum > 0){
					structData[i][de[i]]["in"] -= totalNum;
				}else{
					structData[i][de[i]]["out"] += totalNum;
				}
			}
			delete structData[i][de[i]][definedId];
		}
	}
	Storage.setItem(bookId+"_structData",JSON.stringify(structData));
	
//	var totalNum = parseFloat(data.totalNum);
	var tmpDefinedId = Date.parse(new Date()) / 1000 + "" + Math.round(Math.random() * 10000);
	accountData = JSON.parse(Storage.getItem(bookId+"_accountName"));
	if(accountData == null){
		accountData = {};
	}
//	var type = data.operatorType;
	if(type == 1){
		var account = data.fromAccountId;
		if(accountData[account] == undefined){
			accountData[account] = {name:"unknown",typename:"unknown",id:0,definedId:tmpDefinedId};
			accountData[account]['totalNum'] = 0;
		}
		accountData[account]['totalNum'] += totalNum;
		final = -totalNum;
	}
	if(type == 2){
		var account = data.toAccountId;
		if(accountData[account] == undefined){
			accountData[account] = {name:"unknown",typename:"unknown",id:0,definedId:tmpDefinedId};
			accountData[account]['totalNum'] = 0;
		}
		accountData[account]['totalNum'] -= totalNum;
		final = totalNum;
	}
	if(type == 3){
		var outAccount = data.fromAccountId;
		var inAccount = data.toAccountId;
		if(accountData[inAccount] == undefined){
			accountData[inAccount] = {name:"unknown",typename:"unknown",id:0,definedId:tmpDefinedId};
			accountData[inAccount]['totalNum'] = 0;
		}
		if(accountData[outAccount] == undefined){
			accountData[outAccount] = {name:"unknown",typename:"unknown",id:0,definedId:tmpDefinedId};
			accountData[outAccount]['totalNum'] = 0;
		}
		accountData[inAccount]['totalNum'] += totalNum;
		accountData[outAccount]['totalNum'] -= totalNum;
	}
	if(type == 4){
		var account = data.fromAccountId;
		if(accountData[account] == undefined){
			accountData[account] = {name:"unknown",typename:"unknown",id:0,definedId:tmpDefinedId};
			accountData[account]['totalNum'] = 0;
		}
		accountData[account]['totalNum'] -= totalNum;
		final = totalNum;
	}
	Storage.setItem(bookId+"_accountName",JSON.stringify(accountData));
	if(data["id"] != 0)
		dels.push(data["id"])


	delete items[definedId];
	Storage.setItem(bookId+"_sourceData",JSON.stringify(items));
	Storage.setItem(bookId+"_delsData",JSON.stringify(dels));
	return final;
}
