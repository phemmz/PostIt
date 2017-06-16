const Group = require('../data/models').Group;

module.exports = {
	create(req, res) {
		return Group
		  .create({
		  	groupname: req.body.groupname,		  	
		  })
		  .then(group => res.status(201).send(group))
		  .catch(error => res.status(400).send(error));
	},	
};