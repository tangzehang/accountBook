var accountType = 
{
	901:{
		name:"现金",
		id:0,
		definedId:901,
		message:""
	},
	902:{
		name:"移动账户",
		id:0,
		definedId:902,
		message:""
	}
};

var accountName = 
{
	901:{
		name:"老公钱包",
		totalNum:0,
		typeId:901,
		id:0,
		definedId:901
	},
	902:{
		name:"老婆钱包",
		totalNum:0,
		typeId:901,
		id:0,
		definedId:902
	},
	903:{
		name:"老公微信",
		totalNum:0,
		typeId:902,
		id:0,
		definedId:903
	},
	904:{
		name:"老婆微信",
		totalNum:0,
		typeId:902,
		id:0,
		definedId:904
	},
	905:{
		name:"老公支付宝",
		totalNum:0,
		typeId:902,
		id:0,
		definedId:905
	},
	906:{
		name:"老婆支付宝",
		totalNum:0,
		typeId:902,
		id:0,
		definedId:906
	}
};

var categoryType = 
{
	901:{
		name:"交通",
		id:0,
		definedId:901
	},
	902:{
		name:"餐饮",
		id:0,
		definedId:902
	}
};

var categoryName = 
{
	901:{
		name:"公交",
		totalNum:0,
		typeId:901,
		id:0,
		definedId:901
	},
	902:{
		name:"地铁",
		totalNum:0,
		typeId:901,
		id:0,
		definedId:902
	},
	903:{
		name:"公交卡",
		totalNum:0,
		typeId:901,
		id:0,
		definedId:903
	},
	904:{
		name:"小蓝",
		totalNum:0,
		typeId:901,
		id:0,
		definedId:904
	},
	905:{
		name:"摩拜",
		totalNum:0,
		typeId:901,
		id:0,
		definedId:905
	},
	906:{
		name:"早餐",
		totalNum:0,
		typeId:902,
		id:0,
		definedId:906
	},
	907:{
		name:"午餐",
		totalNum:0,
		typeId:902,
		id:0,
		definedId:907
	},
	908:{
		name:"晚餐",
		totalNum:0,
		typeId:902,
		id:0,
		definedId:908
	}
};

var inCategoryType = 
{
	901:{
		name:"打工",
		id:0,
		definedId:901
	},
	902:{
		name:"其他",
		id:0,
		definedId:902
	}
};

var inCategoryName = 
{
	901:{
		name:"工资",
		totalNum:0,
		typeId:901,
		id:0,
		definedId:901
	},
	902:{
		name:"外快",
		totalNum:0,
		typeId:902,
		id:0,
		definedId:902
	}
};


function(){
	var date = new Date();
	var today = date.format("yyyy-MM-dd");
	var day = date.getDay();
	if(day == 0){
		day = 7;
	}
	var todayTime = Date.parse(date);
	var startYear = Date.parse(new Date(parseInt(today.substr(0,4)),0,1,0,0,0));
	var startToday = Date.parse(new Date(parseInt(today.substr(0,4)),parseInt(today.substr(5,2)) - 1,parseInt(today.substr(8,2)),0,0,0));
	var startMonth = Date.parse(new Date(parseInt(today.substr(0,4)),parseInt(today.substr(5,2)) - 1,1,0,0,0));
//	var startWeek = Date.parse(new Date(parseInt(today.substr(0,4)),parseInt(today.substr(5,2)) - 1,parseInt(today.substr(8,2)),0,0,0)) - (day - 1) * 3600 * 24 * 1000;
	var currentData = JSON.parse(Storage.getItem(bookId+"_currentData"));
	var result = {
		day:{in:0,out:0},
		month:{in:0,out:0},
		year:{in:0,out:0}
	};
	for(var i in currentData){
		var tmpData = currentData[i];
		
		if(tmpData.totalNum == null){
			tmpData.totalNum = 0;
		}
		if(tmpData.recordTime >= startYear/1000){
			if(tmpData.operateType == 1){
				result.year.out = result.year.out + parseFloat(tmpData.totalNum);
			}else if(tmpData.operateType == 2){
				result.year.in = result.year.in + parseFloat(tmpData.totalNum);
			}else if(tmpData.operateType == 4){
				var num = parseFloat(tmpData.totalNum);
				if(num > 0)
					result.year.in = result.year.in + parseFloat(tmpData.totalNum);
				else
					result.year.out = result.year.out - parseFloat(tmpData.totalNum);
			}
		}
		if(tmpData.recordTime >= startMonth/1000){
			if(tmpData.operateType == 1){
				result.month.out = result.month.out + parseFloat(tmpData.totalNum);
			}else if(tmpData.operateType == 2){
				result.month.in = result.month.in + parseFloat(tmpData.totalNum);
			}else if(tmpData.operateType == 4){
				var num = parseFloat(tmpData.totalNum);
				if(num > 0)
					result.month.in = result.month.in + parseFloat(tmpData.totalNum);
				else
					result.month.out = result.month.out - parseFloat(tmpData.totalNum);
			}
		}
		if(tmpData.recordTime >= startWeek/1000){
			if(tmpData.operateType == 1){
				result.week.out = result.week.out + parseFloat(tmpData.totalNum);
			}else if(tmpData.operateType == 2){
				result.week.in = result.week.in + parseFloat(tmpData.totalNum);
			}else if(tmpData.operateType == 4){
				var num = parseFloat(tmpData.totalNum);
				if(num > 0)
					result.week.in = result.week.in + parseFloat(tmpData.totalNum);
				else
					result.week.out = result.week.out - parseFloat(tmpData.totalNum);
			}
		}
		if(tmpData.recordTime >= startToday/1000){
			if(tmpData.operateType == 1){
				result.day.out = result.day.out + parseFloat(tmpData.totalNum);
			}else if(tmpData.operateType == 2){
				result.day.in = result.day.in + parseFloat(tmpData.totalNum);
			}else if(tmpData.operateType == 4){
				var num = parseFloat(tmpData.totalNum);
				if(num > 0)
					result.day.in = result.day.in + parseFloat(tmpData.totalNum);
				else
					result.day.out = result.day.out - parseFloat(tmpData.totalNum);
			}
		}
	}
	
	return result;
}