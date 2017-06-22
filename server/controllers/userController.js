const User = require('../data/models').User;

exports.create = function(req, res) {

	
	if(req.session.name) {
		console.log(req.body);
		console.log(req.params.groupId);
		return User
	    .create({
	  	    username: req.body.username,
	  	    groupId: req.params.groupId
	    })		
	    .catch((error) => {
	    	console.log(error);
	    	res.json({message: "Cant add user to group"});
	    });		
		res.json({
			message: "User added successfully"
		});
	}
	else {
		res.json({
			message: "You need to login to add user"
		});
	}	
};