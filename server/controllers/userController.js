const User = require('../data/models').User;

module.exports = {
	create(req, res) {
		return User
		  .create({
		  	username: req.body.username,
		  	groupId: req.params.groupId,
		  })
		  .then(user => res.status(201).send(user))
		  .catch(error => res.status(400).send(error));
	},
}