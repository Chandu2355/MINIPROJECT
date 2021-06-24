const addressModel  = require('../models/addressModel');

module.exports.addAddressForUser = function(req, res){
	console.log("Save Address for User "+req.session.userid);
	var addressJson = {
		pinCode: req.body.pinCode, 
		address: req.body.address,
		locality: req.body.locality,
		city: req.body.city,
		state: req.body.state,
		userId: req.session.userid,
		isDefaultAddress: false,
		isDeleted: false
	};
	var addForDB = new addressModel(addressJson);
	addForDB.save(function(err, savedAddress){
		var retObj = {success: false, message: 'failure'};
		if(err){
			console.log("Error "+err);
		}
		else{
			retObj.success = true;
			retObj.message = "Address Saved Successfully";
		}
	})
}

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