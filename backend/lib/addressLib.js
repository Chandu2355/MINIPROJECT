const addressModel  = require('../models/addressModel');

module.exports.getAllAddressOfAUser = function(req, res){

	var retObj = {success: false, message: 'failure', addresses: []};

	if(req.session.userid){
		var query = {userId: req.session.userid, isDeleted: {$ne: false}};
		addressModel.find(query, function(err, addressArray){
			if(err){
				console.log(err);
			}
			else{
				retObj.success=true;
				retObj.message="success";
				retObj.addresses = addressArray;
			}
			res.json(retObj);
		})
	}
	else{
		// TODO:  Define a format for error to return
		res.json({'error': 'no addresses found'});
	}
}