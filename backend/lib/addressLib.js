const addressModel  = require('../models/addressModel');

module.exports.addAddressForUser = function(req, res){
	console.log("Save Address for User "+req.session.userid);
	var addressJson = {
		location: req.body.location,
		fullName: req.body.fullName,
		address: req.body.address,
		city: req.body.city,
		state: req.body.state,
		pinCode: req.body.pinCode, 
		userId: req.session.userid,
		phone: req.body.phone,
		packageName: req.body.packageName,
		price: req.body.price,
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
			console.log(addressJson)
			res.redirect("/finalPay")
		}
	})
}

module.exports.getAllAddressOfAUser = function(req, res){

	var retObj = {success: false, message: 'failure', addresses: []};

	if(req.session.userid){
		var query = {userId: req.session.userid, isDeleted: false};
		console.log(query)
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
		res.json({'error': 'no addresses found'});
	}
}