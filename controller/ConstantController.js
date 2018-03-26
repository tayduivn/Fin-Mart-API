var con=require('../bin/dbconnection.js');
var base = require('./baseController');

var GetConstantData = function(req, res, next){
		var GetConstantData = [];
		GetConstantData.push(req.body.FBAID);		
		con.execute_proc('call Get_Constant_Data(?)',GetConstantData,function(data) {
		if(data!=null){
			var response={
			     "VersionCode":data[0][0].ConstantValue,
				 "IsForceUpdate":data[0][1].ConstantValue,
				 "PBNoOfHits":data[0][2].ConstantValue,
				 "PBHitTime":data[0][3].ConstantValue,
				 "ROIHLBL":data[0][4].ConstantValue,
				 "ROIPLBL":data[0][5].ConstantValue,
				 "ROILABL":data[0][6].ConstantValue,
				 "POSPNo":data[0][7].ConstantValue,
				 "POSPStat":data[0][8].ConstantValue,
			};
			base.send_response("Success",response,res);
		}
		else{
			base.send_response("No data found",null,res);
		}
   	});

}


module.exports = {"GetConstantData":GetConstantData};	