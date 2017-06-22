const Group = require('../data/models').Group;

exports.create = function(req, res) {		
	console.log(req.body);
	console.log(req.session.name);
	if (req.session.name) {
		return Group
		    .create({
		  	    groupname: req.body.groupname,		  	
		    })
		    .catch((error) => {
		    	console.log(error);
		    	res.json({
		    		message: "Cant save to database"
		    	});
		    });		    		
			res.json({
				message: "Group successfully created"
			});
	}
	else {
		res.json({
			message: "You need to login to create a group"
		});
	}
};