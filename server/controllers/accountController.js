const Account = require('../data/models').Account;

module.exports = {
	create(req, res) {
		return Account
		  .create({
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,  	
		  })
		  .then(account => res.status(201).send(account))
		  .catch(error => res.status(400).send(error));
	},
};